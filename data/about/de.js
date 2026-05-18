// About — German translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Werk Cao County · 15.000 m²' },
  { src: F('material.jpg'),     caption: 'Massivholzlager · Paulownia, Kiefer, Eiche' },
  { src: F('1-1.jpg'),          caption: 'Holzvorbereitungs-Werkstatt' },
  { src: F('painting.jpg'),     caption: 'Spritzlackier-Linie mit Staubkontrolle' },
  { src: F('1-3.jpg'),          caption: 'Scharniermontage · Beschlag-QC' },
  { src: F('warehouse.jpg'),    caption: 'Fertigwarenlager · versandbereit' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Vertriebsbüro · Xiamen, Fujian',     tag: 'Büro' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Gastgeber für unsere Kunden',         tag: 'Kunde' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Empfang eines Übersee-Käufers',       tag: 'Kunde' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'Unser Team',                          tag: 'Team' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Zuschnitt',
    desc: 'Massivholz und Holzwerkstoffplatten werden auf unseren Plattensägen auf Maß gebracht. Toleranz auf ±0,5 mm gehalten, damit jedes Teil perfekt zur nächsten Station passt.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Formschnitt',
    desc: 'CNC-Fräsen und Bandsägen schneiden die Bögen, Gehrungen und Falze, die jede Box definieren. Programme pro SKU gespeichert für wiederholbare Massenproduktion.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Schlitz- und Zapfen',
    desc: 'Scharniertaschen, Schlossausschnitte und Trennernuten werden gefräst und gestemmt. Hier entscheidet die Verbindungsgenauigkeit, wie der Deckel sitzt.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Vor-Montage',
    desc: 'Paneele werden trocken zusammengesetzt und vermessen, bevor jegliche Verleimung erfolgt. Beschläge werden zuerst probemontiert — jede Passung vor der Endverleimung bestätigt.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Schleifen und Polieren',
    desc: 'Mehrschritt-Schliff von 120 → 400 erzeugt die seidenglatte Oberfläche, die unser Finish-Team braucht. Kanten gebrochen, Ecken gerundet, Staub direkt abgesaugt.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Verpackung und QC',
    desc: 'Jede Box wird inspiziert, gewischt und mit Eckenschutz und Schrumpffolie verpackt. Kartons werden nach Ihrer Spezifikation etikettiert — FBA-bereit oder Master-Karton.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Gründung',
    text: 'Xiamen Chic Homeware Co.,Ltd. in Xiamen registriert. Der Gründer sichert sich eine Partnerwerkstatt in Cao County und liefert die ersten Exportpaletten aus.' },
  { year: '2022', title: 'Erstes Werk',
    text: 'Mietvertrag über dediziertes 6.000 m²-Produktionsgelände in Pulianji unterschrieben. Erster europäischer Weinkisten-Kunde an Bord.' },
  { year: '2023', title: 'Amazon-Boom',
    text: 'Spezielle Klein-MOQ-Linie für Amazon-Eigenmarken aufgebaut. Über eine Million Stück in einem einzigen Jahr ausgeliefert.' },
  { year: '2024', title: 'FSC-zertifiziert',
    text: 'FSC-Chain-of-Custody-Zertifizierung erreicht. Werk auf 15.000 m² mit neuem Finish- und QC-Bereich erweitert.' },
  { year: '2025', title: 'International',
    text: 'Aktive Kunden in 40+ Ländern. Internes ID- + 3D-Mockup-Team gestartet, um OEM/ODM-Wachstum zu unterstützen.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Vertriebsbüro',
    name: 'Xiamen, Fujian',
    role: 'Vertrieb · Design · Exportdokumentation',
    addr: '101, Nr. 8 Houweizhaiding Road, Maluan, Xinglin, Bezirk Jimei, Xiamen, Fujian, China',
    details: [
      'Kundenbetreuung und englischsprachiges Vertriebsteam',
      '3D-Rendering, Musterkoordination, Frachtbuchung',
      'Zehn Minuten vom internationalen Flughafen Xiamen Gaoqi',
      'Container-Versand über Hafen Xiamen — 130+ direkte Weltrouten',
    ],
  },
  {
    eyebrow: 'Produktionswerk',
    name: 'Cao County, Shandong',
    role: 'Fertigung · Finish · QC · Verpackung',
    addr: 'Nördlich des Marktregulierungsamts, Pulianji-Dorf, Pulianji-Town, Cao County, Heze, Provinz Shandong, China',
    details: [
      '15.000 m² mit CNC-, Laser-, Finish- und Montagelinien',
      '120+ Facharbeiter in zwei Produktionsschichten',
      'Lokaler Zugang zu Paulownia, Kiefer, Bambus, Walnuss und Eiche',
      'Direkter Schienen-Container-Service zu den Häfen Qingdao und Lianyungang',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europa',
    text: 'Großbritannien, Deutschland, Frankreich, Niederlande, Italien, Spanien — REACH-konforme Finishes, EU-Pflanzenschutzzeugnisse standardmäßig.' },
  { flag: '🇺🇸', name: 'Nordamerika',
    text: 'USA und Kanada — CARB-P2-Finishes, FBA-fertige Verpackung verfügbar, wöchentliche LCL-Konsolidierungen.' },
  { flag: '🇯🇵', name: 'Japan',
    text: 'Tokio, Osaka, Nagoya — JIS-Toleranzstandards, JAS-konforme Etikettierung auf Anfrage.' },
  { flag: '🇰🇷', name: 'Korea',
    text: 'Seoul, Busan — KC-Markenetikettierung unterstützt, schnelle Hafenrouten Incheon und Busan ab Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Echtes Werk, kein Trader',
    text: 'Unser 15.000 m² großes Werk in Cao County wird direkt von Chic Homeware geführt — kein Zwischenhändler, keine Aufschlagskette und keine stille Post zwischen Ihnen und dem Produktionsboden.' },
  { num: '02', title: 'Für kleine und mittlere Volumen',
    text: 'Die meisten Werke wollen 5.000-Stück-Aufträge. Wir sind auf Auflagen von 200 bis 5.000 Stück ausgelegt — das Volumen, das für Amazon-Eigenmarken, Etsy-Verkäufer, Geschenkhändler und Markenstarts zählt.' },
  { num: '03', title: 'Englischsprachiger Vertrieb',
    text: 'Unser Büro in Xiamen wickelt Ihr Projekt durchgehend in fließendem Englisch ab — vom Angebot über die Druckdaten bis zu den Versanddokumenten. Zeitzonenüberlappung mit den europäischen und amerikanischen Vormittagsstunden.' },
];

