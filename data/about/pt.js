// About — Portuguese translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Fábrica de Cao County · 15.000 m²' },
  { src: F('material.jpg'),     caption: 'Stock de madeira maciça · paulownia, pinho, carvalho' },
  { src: F('1-1.jpg'),          caption: 'Oficina de preparação de madeira' },
  { src: F('painting.jpg'),     caption: 'Linha de acabamento à pistola com controlo de pó' },
  { src: F('1-3.jpg'),          caption: 'Instalação de dobradiças · QC de ferragens' },
  { src: F('warehouse.jpg'),    caption: 'Armazém de produtos acabados · pronto a expedir' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Escritório de Vendas · Xiamen, Fujian',  tag: 'Escritório' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Recebendo os nossos clientes',          tag: 'Cliente' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Recebendo um comprador estrangeiro',    tag: 'Cliente' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'A nossa equipa',                        tag: 'Equipa' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Corte à Medida',
    desc: 'Madeira maciça e painéis são dimensionados nas nossas serras de painéis. Tolerância mantida a ±0,5 mm para que cada peça encaixe perfeitamente na estação seguinte.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Corte de Formas',
    desc: 'Fresadoras CNC e serras de fita cortam as curvas, meias-esquadrias e rebaixos que definem cada caixa. Programas guardados por SKU para produção em série repetível.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Corte de Furos',
    desc: 'Furos para dobradiças, alojamentos para fechaduras e ranhuras de divisórias são fresados e cinzelados. É aqui que a precisão da junção decide como a tampa vai assentar.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Pré-Montagem',
    desc: 'Os painéis são ajustados a seco e calibrados antes de qualquer cola. As ferragens são instaladas em teste primeiro — cada ajuste confirmado antes da colagem final.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Polimento e Lixagem',
    desc: 'Lixagem multi-grão de 120 → 400 produz a superfície sedosa que a nossa equipa de acabamento precisa. Arestas suavizadas, cantos arredondados, pó extraído na origem.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Embalagem e QC',
    desc: 'Cada caixa é inspecionada, limpa e embalada com cantoneiras e filme retráctil. As caixas são etiquetadas conforme especificação — pronto FBA ou caixa-mestre.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Fundação',
    text: 'Xiamen Chic Homeware Co.,Ltd. registada em Xiamen. O fundador assegura uma oficina parceira em Cao County e expede as primeiras paletes de exportação.' },
  { year: '2022', title: 'Primeira Fábrica',
    text: 'Assinado o arrendamento de instalações de produção dedicadas de 6.000 m² em Pulianji. Onboard do primeiro cliente europeu de caixas para vinho.' },
  { year: '2023', title: 'Boom da Amazon',
    text: 'Construída uma linha dedicada a MOQ pequeno para marcas privadas Amazon. Ultrapassado um milhão de unidades expedidas num único ano.' },
  { year: '2024', title: 'Certificação FSC',
    text: 'Obtida a certificação FSC chain-of-custody. Fábrica ampliada para 15.000 m² com nova área de acabamento e QC.' },
  { year: '2025', title: 'Globalização',
    text: 'Clientes ativos em 40+ países. Equipa interna de ID + maquetes 3D lançada para apoiar o crescimento OEM/ODM.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Escritório de Vendas',
    name: 'Xiamen, Fujian',
    role: 'Vendas · design · documentação de exportação',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, Distrito de Jimei, Xiamen, Fujian, China',
    details: [
      'Gestão de conta e equipa de vendas em inglês',
      'Renderização 3D, coordenação de amostras, marcação de fretes',
      'A dez minutos do Aeroporto Internacional de Xiamen Gaoqi',
      'Envio de contentores via Porto de Xiamen — 130+ rotas globais diretas',
    ],
  },
  {
    eyebrow: 'Fábrica de Produção',
    name: 'Cao County, Shandong',
    role: 'Fabrico · acabamento · QC · embalagem',
    addr: 'A norte do gabinete da Administração para a Regulação do Mercado, aldeia de Pulianji, Cao County, Heze, Província de Shandong, China',
    details: [
      '15.000 m² com linhas CNC, laser, acabamento e montagem',
      '120+ trabalhadores qualificados em dois turnos de produção',
      'Acesso local a paulownia, pinho, bambu, nogueira e carvalho',
      'Serviço ferroviário direto de contentores aos portos de Qingdao e Lianyungang',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europa',
    text: 'Reino Unido, Alemanha, França, Países Baixos, Itália, Espanha — acabamentos conformes REACH, certificados fitossanitários UE de série.' },
  { flag: '🇺🇸', name: 'América do Norte',
    text: 'Estados Unidos e Canadá — acabamentos CARB P2, embalagem pronta para FBA disponível, consolidações LCL semanais.' },
  { flag: '🇯🇵', name: 'Japão',
    text: 'Tóquio, Osaka, Nagoya — padrões de tolerância JIS, etiquetagem conforme JAS mediante pedido.' },
  { flag: '🇰🇷', name: 'Coreia',
    text: 'Seul, Busan — etiquetagem com marca KC suportada, rotas portuárias rápidas Incheon e Busan a partir de Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Fábrica Real, Não um Trader',
    text: 'A nossa fábrica de 15.000 m² em Cao County é detida e operada diretamente pela Chic Homeware — sem intermediários, sem cadeia de margens e sem telefone partido entre si e o chão de fábrica.' },
  { num: '02', title: 'Construída para Volumes Pequenos e Médios',
    text: 'A maioria das fábricas quer encomendas de 5.000 unidades. Estamos construídos em torno de tiragens de 200 a 5.000 peças — o volume que conta para marcas Amazon, vendedores Etsy, retalhistas de presentes e lançamentos de marca.' },
  { num: '03', title: 'Vendas em Inglês',
    text: 'O nosso escritório em Xiamen gere o seu projeto de ponta a ponta em inglês fluente — do orçamento à arte e aos documentos de envio. Sobreposição de fuso horário com as manhãs UE e EUA.' },
];

