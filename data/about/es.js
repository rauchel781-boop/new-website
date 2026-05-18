// About — Spanish translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: 'Fábrica de Cao County · 15.000 m²' },
  { src: F('material.jpg'),     caption: 'Stock de madera maciza · paulownia, pino, roble' },
  { src: F('1-1.jpg'),          caption: 'Taller de preparación de madera' },
  { src: F('painting.jpg'),     caption: 'Línea de acabado a pistola con control de polvo' },
  { src: F('1-3.jpg'),          caption: 'Instalación de bisagras · QC de herrajes' },
  { src: F('warehouse.jpg'),    caption: 'Almacén de productos terminados · listo para enviar' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: 'Oficina de Ventas · Xiamen, Fujian',  tag: 'Oficina' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'Recibiendo a nuestros clientes',     tag: 'Cliente' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: 'Recibiendo a un comprador extranjero', tag: 'Cliente' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: 'Nuestro equipo',                     tag: 'Equipo' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: 'Corte a Medida',
    desc: 'La madera maciza y los paneles se dimensionan en nuestras sierras. Tolerancia mantenida a ±0,5 mm para que cada pieza encaje perfectamente en la siguiente estación.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: 'Corte de Formas',
    desc: 'Fresadoras CNC y sierras de cinta cortan las curvas, ingletes y rebajes que definen cada caja. Programas guardados por SKU para producción en serie repetible.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'Corte de Mortajas',
    desc: 'Mortajas para bisagras, alojamientos para cerraduras y ranuras de divisores se fresan y cincelan. Aquí la precisión de la unión decide cómo encaja la tapa.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: 'Pre-Ensamblaje',
    desc: 'Los paneles se ajustan en seco y se calibran antes de cualquier cola. Los herrajes se prueban primero — cada ajuste se confirma antes del encolado final.' },
  { n: '05', src: P('5-polishing.jpg'),       title: 'Pulido y Lijado',
    desc: 'Lijado multi-grano de 120 → 400 produce la superficie sedosa que necesita nuestro equipo de acabado. Cantos suavizados, esquinas redondeadas, polvo extraído en origen.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: 'Embalaje y QC',
    desc: 'Cada caja se inspecciona, limpia y embala con esquineros y film retráctil. Los cartones se etiquetan según tu especificación — listos para FBA o para máster.' },
];

export const TIMELINE = [
  { year: '2021', title: 'Fundación',
    text: 'Xiamen Chic Homeware Co.,Ltd. registrada en Xiamen. El fundador asegura un taller socio en Cao County y envía los primeros palets de exportación.' },
  { year: '2022', title: 'Primera Fábrica',
    text: 'Firmado el alquiler de un sitio dedicado de 6.000 m² en Pulianji. Incorporamos al primer cliente europeo de cajas de vino.' },
  { year: '2023', title: 'Boom de Amazon',
    text: 'Construida una línea dedicada a MOQ pequeño para marcas privadas de Amazon. Superado un millón de unidades enviadas en un solo año.' },
  { year: '2024', title: 'Certificado FSC',
    text: 'Lograda la certificación FSC de cadena de custodia. Fábrica ampliada a 15.000 m² con nueva área de acabado y QC.' },
  { year: '2025', title: 'Globalización',
    text: 'Clientes activos en 40+ países. Equipo interno de ID + maquetas 3D lanzado para apoyar el crecimiento OEM/ODM.' },
];