export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: 'Zertifiziert',         pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: 'Roadmap 2026',         pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: 'Roadmap 2026',         pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: 'In Bearbeitung',       pending: true  },
];

export const COPY = {
  meta: {
    title: 'Über uns — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — fünf Jahre alter Hersteller individueller Holzboxen mit Vertriebsbüro in Xiamen und 15.000 m²-Werk in Cao County, Shandong. Im Dienst von Amazon-Marken und Importeuren in Europa, USA, Japan und Korea.',
    ogDescription:
      'Hersteller individueller Holzboxen mit 15.000 m²-Werk in Cao County, Shandong. Im Dienst von Amazon-Marken und Importeuren weltweit.',
  },
  hero: {
    eyebrow: 'Über Xiamen Chic Homeware',
    titleA: 'Fünf Jahre',
    titleEm: 'Holzhandwerk.',
    titleB: 'Zwei Standorte. Ein Versprechen.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. ist ein Hersteller individueller Holz-Homewares, gebaut für den modernen Importmarkt — von Amazon-Markeninhabern und europäischen Einzelhändlern bis zu japanischen und koreanischen Großhändlern. Ein junges Werk mit tiefen Branchenwurzeln: gründergeführt, ab Werk, exportbereit.',
  },
  stats: {
    years: 'Jahre Geschäftstätigkeit',
    floor: 'Werksfläche',
    workers: 'Facharbeiter',
    markets: 'Exportmärkte',
  },
  story: {
    label: 'Unsere Geschichte',
    titleA: 'Gebaut von Holz-Leuten,',
    titleEm: 'für Marken-Leute.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. wurde 2021 gegründet</strong> von einem Team von Veteranen der chinesischen Holzproduktindustrie. Unser Gründer verbrachte mehr als zwei Jahrzehnte im Holzhandel — durchstreifte Holzplätze in Cao County, fuhr CNC-Programme in Heze und steuerte Exportaufträge aus Xiamen — bevor er Chic gründete, um Dinge anders zu machen.',
    p2html:
      'Die Prämisse war einfach: Ein echtes Werk in <strong>Cao County, Shandong</strong> — dem historischen Herzen der chinesischen Holzboxen-Industrie — kombinieren mit einem modernen Vertriebsbüro in <strong>Xiamen, Fujian</strong>, einem der führenden Exporttore des Landes. Die eine Seite kümmert sich um das Holz; die andere Seite um die Welt.',
    p3html:
      'Fünf Jahre später bedienen wir Hunderte Marken in Europa, Nordamerika, Japan und Korea — darunter eine lange Liste Amazon-Eigenmarkenverkäufer, die auf unsere schnelle Bearbeitung und gleichbleibende Finishqualität setzen.',
    features: [
      'Gründergeführt, kein Trading-Aufschlag',
      'Werk + Vertriebsbüro unter einem Unternehmen',
      '20+ Jahre Holzbranchen-Erfahrung an der Spitze',
      'Speziell für den Export gebaut — nicht für den Inlandsweiterverkauf',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '„Cao County ist der Ort, wo die Holzkisten der Welt gemacht werden. Wir sind stolz, von hier zu sein."',
    showroomAlt: 'Xiamen Chic Homeware Showroom — fertige Holzprodukte',
  },
  timeline: {
    label: 'Fünfjahres-Reise',
    titleA: 'Vom Werkstatt zur',
    titleEm: 'Welt',
  },
  locations: {
    label: 'Zwei Standorte',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'Unsere Leute',
    titleA: 'Das Team — & die',
    titleEm: 'Kunden',
    titleB: 'die uns besuchen',
    intro: 'Wir sind ein kleines, gründergeführtes Team in Xiamen, und wir lieben es, Käufer, Markeninhaber und Amazon-Verkäufer zu empfangen, die kommen, um zu sehen, wie ihre Boxen entstehen.',
  },
  gallery: {
    label: 'Im Werk',
    titleA: 'Ein Blick auf unseren',
    titleEm: 'Standort Cao County',
    intro: 'Vom Holzplatz bis zur fertigen Kiste — jeder Schritt geschieht unter einem Dach, unter den Augen unserer eigenen Leute.',
  },
  production: {
    label: 'Wie eine Box entsteht',
    titleA: 'Sechs Schritte vom',
    titleEm: 'Holz zur Haustür',
    intro: 'Jede Holzbox, die unser Werk in Cao County verlässt, durchläuft die gleichen sechs Produktionsstationen. Unten in unserer eigenen Werkstatt fotografiert — keine Stockfotos, keine Drittanbieter, jedes Bild auf unserem Hallenboden aufgenommen.',
  },
  markets: {
    label: 'Wohin unsere Boxen gehen',
    titleA: 'Export in',
    titleEm: 'Industrieländer',
    intro: 'Wir konzentrieren uns ausschließlich auf den Export in entwickelte Märkte — Länder, in denen Käufer gleichbleibende Qualität, korrekte Dokumentation und pünktliche Lieferung erwarten. Unser Team spricht Englisch, bereitet Exportpapiere nach Spec vor und arbeitet in Ihrer Zeitzone. Keine Überraschungen am Zoll.',
    amazonHtml:
      '<strong>Wir sind ein Amazon-freundlicher Hersteller.</strong> Ein großer Anteil unserer 200+ aktiven Kunden sind Amazon-Eigenmarken auf den Marktplätzen USA, UK und Deutschland. Wir versenden FBA-fertige Kartons mit FNSKU-Etiketten, liefern UPC-Barcodes und erfüllen die Verpackungs- und Volumengewichtsregeln von Amazon ab Werk.',
  },
  values: {
    label: 'Wie wir arbeiten',
    titleA: 'Was uns',
    titleEm: 'auszeichnet',
  },
  certs: {
    label: 'Standards & Compliance',
    title: 'Zertifizierungen',
    paragraph:
      'Unser Holz stammt aus FSC-zertifizierten Forstkanälen, und wir betreiben ein Chain-of-Custody-Programm, um saubere Audit-Spuren vom Stamm bis zum Karton zu halten. Weitere unten gelistete Standards stehen auf unserer 2026-Roadmap, je nach Kundennachfrage.',
  },
  cta: {
    label: 'Sprechen Sie mit uns',
    titleA: 'Lassen Sie uns etwas',
    titleB: 'gemeinsam bauen',
    sub: 'Erzählen Sie uns von Ihrem Projekt — Holzart, Größen, Stückzahl und Branding-Anforderungen. Wir antworten innerhalb von 24 Stunden.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