export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: 'Certificado',         pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: 'Roteiro 2026',        pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: 'Roteiro 2026',        pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: 'Em curso',            pending: true  },
];

export const COPY = {
  meta: {
    title: 'Sobre Nós — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — fabricante de caixas de madeira personalizadas há cinco anos, com escritório de vendas em Xiamen e fábrica de 15.000 m² em Cao County, Shandong. Ao serviço de marcas Amazon e importadores na Europa, EUA, Japão e Coreia.',
    ogDescription:
      'Fabricante de caixas de madeira personalizadas com fábrica de 15.000 m² em Cao County, Shandong. Ao serviço de marcas Amazon e importadores no mundo.',
  },
  hero: {
    eyebrow: 'Sobre Xiamen Chic Homeware',
    titleA: 'Cinco Anos de',
    titleEm: 'Mestria em Madeira.',
    titleB: 'Duas Localizações. Uma Promessa.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. é um fabricante de homeware em madeira à medida, construído para servir o moderno mercado de importação — desde marcas Amazon e retalhistas europeus até grossistas japoneses e coreanos. Uma fábrica jovem com raízes profundas no setor: liderada pelo fundador, direta da fábrica, pronta para exportar.',
  },
  stats: {
    years: 'Anos em atividade',
    floor: 'Área de fábrica',
    workers: 'Trabalhadores qualificados',
    markets: 'Mercados de exportação',
  },
  story: {
    label: 'A Nossa História',
    titleA: 'Construído por Gente da Madeira,',
    titleEm: 'para Gente de Marca.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. foi fundada em 2021</strong> por uma equipa de veteranos da indústria chinesa de produtos em madeira. O nosso fundador passou mais de duas décadas dentro do comércio da madeira — a percorrer pátios de Cao County, a executar programas CNC em Heze e a gerir encomendas de exportação a partir de Xiamen — antes de fundar a Chic para fazer as coisas de forma diferente.',
    p2html:
      'A premissa era simples: combinar uma fábrica real em <strong>Cao County, Shandong</strong> — o coração histórico da indústria chinesa de caixas de madeira — com um moderno escritório de vendas em <strong>Xiamen, Fujian</strong>, uma das principais portas de exportação do país. Um lado trata da madeira; o outro lado trata do mundo.',
    p3html:
      'Cinco anos depois, servimos centenas de marcas na Europa, América do Norte, Japão e Coreia — incluindo uma longa lista de vendedores Amazon de marca privada que contam com a nossa rapidez e consistência de acabamento.',
    features: [
      'Liderada pelo fundador, sem margem de trading',
      'Fábrica + escritório de vendas numa só empresa',
      '20+ anos de experiência da indústria de madeira ao leme',
      'Construída especificamente para a exportação — não para revenda interna',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '«Cao County é onde se fazem as caixas de madeira do mundo. Temos orgulho em ser daqui.»',
    showroomAlt: 'Showroom Xiamen Chic Homeware — produtos em madeira acabados',
  },
  timeline: {
    label: 'Cinco Anos de Caminho',
    titleA: 'Da Oficina para o',
    titleEm: 'Mundo',
  },
  locations: {
    label: 'Duas Localizações',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'A Nossa Gente',
    titleA: 'A Equipa — e os',
    titleEm: 'Clientes',
    titleB: 'que nos visitam',
    intro: 'Somos uma pequena equipa liderada pelo fundador em Xiamen, e adoramos receber os compradores, donos de marcas e vendedores Amazon que vêm ver como as suas caixas são feitas.',
  },
  gallery: {
    label: 'Dentro da Fábrica',
    titleA: 'Um Olhar à Nossa',
    titleEm: 'Localização de Cao County',
    intro: 'Do pátio à caixa acabada — cada passo acontece debaixo do mesmo telhado, sob o olhar da nossa própria gente.',
  },
  production: {
    label: 'Como Nasce uma Caixa',
    titleA: 'Seis Passos da',
    titleEm: 'Madeira à Sua Porta',
    intro: 'Cada caixa de madeira que sai da nossa fábrica de Cao County passa pelas mesmas seis estações de produção. Fotografadas abaixo na nossa própria oficina — sem imagens de stock, sem subcontratação, cada foto tirada no nosso chão.',
  },
  markets: {
    label: 'Para Onde Vão as Nossas Caixas',
    titleA: 'Exportamos para',
    titleEm: 'Mercados Desenvolvidos',
    intro: 'Concentramo-nos exclusivamente em exportações para mercados desenvolvidos — países onde os compradores esperam qualidade consistente, documentação exata e entrega pontual. A nossa equipa fala inglês, prepara papelada de exportação à especificação e trabalha no seu fuso horário. Sem surpresas na alfândega.',
    amazonHtml:
      '<strong>Somos um fabricante Amazon-friendly.</strong> Uma grande parte dos nossos 200+ clientes ativos são marcas Amazon de marca privada nos mercados EUA, Reino Unido e Alemanha. Expedimos caixas prontas FBA com etiquetas FNSKU, fornecemos códigos UPC e cumprimos as regras de embalagem e peso volumétrico da Amazon de fábrica.',
  },
  values: {
    label: 'Como Trabalhamos',
    titleA: 'O que nos',
    titleEm: 'Distingue',
  },
  certs: {
    label: 'Padrões e Conformidade',
    title: 'Certificações',
    paragraph:
      'A nossa madeira provém de canais florestais certificados FSC e operamos um programa de chain-of-custody para manter trilhos de auditoria limpos do tronco à caixa. Os padrões adicionais listados estão no nosso roteiro 2026 conforme cresce a procura dos clientes.',
  },
  cta: {
    label: 'Fale Connosco',
    titleA: 'Vamos Construir Algo',
    titleB: 'Juntos',
    sub: 'Conte-nos sobre o seu projeto — tipo de madeira, tamanhos, quantidade e quaisquer requisitos de branding. Respondemos em 24 horas.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