export const LOCATIONS = [
  {
    eyebrow: 'Oficina de Ventas',
    name: 'Xiamen, Fujian',
    role: 'Ventas · diseño · documentación de exportación',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, Distrito Jimei, Xiamen, Fujian, China',
    details: [
      'Gestión de cuentas y equipo de ventas en inglés',
      'Renderizado 3D, coordinación de muestras, reserva de fletes',
      'A diez minutos del Aeropuerto Internacional de Xiamen Gaoqi',
      'Envíos contenerizados desde Puerto de Xiamen — 130+ rutas globales directas',
    ],
  },
  {
    eyebrow: 'Fábrica de Producción',
    name: 'Cao County, Shandong',
    role: 'Fabricación · acabado · QC · embalaje',
    addr: 'Norte de la Oficina de Administración para la Regulación del Mercado, Pueblo de Pulianji, Cao County, Heze, Provincia de Shandong, China',
    details: [
      '15.000 m² con líneas CNC, láser, acabado y ensamblaje',
      '120+ trabajadores cualificados en dos turnos de producción',
      'Acceso local a paulownia, pino, bambú, nogal y roble',
      'Servicio ferroviario directo de contenedores a los puertos de Qingdao y Lianyungang',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'Europa',
    text: 'Reino Unido, Alemania, Francia, Países Bajos, Italia, España — acabados conformes a REACH, certificados fitosanitarios UE de serie.' },
  { flag: '🇺🇸', name: 'Norteamérica',
    text: 'Estados Unidos y Canadá — acabados CARB P2, embalaje listo para FBA disponible, consolidaciones LCL semanales.' },
  { flag: '🇯🇵', name: 'Japón',
    text: 'Tokio, Osaka, Nagoya — estándares de tolerancia JIS, etiquetado conforme a JAS bajo solicitud.' },
  { flag: '🇰🇷', name: 'Corea',
    text: 'Seúl, Busán — etiquetado con marca KC compatible, rutas portuarias rápidas a Incheon y Busán desde Xiamen.' },
];

export const VALUES = [
  { num: '01', title: 'Fábrica Real, No un Trader',
    text: 'Nuestra fábrica de 15.000 m² en Cao County es propiedad y operación directa de Chic Homeware — sin intermediarios, sin cadena de márgenes y sin teléfono escacharrado entre tú y el taller.' },
  { num: '02', title: 'Hechos para Volúmenes Pequeños y Medios',
    text: 'La mayoría de las fábricas quieren pedidos de 5.000 unidades. Estamos construidos en torno a tiradas de 200 a 5.000 piezas — el volumen que importa a las marcas de Amazon, vendedores de Etsy, regalo y lanzamientos de marca.' },
  { num: '03', title: 'Ventas en Inglés',
    text: 'Nuestra oficina de Xiamen gestiona tu proyecto de principio a fin en inglés fluido — desde la cotización al arte y la documentación de envío. Solapamiento de zona horaria con las mañanas de UE y EE. UU.' },
];

export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: 'Certificado',          pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: 'Hoja de ruta 2026',    pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: 'Hoja de ruta 2026',    pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: 'En proceso',           pending: true  },
];

