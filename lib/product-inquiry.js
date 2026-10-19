import {SITE} from '../data/site-config.js';

const PRODUCT_PATH = /^\/products\/[a-z0-9-]+\/[a-z0-9-]+$/;
const LOCALES = new Set(['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'ko']);

export function buildProductInquiryLinks(name, path, locale) {
  const url = `${SITE.siteUrl}/${locale}${path}`;
  const message = `${name}\n${url}`;
  return {
    formHref: {pathname: '/contact', query: {product: name, reference: path}, hash: 'inquiry'},
    emailHref: `mailto:${SITE.email}?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`,
    whatsappHref: `${SITE.whatsapp.chatUrl}?text=${encodeURIComponent(message)}`,
  };
}

// URL parameters are display text, never HTML or an arbitrary destination URL.
export function readProductInquiry(searchParams, locale) {
  const name = searchParams.get('product')?.trim();
  const path = searchParams.get('reference');
  if (!LOCALES.has(locale) || !name || name.length > 300 || /[\u0000-\u001f\u007f]/.test(name) || !PRODUCT_PATH.test(path || '')) return null;
  return {name, url: `${SITE.siteUrl}/${locale}${path}`, message: `${name}\n${SITE.siteUrl}/${locale}${path}\n\n`};
}

export function prefillProductInquiry(form, context, quoteSubject, generalSubject) {
  if (!context || form.message.trim()) return form;
  return {...form, message: context.message, subject: form.subject === generalSubject ? quoteSubject : form.subject};
}
