// About — French translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Usine de Cao County · 15 000 m²' },
  { src: F('material.jpg'),     caption: 'Stock de bois massif · paulownia, pin, chêne' },
  { src: F('1-1.jpg'),          caption: 'Atelier de préparation du bois' },
  { src: F('painting.jpg'),     caption: 'Ligne de finition au pistolet sous contrôle de poussière' },
  { src: F('1-3.jpg'),          caption: 'Pose des charnières · QC quincaillerie' },
  { src: F('warehouse.jpg'),    caption: 'Entrepôt produits finis · prêt à expédier' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Bureau Commercial · Xiamen, Fujian',     tag: 'Bureau' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Accueil de nos clients',                tag: 'Client' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Accueil d’un acheteur étranger',        tag: 'Client' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'Notre équipe',                          tag: 'Équipe' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Découpe à Dimension',
    desc: 'Bois massifs et panneaux usinés sont mis aux dimensions sur nos scies à panneaux. Tolérance maintenue à ±0,5 mm pour que chaque pièce s’ajuste parfaitement à la station suivante.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Découpe de Formes',
    desc: 'Fraiseuses CNC et scies à ruban découpent courbes, onglets et feuillures qui définissent chaque boîte. Programmes enregistrés par SKU pour une production de masse répétable.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Découpe des Mortaises',
    desc: 'Mortaises de charnières, logements de serrures et rainures de séparateurs sont fraisés et ciselés. C’est ici que la précision d’assemblage décide du parfait ajustement du couvercle.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Pré-Assemblage',
    desc: 'Les panneaux sont assemblés à blanc et calibrés avant toute colle. La quincaillerie est testée d’abord — chaque ajustement confirmé avant le collage final.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Polissage et Ponçage',
    desc: 'Ponçage multi-grain de 120 → 400 produit la surface soyeuse dont notre équipe finition a besoin. Arêtes adoucies, coins arrondis, poussière extraite à la source.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Emballage et QC',
    desc: 'Chaque boîte est inspectée, essuyée et emballée avec coins de protection et film rétractable. Les cartons sont étiquetés selon votre spec — prêt FBA ou carton master.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Fondation',
    text: 'Xiamen Chic Homeware Co.,Ltd. enregistrée à Xiamen. Le fondateur sécurise un atelier partenaire à Cao County et expédie ses premières palettes export.' },
  { year: '2022', title: 'Première Usine',
    text: 'Bail signé sur un site de production dédié de 6 000 m² à Pulianji. Premier client européen de boîtes à vin embarqué.' },
  { year: '2023', title: 'Boom Amazon',
    text: 'Ligne dédiée petites MOQ pour marques privées Amazon construite. Cap du million d’unités expédiées en une seule année franchi.' },
  { year: '2024', title: 'Certifié FSC',
    text: 'Certification FSC chaîne de custody obtenue. Usine étendue à 15 000 m² avec nouvelle zone de finition et de QC.' },
  { year: '2025', title: 'Cap sur le Monde',
    text: 'Clients actifs dans 40+ pays. Équipe interne ID + maquettes 3D lancée pour soutenir la croissance OEM/ODM.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Bureau Commercial',
    name: 'Xiamen, Fujian',
    role: 'Ventes · design · documentation export',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, District de Jimei, Xiamen, Fujian, Chine',
    details: [
      'Gestion de compte et équipe commerciale anglophone',
      'Rendus 3D, coordination échantillons, réservation fret',
      'À dix minutes de l’aéroport international de Xiamen Gaoqi',
      'Expédition conteneurs via le port de Xiamen — 130+ routes mondiales directes',
    ],
  },
  {
    eyebrow: 'Usine de Production',
    name: 'Cao County, Shandong',
    role: 'Fabrication · finition · QC · emballage',
    addr: 'Au nord du bureau de l’Administration pour la Régulation du Marché, village de Pulianji, canton de Pulianji, Cao County, Heze, province du Shandong, Chine',
    details: [
      '15 000 m² avec lignes CNC, laser, finition et assemblage',
      '120+ ouvriers qualifiés sur deux équipes de production',
      'Accès local au paulownia, pin, bambou, noyer et chêne',
      'Service ferroviaire conteneurs direct vers les ports de Qingdao et Lianyungang',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europe',
    text: 'Royaume-Uni, Allemagne, France, Pays-Bas, Italie, Espagne — finitions conformes REACH, certificats phytosanitaires UE en standard.' },
  { flag: '🇺🇸', name: 'Amérique du Nord',
    text: 'États-Unis et Canada — finitions CARB P2, emballage prêt FBA disponible, consolidations LCL hebdomadaires.' },
  { flag: '🇯🇵', name: 'Japon',
    text: 'Tokyo, Osaka, Nagoya — standards de tolérance JIS, étiquetage conforme JAS sur demande.' },
  { flag: '🇰🇷', name: 'Corée',
    text: 'Séoul, Busan — étiquetage marque KC supporté, routes portuaires rapides Incheon et Busan depuis Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Vraie Usine, Pas un Trader',
    text: 'Notre usine de 15 000 m² à Cao County est détenue et exploitée directement par Chic Homeware — pas d’intermédiaire, pas de chaîne de marges et pas de téléphone arabe entre vous et l’atelier.' },
  { num: '02', title: 'Conçu pour les Petites et Moyennes Séries',
    text: 'La plupart des usines veulent des commandes de 5 000 pièces. Nous sommes construits autour de séries de 200 à 5 000 pièces — le volume qui compte pour les marques Amazon, vendeurs Etsy, détaillants cadeaux et lancements de marque.' },
  { num: '03', title: 'Vente en Anglais',
    text: 'Notre bureau de Xiamen gère votre projet de bout en bout en anglais courant — du devis à l’artwork aux documents d’expédition. Recouvrement horaire avec les matins UE et US.' },
];

