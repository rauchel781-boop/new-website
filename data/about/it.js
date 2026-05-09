// About — Italian translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Stabilimento di Cao County · 15.000 m²' },
  { src: F('material.jpg'),     caption: 'Magazzino legno massello · paulownia, pino, rovere' },
  { src: F('1-1.jpg'),          caption: 'Officina di preparazione del legno' },
  { src: F('painting.jpg'),     caption: 'Linea di finitura a spruzzo con controllo polveri' },
  { src: F('1-3.jpg'),          caption: 'Installazione cerniere · QC ferramenta' },
  { src: F('warehouse.jpg'),    caption: 'Magazzino prodotti finiti · pronto alla spedizione' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Ufficio Vendite · Xiamen, Fujian',   tag: 'Ufficio' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Accoglienza dei nostri clienti',     tag: 'Cliente' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Accoglienza di un compratore estero', tag: 'Cliente' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'Il nostro team',                     tag: 'Team' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Taglio a Misura',
    desc: 'Legno massello e pannelli vengono dimensionati sulle nostre seghe a pannelli. Tolleranza mantenuta a ±0,5 mm così che ogni pezzo si adatti perfettamente alla stazione successiva.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Taglio Sagomato',
    desc: 'Fresatrici CNC e seghe a nastro tagliano curve, smussi e battute che definiscono ogni scatola. Programmi salvati per SKU per produzione di massa ripetibile.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Mortase',
    desc: 'Sedi cerniere, alloggi serrature e scanalature divisori vengono fresati e scolpiti. Qui la precisione di giunzione decide come si poserà il coperchio.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Pre-Assemblaggio',
    desc: 'I pannelli vengono assemblati a secco e calibrati prima di qualsiasi colla. La ferramenta è installata di prova — ogni accoppiamento confermato prima dell’incollaggio finale.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Levigatura e Lucidatura',
    desc: 'Levigatura multi-grana da 120 → 400 produce la superficie setosa di cui ha bisogno il nostro team finitura. Spigoli ammorbiditi, angoli arrotondati, polvere aspirata alla fonte.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Imballaggio e QC',
    desc: 'Ogni scatola è ispezionata, pulita e imballata con angolari e termoretraibile. I cartoni sono etichettati secondo specifica — pronto FBA o master.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Fondazione',
    text: 'Xiamen Chic Homeware Co.,Ltd. registrata a Xiamen. Il fondatore stipula partnership con officina a Cao County e spedisce i primi pallet di esportazione.' },
  { year: '2022', title: 'Primo Stabilimento',
    text: 'Firmato l’affitto di un sito di produzione dedicato di 6.000 m² a Pulianji. Acquisito il primo cliente europeo di scatole per vino.' },
  { year: '2023', title: 'Boom di Amazon',
    text: 'Costruita una linea dedicata a piccoli MOQ per brand privati Amazon. Superato il milione di pezzi spediti in un solo anno.' },
  { year: '2024', title: 'Certificazione FSC',
    text: 'Ottenuta la certificazione FSC chain-of-custody. Stabilimento ampliato a 15.000 m² con nuova area di finitura e QC.' },
  { year: '2025', title: 'Globalizzazione',
    text: 'Clienti attivi in 40+ paesi. Lanciato team interno ID + mockup 3D per supportare la crescita OEM/ODM.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Ufficio Vendite',
    name: 'Xiamen, Fujian',
    role: 'Vendite · design · documentazione export',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, Distretto di Jimei, Xiamen, Fujian, Cina',
    details: [
      'Account management e team vendite anglofono',
      'Rendering 3D, coordinamento campionature, prenotazione spedizioni',
      'A dieci minuti dall’aeroporto internazionale Xiamen Gaoqi',
      'Spedizione container via Porto di Xiamen — 130+ rotte mondiali dirette',
    ],
  },
  {
    eyebrow: 'Stabilimento di Produzione',
    name: 'Cao County, Shandong',
    role: 'Produzione · finitura · QC · imballaggio',
    addr: 'A nord dell’ufficio dell’Amministrazione per la Regolazione del Mercato, villaggio di Pulianji, contea di Cao, Heze, Provincia dello Shandong, Cina',
    details: [
      '15.000 m² con linee CNC, laser, finitura e assemblaggio',
      '120+ operai specializzati su due turni di produzione',
      'Accesso locale a paulownia, pino, bambù, noce e rovere',
      'Servizio ferroviario diretto container ai porti di Qingdao e Lianyungang',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europa',
    text: 'Regno Unito, Germania, Francia, Paesi Bassi, Italia, Spagna — finiture conformi REACH, certificati fitosanitari UE di serie.' },
  { flag: '🇺🇸', name: 'Nord America',
    text: 'Stati Uniti e Canada — finiture CARB P2, imballaggi pronti per FBA disponibili, consolidamenti LCL settimanali.' },
  { flag: '🇯🇵', name: 'Giappone',
    text: 'Tokyo, Osaka, Nagoya — standard di tolleranza JIS, etichettatura conforme JAS su richiesta.' },
  { flag: '🇰🇷', name: 'Corea',
    text: 'Seoul, Busan — etichettatura marchio KC supportata, rotte portuali rapide Incheon e Busan da Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Vera Fabbrica, Non un Trader',
    text: 'Il nostro stabilimento di 15.000 m² a Cao County è di proprietà e gestione diretta di Chic Homeware — nessun intermediario, nessuna catena di ricarichi e nessun telefono senza fili tra te e il pavimento di produzione.' },
  { num: '02', title: 'Costruita per Volumi Piccoli e Medi',
    text: 'La maggior parte delle fabbriche vuole ordini da 5.000 pezzi. Siamo costruiti attorno a tirature da 200 a 5.000 pezzi — il volume che conta per i brand Amazon, venditori Etsy, retailer regalo e lanci di brand.' },
  { num: '03', title: 'Vendite in Inglese',
    text: 'Il nostro ufficio di Xiamen gestisce il tuo progetto end-to-end in inglese fluente — dal preventivo all’artwork ai documenti di spedizione. Sovrapposizione di fuso orario con le mattine di UE e USA.' },
];