export const COPY = {
  meta: {
    title: 'Sobre Nosotros — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — fabricante de cajas de madera personalizadas con cinco años de historia, oficina de ventas en Xiamen y fábrica de 15.000 m² en Cao County, Shandong. Servimos a marcas de Amazon e importadores en Europa, EE. UU., Japón y Corea.',
    ogDescription:
      'Fabricante de cajas de madera personalizadas con fábrica de 15.000 m² en Cao County, Shandong. Servicio a marcas de Amazon e importadores en todo el mundo.',
  },
  hero: {
    eyebrow: 'Sobre Xiamen Chic Homeware',
    titleA: 'Cinco Años de',
    titleEm: 'Maestría en Madera.',
    titleB: 'Dos Sedes. Una Promesa.',
    sub: 'Xiamen Chic Homeware Co.,Ltd. es un fabricante de homeware en madera a medida, construido para servir al mercado de importación moderno — desde marcas de Amazon y minoristas europeos hasta mayoristas japoneses y coreanos. Una fábrica joven con raíces profundas en el sector: dirigida por su fundador, directa de fábrica, lista para exportar.',
  },
  stats: {
    years: 'Años de actividad',
    floor: 'Superficie de fábrica',
    workers: 'Trabajadores cualificados',
    markets: 'Mercados de exportación',
  },
  story: {
    label: 'Nuestra Historia',
    titleA: 'Construido por Gente de la Madera,',
    titleEm: 'para Gente de Marca.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. fue fundada en 2021</strong> por un equipo de veteranos del sector chino de productos de madera. Nuestro fundador pasó más de dos décadas dentro del comercio de la madera — recorriendo aserraderos en Cao County, ejecutando programas CNC en Heze y gestionando pedidos de exportación desde Xiamen — antes de fundar Chic para hacer las cosas de otra manera.',
    p2html:
      'La premisa era simple: combinar una fábrica real en <strong>Cao County, Shandong</strong> — el corazón histórico de la industria china de cajas de madera — con una oficina comercial moderna en <strong>Xiamen, Fujian</strong>, una de las principales puertas de exportación del país. Un lado se ocupa de la madera; el otro lado se ocupa del mundo.',
    p3html:
      'Cinco años después, servimos a cientos de marcas en Europa, Norteamérica, Japón y Corea — incluida una larga lista de vendedores de marca privada de Amazon que cuentan con nuestra rapidez y consistencia de acabado.',
    features: [
      'Dirigida por el fundador, sin margen de trading',
      'Fábrica + oficina comercial bajo una sola empresa',
      '20+ años de experiencia de la industria de la madera al timón',
      'Construida específicamente para exportación — no para reventa doméstica',
    ],
    showroomTag: 'Showroom · Xiamen',
    quote: '«Cao County es donde se hacen las cajas de madera del mundo. Estamos orgullosos de ser de aquí.»',
    showroomAlt: 'Showroom de Xiamen Chic Homeware — productos de madera terminados',
  },
  timeline: {
    label: 'Trayectoria de Cinco Años',
    titleA: 'Del Taller al',
    titleEm: 'Mundo Entero',
  },
  locations: {
    label: 'Dos Sedes',
    titleA: 'Xiamen +',
    titleEm: 'Cao County',
  },
  team: {
    label: 'Nuestra Gente',
    titleA: 'El Equipo — y los',
    titleEm: 'Clientes',
    titleB: 'que nos Visitan',
    intro: 'Somos un equipo pequeño dirigido por el fundador en Xiamen, y nos encanta recibir a los compradores, propietarios de marcas y vendedores de Amazon que vienen a ver cómo se hacen sus cajas.',
  },
  gallery: {
    label: 'Dentro de la Fábrica',
    titleA: 'Una Mirada a Nuestra',
    titleEm: 'Sede de Cao County',
    intro: 'Del aserradero a la caja terminada — cada paso ocurre bajo un mismo techo, bajo la mirada de nuestra propia gente.',
  },
  production: {
    label: 'Cómo se Fabrica una Caja',
    titleA: 'Seis Pasos de la',
    titleEm: 'Madera a tu Puerta',
    intro: 'Cada caja de madera que sale de nuestra fábrica de Cao County pasa por las mismas seis estaciones de producción. Fotografiadas a continuación en nuestro propio taller — sin imágenes de stock, sin proveedores externos, cada toma realizada en nuestra planta.',
  },
  markets: {
    label: 'A Dónde van Nuestras Cajas',
    titleA: 'Exportamos a',
    titleEm: 'Mercados Desarrollados',
    intro: 'Nos centramos exclusivamente en exportaciones a mercados desarrollados — países donde los compradores esperan calidad consistente, documentación correcta y entrega puntual. Nuestro equipo habla inglés, prepara papeles de exportación según especificación y trabaja en tu zona horaria. Sin sorpresas en aduanas.',
    amazonHtml:
      '<strong>Somos un fabricante Amazon-friendly.</strong> Una gran parte de nuestros 200+ clientes activos son marcas de Amazon de marca privada en los mercados de EE. UU., Reino Unido y Alemania. Enviamos cartones listos para FBA con etiquetas FNSKU, ofrecemos códigos UPC y cumplimos las normas de embalaje y peso dimensional de Amazon directamente.',
  },
  values: {
    label: 'Cómo Trabajamos',
    titleA: 'Lo que nos hace',
    titleEm: 'Diferentes',
  },
  certs: {
    label: 'Estándares y Cumplimiento',
    title: 'Certificaciones',
    paragraph:
      'Nuestra madera procede de canales forestales certificados FSC y operamos un programa de cadena de custodia para mantener trazabilidad limpia desde el tronco hasta el cartón. Los estándares adicionales listados están en nuestra hoja de ruta 2026 según crece la demanda de los clientes.',
  },
  cta: {
    label: 'Habla con Nosotros',
    titleA: 'Construyamos Algo',
    titleB: 'Juntos',
    sub: 'Cuéntanos sobre tu proyecto — tipo de madera, tamaños, cantidad y cualquier requisito de branding. Respondemos en 24 horas.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