export const CERTS = [
  { icon: '🌲', name: 'FSC',       status: 'Certifié',          pending: false },
  { icon: '🇪🇺', name: 'EU REACH', status: 'Roadmap 2026',      pending: true  },
  { icon: '✅', name: 'CARB P2',   status: 'Roadmap 2026',      pending: true  },
  { icon: '🏅', name: 'ISO 9001',  status: 'En cours',           pending: true  },
];

export const COPY = {
  meta: {
    title: 'À Propos — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — fabricant de boîtes en bois sur mesure depuis cinq ans, avec un bureau commercial à Xiamen et une usine de 15 000 m² à Cao County, Shandong. Au service des marques Amazon et importateurs en Europe, US, Japon et Corée.',
    ogDescription:
      'Fabricant de boîtes en bois sur mesure avec une usine de 15 000 m² à Cao County, Shandong. Au service des marques Amazon et importateurs dans le monde.',
  },
  hero: {
    eyebrow: 'À Propos de Xiamen Chic Homeware',
    titleA: 'Cinq Ans d’',
    titleEm: 'Artisanat du Bois.',
    titleB: 'Deux Sites. Une Promesse.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. est un fabricant d’articles en bois sur mesure construit pour servir le marché de l’importation moderne — des marques Amazon aux détaillants européens en passant par les grossistes japonais et coréens. Une usine jeune aux racines industrielles profondes : dirigée par son fondateur, directe-usine, prête à exporter.',
  },
  stats: {
    years: 'Années d’activité',
    floor: 'Surface d’usine',
    workers: 'Ouvriers qualifiés',
    markets: 'Marchés export',
  },
  story: {
    label: 'Notre Histoire',
    titleA: 'Construit par les Gens du Bois,',
    titleEm: 'pour les Gens de la Marque.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. a été fondée en 2021</strong> par une équipe de vétérans de l’industrie chinoise des produits en bois. Notre fondateur a passé plus de deux décennies dans le commerce du bois — arpentant les parcs à grumes de Cao County, exécutant des programmes CNC à Heze et gérant des commandes export depuis Xiamen — avant de créer Chic pour faire les choses différemment.',
    p2html:
      'La prémisse était simple : combiner une vraie usine à <strong>Cao County, Shandong</strong> — le cœur historique de l’industrie chinoise des boîtes en bois — avec un bureau commercial moderne à <strong>Xiamen, Fujian</strong>, l’une des principales portes d’export du pays. Un côté gère le bois ; l’autre côté gère le monde.',
    p3html:
      'Cinq ans plus tard, nous servons des centaines de marques en Europe, Amérique du Nord, Japon et Corée — y compris une longue liste de vendeurs Amazon en marque privée qui comptent sur notre réactivité et la régularité de nos finitions.',
    features: [
      'Dirigée par son fondateur, sans marge de trading',
      'Atelier + bureau commercial sous une seule entreprise',
      '20+ ans d’expérience de l’industrie du bois aux commandes',
      'Construite spécifiquement pour l’export — pas pour la revente domestique',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '« Cao County, c’est là où sont fabriquées les boîtes en bois du monde. Nous sommes fiers d’en venir. »',
    showroomAlt: 'Showroom Xiamen Chic Homeware — produits en bois finis',
  },
  timeline: {
    label: 'Cinq Ans de Parcours',
    titleA: 'De l’Atelier au',
    titleEm: 'Monde Entier',
  },
  locations: {
    label: 'Deux Sites',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'Nos Gens',
    titleA: 'L’Équipe — & les',
    titleEm: 'Clients',
    titleB: 'qui nous Rendent Visite',
    intro: 'Nous sommes une petite équipe dirigée par le fondateur à Xiamen, et nous adorons accueillir les acheteurs, propriétaires de marques et vendeurs Amazon qui viennent voir comment leurs boîtes sont faites.',
  },
  gallery: {
    label: 'À l’Intérieur de l’Usine',
    titleA: 'Un Aperçu de Notre',
    titleEm: 'Site de Cao County',
    intro: 'Du parc à grumes à la caisse finie — chaque étape se passe sous un même toit, sous le regard de nos propres gens.',
  },
  production: {
    label: 'Comment une Boîte est Fabriquée',
    titleA: 'Six Étapes du',
    titleEm: 'Bois à votre Porte',
    intro: 'Chaque boîte en bois qui sort de notre usine de Cao County passe par les mêmes six stations de production. Photographiées ci-dessous dans notre propre atelier — pas d’images de stock, pas de sous-traitance tierce, chaque cliché pris sur notre sol.',
  },
  markets: {
    label: 'Où Vont nos Boîtes',
    titleA: 'Export vers les',
    titleEm: 'Marchés Développés',
    intro: 'Nous nous concentrons exclusivement sur les exports vers les marchés développés — pays où les acheteurs attendent qualité régulière, documentation exacte et livraison à l’heure. Notre équipe parle anglais, prépare la paperasse export aux specs et travaille à votre fuseau horaire. Aucune surprise en douane.',
    amazonHtml:
      '<strong>Nous sommes un fabricant Amazon-friendly.</strong> Une grande partie de nos 200+ clients actifs sont des marques privées Amazon sur les marketplaces US, UK et Allemagne. Nous expédions des cartons prêts FBA avec étiquettes FNSKU, fournissons les codes UPC et respectons d’emblée les règles d’emballage et de poids volumétrique d’Amazon.',
  },
  values: {
    label: 'Comment Nous Travaillons',
    titleA: 'Ce qui nous',
    titleEm: 'Distingue',
  },
  certs: {
    label: 'Standards et Conformité',
    title: 'Certifications',
    paragraph:
      'Notre bois provient de canaux forestiers certifiés FSC et nous opérons un programme de chaîne de custody pour garder une traçabilité propre du rondin au carton. Les standards additionnels listés ci-dessous sont sur notre roadmap 2026 selon la demande clients.',
  },
  cta: {
    label: 'Parlez-nous',
    titleA: 'Construisons Quelque Chose',
    titleB: 'Ensemble',
    sub: 'Parlez-nous de votre projet — type de bois, tailles, quantité et exigences de branding. Nous répondons sous 24 heures.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
