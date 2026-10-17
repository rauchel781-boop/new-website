// Exercise the actual form handler without contacting EmailJS or opening mail.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync('app/[locale]/contact/ContactClient.jsx','utf8');
const start=source.indexOf('async function handleSubmit(e)');
const end=source.indexOf('\n  function reset()',start);
assert.ok(start>=0&&end>start,'Contact form handler can be located');
const handler=source.slice(start,end).trim();
const originalForm={name:'SEO test',email:'test@example.invalid',company:'Test',country:'Test',subject:'Test inquiry',message:'Local test only'};

async function run({configured=true,ready=true,fail=false}={}){
  const states=[],events=[],errors=[],sends=[];
  const form={...originalForm};const window={location:{href:''}};
  let prevented=false;
  const submit=vm.runInNewContext(`(${handler})`,{
    isEmailJSConfigured:()=>configured,ready,form,window,
    SITE:{email:'test@example.invalid',emailjs:{contactTemplateId:'test'}},
    send:async(...args)=>{sends.push(args);if(fail)throw new Error('Simulated send failure');return{status:200};},
    setState:state=>states.push(state),setErrMsg:message=>errors.push(message),
    trackEvent:(name,params)=>events.push({name,params}),
    t:(key,params)=>`${key}:${params?.email||''}`,
  });
  await submit({preventDefault(){prevented=true;}});
  assert.ok(prevented);assert.deepEqual(form,originalForm,'User input remains intact');
  return{states,events,errors,sends,href:window.location.href};
}
const success=await run();
assert.deepEqual(success.states,['sending','done']);
assert.equal(success.sends.length,1);assert.deepEqual(success.events.map(e=>e.name),['inquiry_form_submitted']);
assert.equal(success.href,'');
const failure=await run({fail:true});
assert.deepEqual(failure.states,['sending','error']);assert.equal(failure.events.length,0);
assert.ok(failure.errors.at(-1).includes('test@example.invalid'));
for(const options of [{configured:false},{ready:false}]){
  const draft=await run(options);
  assert.deepEqual(draft.states,['sending','draft']);assert.equal(draft.sends.length,0);
  assert.deepEqual(draft.events.map(e=>e.name),['inquiry_email_draft_opened']);
  assert.match(draft.href,/^mailto:test@example\.invalid\?subject=/);
  assert.ok(!draft.states.includes('done'));
}
for(const locale of ['en','de','es','fr','it','pt','ja','ko']){
  const messages=JSON.parse(fs.readFileSync(`messages/${locale}.json`,'utf8'));
  assert.match(messages.contact.form.mailDraftMessage,/\{email\}/);
}
console.log('PASS: confirmed send, failed send, unconfigured service, SDK not ready, and 8 localized draft notices. No messages sent.');