export const CERTS = [
  { icon: '🌲', name: 'FSC',       status: 'Certificato',         pending: false },
  { icon: '🇪🇺', name: 'EU REACH', status: 'Roadmap 2026',        pending: true  },
  { icon: '✅', name: 'CARB P2',   status: 'Roadmap 2026',        pending: true  },
  { icon: '🏅', name: 'ISO 9001',  status: 'In corso',            pending: true  },
];

export const COPY = {
  meta: {
    title: 'Chi Siamo — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — produttore di scatole in legno su misura da cinque anni, con ufficio vendite a Xiamen e stabilimento di 15.000 m² a Cao County, Shandong. Al servizio di brand Amazon e importatori in Europa, USA, Giappone e Corea.',
    ogDescription:
      'Produttore di scatole in legno su misura con stabilimento di 15.000 m² a Cao County, Shandong. Al servizio di brand Amazon e importatori nel mondo.',
  },
  hero: {
    eyebrow: 'Su Xiamen Chic Homeware',
    titleA: 'Cinque Anni di',
    titleEm: 'Maestria del Legno.',
    titleB: 'Due Sedi. Una Promessa.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. è un produttore di articoli in legno su misura, costruito per servire il moderno mercato dell’importazione — dai brand Amazon ai retailer europei ai grossisti giapponesi e coreani. Una fabbrica giovane con radici profonde nel settore: guidata dal fondatore, diretta dalla fabbrica, pronta all’export.',
  },
  stats: {
    years: 'Anni di attività',
    floor: 'Superficie di stabilimento',
    workers: 'Operai specializzati',
    markets: 'Mercati di esportazione',
  },
  story: {
    label: 'La Nostra Storia',
    titleA: 'Costruita da Gente del Legno,',
    titleEm: 'per Gente di Brand.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. è stata fondata nel 2021</strong> da un team di veterani dell’industria cinese dei prodotti in legno. Il nostro fondatore ha trascorso più di due decenni nel commercio del legno — percorrendo i piazzali di Cao County, eseguendo programmi CNC a Heze e gestendo ordini export da Xiamen — prima di fondare Chic per fare le cose diversamente.',
    p2html:
      'La premessa era semplice: combinare una vera fabbrica a <strong>Cao County, Shandong</strong> — il cuore storico dell’industria cinese delle scatole in legno — con un moderno ufficio vendite a <strong>Xiamen, Fujian</strong>, una delle principali porte di esportazione del paese. Una parte si occupa del legno; l’altra parte si occupa del mondo.',
    p3html:
      'Cinque anni dopo, serviamo centinaia di brand in Europa, Nord America, Giappone e Corea — inclusa una lunga lista di venditori Amazon di brand privati che contano sulla nostra rapidità e consistenza di finitura.',
    features: [
      'Guidata dal fondatore, nessun ricarico di trading',
      'Stabilimento + ufficio vendite sotto un’unica azienda',
      '20+ anni di esperienza dell’industria del legno al timone',
      'Costruita specificamente per l’export — non per la rivendita interna',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '«Cao County è dove si fanno le scatole in legno del mondo. Siamo orgogliosi di esserne.»',
    showroomAlt: 'Showroom Xiamen Chic Homeware — prodotti in legno finiti',
  },
  timeline: {
    label: 'Cinque Anni di Cammino',
    titleA: 'Dall’Officina al',
    titleEm: 'Mondo Intero',
  },
  locations: {
    label: 'Due Sedi',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'La Nostra Gente',
    titleA: 'Il Team — & i',
    titleEm: 'Clienti',
    titleB: 'che ci visitano',
    intro: 'Siamo un piccolo team guidato dal fondatore a Xiamen e amiamo accogliere i compratori, proprietari di brand e venditori Amazon che vengono a vedere come nascono le loro scatole.',
  },
  gallery: {
    label: 'Dentro lo Stabilimento',
    titleA: 'Uno Sguardo alla nostra',
    titleEm: 'Sede di Cao County',
    intro: 'Dal piazzale di legname alla cassa finita — ogni passo accade sotto un solo tetto, sotto gli occhi della nostra gente.',
  },
  production: {
    label: 'Come Nasce una Scatola',
    titleA: 'Sei Passi dal',
    titleEm: 'Legno alla Tua Porta',
    intro: 'Ogni scatola in legno che lascia il nostro stabilimento di Cao County passa per le stesse sei stazioni di produzione. Fotografate qui sotto nella nostra officina — niente immagini stock, niente terzisti, ogni scatto fatto sul nostro pavimento.',
  },
  markets: {
    label: 'Dove vanno le Nostre Scatole',
    titleA: 'Esportiamo in',
    titleEm: 'Mercati Sviluppati',
    intro: 'Ci concentriamo esclusivamente sull’export verso mercati sviluppati — paesi dove i compratori si aspettano qualità costante, documentazione corretta e consegna puntuale. Il nostro team parla inglese, prepara le carte export a specifica e lavora nel tuo fuso orario. Niente sorprese in dogana.',
    amazonHtml:
      '<strong>Siamo un produttore Amazon-friendly.</strong> Una grande quota dei nostri 200+ clienti attivi sono brand privati Amazon nei marketplace USA, UK e Germania. Spediamo cartoni pronti FBA con etichette FNSKU, forniamo codici UPC e rispettiamo le regole di imballaggio e peso volumetrico di Amazon di serie.',
  },
  values: {
    label: 'Come Lavoriamo',
    titleA: 'Cosa ci Distingue dagli',
    titleEm: 'Altri',
  },
  certs: {
    label: 'Standard e Conformità',
    title: 'Certificazioni',
    paragraph:
      'Il nostro legno proviene da canali forestali certificati FSC e operiamo un programma di chain-of-custody per mantenere tracciabilità pulita dal tronco al cartone. Gli ulteriori standard elencati sotto sono nella nostra roadmap 2026 secondo la domanda dei clienti.',
  },
  cta: {
    label: 'Parlaci',
    titleA: 'Costruiamo Qualcosa',
    titleB: 'Insieme',
    sub: 'Raccontaci del tuo progetto — tipo di legno, dimensioni, quantità e qualunque requisito di branding. Rispondiamo entro 24 ore.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
