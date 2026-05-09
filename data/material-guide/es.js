// Material Guide — Spanish translation. Keeps the structural fields (slug,
// hero, gallery, swatch, productSlug, productCount, price) identical to en.js;
// translates only the human-readable text.

export const WOODS = [
  {
    slug: 'paulownia',
    name: 'Paulownia',
    nickname: 'El Árbol Emperatriz',
    tagline: 'La mitad del peso del pino. El doble de estable.',
    hero: '/paulwnia-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/paulwnia-wood-box/3/3-01.webp',
      '/paulwnia-wood-box/4/4-01.webp',
      '/paulwnia-wood-box/set-7/set-7-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #EBD9B8, #D9B98F)',
    origin:
      'Originaria del centro y norte de China — el «árbol emperatriz». Cultivada en plantaciones de Shandong y Anhui, alcanza tamaño de tala en solo 5–7 años, lo que la convierte en una de las maderas más renovables del planeta.',
    character:
      'De color crema pálido a rubio, con un grano perfectamente recto y uniforme y un suave brillo satinado. Apenas presenta veta visible — el lienzo perfecto para grabado láser, hot foil e impresión.',
    properties: [
      { label: 'Densidad', value: '~280 kg/m³' },
      { label: 'Dureza Janka', value: '~300' },
      { label: 'Color', value: 'Crema pálido / rubio' },
      { label: 'Veta', value: 'Recta, uniforme' },
      { label: 'Estabilidad', value: 'Excelente' },
      { label: 'Sostenibilidad', value: '★★★★★' },
    ],
    strengths: [
      'La madera comercial más ligera del mercado — ahorro directo en flete, especialmente en cajas regalo grandes.',
      'Estable dimensionalmente frente a cambios de humedad — no se deforma ni agrieta entre Cantón y Hamburgo.',
      'Grabado láser nítido sin halo de quemadura, incluso a alta resolución.',
      'Superficie pálida y neutra que admite cualquier tinte, pintura o impresión sin contaminación cromática.',
    ],
    consider: [
      'Superficie blanda — se abolla con golpes. Ideal para presentación, no para uso intenso diario.',
      'No es naturalmente resistente al agua; se requiere sellado en ambientes húmedos.',
    ],
    bestFor: [
      'Cajas regalo y de suscripción de gran volumen',
      'Embalaje de vino de una sola botella',
      'Kits de papelería y manualidades',
      'Cajas grandes para exposición / display',
    ],
    care: 'Mantener en seco. Limpiar el polvo con un paño suave. Limpiar con paño húmedo solo después de aplicar un acabado sellador.',
    price: 1,
    productSlug: 'paulownia',
    productCount: '20+',
  },
  {
    slug: 'pine',
    name: 'Pino',
    nickname: 'El Caballo de Tiro',
    tagline: 'Asequible, con carácter, envejece bellamente.',
    hero: '/pine-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/pine-wood-box/11/11-01.webp',
      '/pine-wood-box/12/12-01.webp',
      '/pine-wood-box/set-13/set-13-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #D9B98F, #A07852)',
    origin:
      'Procede de plantaciones europeas de pino silvestre y de pino radiata neozelandés. El pino es la madera clásica de cajón y de granja — instantáneamente reconocible, instantáneamente evocadora.',
    character:
      'Amarillo-tostado pálido cuando es nuevo, envejece a un cálido ámbar miel. Las calidades sin nudos resultan limpias y modernas; las rústicas con nudos aportan carácter evidente. Veta suave y ondulada.',
    properties: [
      { label: 'Densidad', value: '~510 kg/m³' },
      { label: 'Dureza Janka', value: '~380' },
      { label: 'Color', value: 'Amarillo pálido → ámbar' },
      { label: 'Veta', value: 'Suave, opc. con nudos' },
      { label: 'Estabilidad', value: 'Moderada' },
      { label: 'Sostenibilidad', value: '★★★★' },
    ],
    strengths: [
      'La mejor relación precio/pie tablar de todas nuestras especies — perfecto cuando el presupuesto manda.',
      'Acepta pirograbado, acabado quemado y tinte como pocas maderas duras pueden.',
      'Calidad sin nudos para look moderno, calidad nudosa para cajones rústicos — misma cadena de suministro.',
      'Envejece con una pátina ámbar cálida que muchos compradores prefieren al estado de nuevo.',
    ],
    consider: [
      'Más blando que las maderas duras — se notan abolladuras, arañazos y marcas de herramientas.',
      'Las bolsas de resina pueden exudar si la madera no está bien secada en horno (secamos al estándar 8% MC).',
    ],
    bestFor: [
      'Cajones de vino y whisky con marcas a fuego',
      'Cajas de jardín, semillas y patio',
      'Embalaje regalo rústico y decoración farmhouse',
      'Cajas de herramientas y taller',
    ],
    care: 'Quitar el polvo regularmente. Si está aceitada, reaceitar anualmente. Evitar humedad directa prolongada.',
    price: 2,
    productSlug: 'pine',
    productCount: '25+',
  },
  {
    slug: 'bamboo',
    name: 'Bambú',
    nickname: 'La Madera Dura Eco',
    tagline: 'Más duro que el roble. Más verde que cualquier cosa.',
    hero: '/bamboo-box/set-1/set-1-01.webp',
    gallery: [
      '/bamboo-box/set-7/set-7-01.webp',
      '/bamboo-box/set-8/set-8-01.webp',
      '/bamboo-box/set-13/set-13-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #C8B68A, #94814A)',
    origin:
      'Bambú Moso del sur de China — la única especie suficientemente dura para producción de tableros. Técnicamente una hierba, rebrota desde el mismo sistema radicular en 5–7 años sin replantación.',
    character:
      'Dorado pálido (natural) o caramelo cálido (carbonizado al vapor a presión). Inconfundibles bandas horizontales del laminado de tallos. Muy moderno, muy limpio.',
    properties: [
      { label: 'Densidad', value: '~700 kg/m³' },
      { label: 'Dureza Janka', value: '~1380' },
      { label: 'Color', value: 'Dorado pálido o caramelo' },
      { label: 'Veta', value: 'Lámina rayada' },
      { label: 'Estabilidad', value: 'Muy buena (seco)' },
      { label: 'Sostenibilidad', value: '★★★★★' },
    ],
    strengths: [
      'El material estructural más renovable que ofrecemos — rebrota en menos de una década sin replantación.',
      'Naturalmente antibacteriano y antimicrobiano — preferido para almacenamiento de cocina, baño y té.',
      'Janka 1380 — más duro que el roble rojo, más denso que la mayoría de maderas duras templadas.',
      'Acabados natural y carbonizado dan dos paletas de color distintas a partir de una sola especie.',
    ],
    consider: [
      'No admite tallado profundo ni grabado en relieve — la estructura laminada se astilla.',
      'Las bandas horizontales son icónicas, pero no encajan en toda estética tradicional.',
    ],
    bestFor: [
      'Almacenaje de té, café y cápsulas con acabado food-safe',
      'Organizadores de cocina, cubertería y especias',
      'Cajas de amenidades para hoteles y spas',
      'Embalaje regalo y de suscripción con posicionamiento ecológico',
    ],
    care: 'Limpiar con paño húmedo y secar. Reaceitar con aceite mineral si se usa en cocina. El acabado carbonizado se oscurece con el uso — es una característica.',
    price: 2,
    productSlug: 'bamboo',
    productCount: '15+',
  },
  {
    slug: 'acacia',
    name: 'Acacia',
    nickname: 'La Madera con Carácter',
    tagline: 'De miel a chocolate, en remolinos dramáticos.',
    hero: '/acacia-wood-box/set-1/set-1-01.webp',
    gallery: [
      '/acacia-wood-box/4/4-01.webp',
      '/acacia-wood-box/5/5-01.webp',
      '/acacia-wood-box/9/9-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #A07852, #5C3A24)',
    origin:
      'Cultivada en plantaciones de Vietnam, Indonesia y África Oriental. Madera dura tropical de crecimiento rápido que ofrece dureza premium a precio intermedio — siempre que provenga de plantaciones certificadas FSC.',
    character:
      'Corazón amarillo miel veteado de chocolate intenso, con figura ondulada dramática. Cada pieza es única — el carácter, no la uniformidad, es el punto fuerte.',
    properties: [
      { label: 'Densidad', value: '~750 kg/m³' },
      { label: 'Dureza Janka', value: '~2300' },
      { label: 'Color', value: 'Miel → chocolate' },
      { label: 'Veta', value: 'Remolinos dramáticos' },
      { label: 'Estabilidad', value: 'Buena' },
      { label: 'Sostenibilidad', value: '★★★★ (FSC)' },
    ],
    strengths: [
      'Una de las maderas comercialmente disponibles más duras — duradera para uso diario.',
      'Naturalmente resistente al agua por sus propios aceites — sellado mínimo necesario.',
      'La veta figurada dramática se realza profundamente con solo una mano de aceite.',
      'Aspecto premium a precio intermedio — el mejor valor en el segmento «madera dura con carácter».',
    ],
    consider: [
      'Variación de color amplia entre piezas — quien busque uniformidad debería elegir nogal o paulownia.',
      'Madera dura tropical — confirmar siempre la documentación de cadena de custodia FSC.',
    ],
    bestFor: [
      'Cajas de cocina y comedor — paneras, saleros, cuberteros',
      'Sets de charcutería y servicio premium',
      'Cajas de amenidades y turn-down de hotelería',
      'Cajas regalo de carácter para café, té y alimentación gourmet',
    ],
    care: 'Limpiar con paño húmedo y secar de inmediato. Reaceitar con aceite mineral o cera de abeja mensualmente para piezas de cocina de uso diario.',
    price: 3,
    productSlug: 'acacia',
    productCount: '12+',
  },
  {
    slug: 'walnut',
    name: 'Nogal',
    nickname: 'El Estándar de Lujo',
    tagline: 'Cuando la caja misma es el regalo.',
    hero: '/walnut-wooden-box/set-7/set-7-01.webp',
    gallery: [
      '/walnut-wooden-box/set-2/set-2-01.webp',
      '/walnut-wooden-box/set-3/set-3-01.webp',
      '/walnut-wooden-box/set-6/set-6-01.webp',
    ],
    swatch: 'linear-gradient(135deg, #5C3A24, #2A1B12)',
    origin:
      'Nogal negro americano del este y centro de Estados Unidos — el estándar de oro de la ebanistería fina y la madera de lujo por defecto para relojes, joyería y regalos ejecutivos en todo el mundo.',
    character:
      'Marrón chocolate profundo de forma natural — no requiere tinte. Veta fina y recta, figura ocasional, se lija hasta una superficie sedosa similar al cristal que culmina con un brillo discreto.',
    properties: [
      { label: 'Densidad', value: '~640 kg/m³' },
      { label: 'Dureza Janka', value: '~1010' },
      { label: 'Color', value: 'Chocolate intenso' },
      { label: 'Veta', value: 'Fina, recta' },
      { label: 'Estabilidad', value: 'Excelente' },
      { label: 'Sostenibilidad', value: '★★★★ (FSC US)' },
    ],
    strengths: [
      'La referencia de las maderas duras de lujo — instantáneamente reconocible, instantáneamente premium.',
      'Color naturalmente rico — sin tintes, sin barnices de igualación, sin sangrado.',
      'Se lija hasta una superficie cristalina que recibe aceite, cera y laca espléndidamente.',
      'Excelente estabilidad dimensional — la madera adecuada para encajes de herrajes con tolerancias estrechas.',
    ],
    consider: [
      '4–6× el precio del pino — resérvalo para productos donde la caja forma parte del unboxing.',
      'El color puede atenuarse muy ligeramente con años de exposición UV — una característica, no un defecto.',
    ],
    bestFor: [
      'Cajas de presentación para uno o varios relojes',
      'Cofres de joyería fina y cajas para anillos de compromiso',
      'Sets de escritorio ejecutivos y regalos corporativos',
      'Embalaje de edición limitada para vino, whisky y puros',
    ],
    care: 'Limpiar el polvo con un paño suave. Reaceitar 1–2 veces al año. Evitar la luz solar directa prolongada para preservar el tono chocolate intenso.',
    price: 4,
    productSlug: 'walnut',
    productCount: '18+',
  },
];

export const FINISHES = [
  {
    name: 'Crudo / Sin Acabado',
    swatch: '#E5D2B2',
    desc: 'Sin recubrimiento alguno. La madera se lija y se envía natural — lista para que el cliente final pinte, tinte o decoupage por sí mismo.',
    bestFor: 'Kits DIY, blanks de tienda, piezas con acabado personalizado.',
    durability: 'Baja',
  },
  {
    name: 'Lijado Suave',
    swatch: '#D9C29A',
    desc: 'Múltiples granulaciones progresivas hasta 240–400. Sin recubrimiento, pero con superficie sedosa al tacto que ya parece acabada.',
    bestFor: 'Presentación minimalista moderna, embalaje de productos infantiles.',
    durability: 'Baja',
  },
  {
    name: 'Aceitado (Lino / Tung)',
    swatch: '#C09866',
    desc: 'Aceite natural penetrante — sin película superficial. Realza la veta, opciones food-safe disponibles, envejece con un brillo suave. Reaceitar cada 6–12 meses.',
    bestFor: 'Menaje de cocina, cajas de charcutería, presentación premium en madera dura.',
    durability: 'Media',
  },
  {
    name: 'Pulido con Cera de Abeja',
    swatch: '#D2A973',
    desc: 'Cera de abeja suave pulida hasta un brillo bajo. Food-safe y cálida al tacto. Menos duradera que el aceite, pero más auténtica para piezas de herencia.',
    bestFor: 'Cajas regalo de herencia, menaje de contacto directo con alimentos.',
    durability: 'Media',
  },
  {
    name: 'Lacado',
    swatch: '#9C7349',
    desc: 'Laca PU o NC en mate / satinado / piano-gloss. Forma una película protectora, iguala el color y aporta brillo uniforme en todos los paneles.',
    bestFor: 'Cajas de relojes y joyería, embalaje de retail de alta gama.',
    durability: 'Alta',
  },
  {
    name: 'Pintado',
    swatch: '#3D2A1F',
    desc: 'Pintura de pigmento sólido — emparejamiento Pantone completo. Oculta la veta totalmente. Aplicado a mano en cabinas con control de polvo para evitar piel de naranja.',
    bestFor: 'Embalaje en color de marca, cajas regalo minimalistas modernas.',
    durability: 'Alta',
  },
  {
    name: 'Tintado',
    swatch: '#6B4A33',
    desc: 'Tinte coloreado (roble claro, nogal, ébano, colores a medida) que deja ver la veta, sellado luego con laca transparente o capa final de aceite.',
    bestFor: 'Look de nogal a menor coste sobre cuerpos de paulownia o pino.',
    durability: 'Alta',
  },
  {
    name: 'Quemado / Shou Sugi Ban',
    swatch: '#2A1B12',
    desc: 'Superficie carbonizada con llama y luego cepillada. La capa carbonizada protege contra la pudrición y los insectos, con una textura de veta negra dramática.',
    bestFor: 'Cajones de vino rústicos, embalaje regalo de impacto, cajas de jardín.',
    durability: 'Alta',
  },
];

export const BRANDING = [
  {
    name: 'Grabado Láser',
    icon: '✦',
    desc: 'El láser CO₂ quema la ilustración en la madera. Funciona en todas las especies, escala de prototipo a producción, mantiene detalle hasta 0,3 mm. Nuestra opción por defecto para logos.',
    bestOn: 'Todas las especies — más limpio en paulownia, nogal y bambú.',
    leadTime: 'Sin utillaje, configuración el mismo día.',
  },
  {
    name: 'Estampado Hot Foil',
    icon: '✦',
    desc: 'Un troquel de latón calentado presiona lámina metálica (oro, oro rosa, plata, cobre, Pantone a medida) en la superficie. Acabado táctil premium.',
    bestOn: 'Nogal, paneles lacados, superficies pintadas.',
    leadTime: 'Troquel a medida (5–7 días).',
  },
  {
    name: 'Debossing',
    icon: '✦',
    desc: 'Un troquel calentado presiona el logo en la madera sin tinta ni lámina — pura impresión hundida. Sutil, sofisticado, envejece con la caja.',
    bestOn: 'Maderas blandas — paulownia y pino aceptan las impresiones más profundas.',
    leadTime: 'Troquel a medida (5–7 días).',
  },
  {
    name: 'Pirograbado (Wood Burning)',
    icon: '✦',
    desc: 'Una punta de hierro caliente quema la ilustración. Estética vintage hecha a mano. El leve halo de quemadura y la variación de profundidad forman parte del aspecto.',
    bestOn: 'Pino, paulownia — donde encaje una historia rústica.',
    leadTime: 'Sin utillaje, configuración el mismo día.',
  },
  {
    name: 'Impresión UV',
    icon: '✦',
    desc: 'Impresión directa CMYK a todo color curada por luz UV. Detalle fotográfico, degradados, ilustración multicolor — todo sobre madera natural.',
    bestOn: 'Todas las especies, especialmente paulownia y paneles lacados.',
    leadTime: 'Sin utillaje, solo archivos digitales.',
  },
  {
    name: 'Serigrafía',
    icon: '✦',
    desc: 'Color directo a través de pantalla de seda — plano, brillante, repetible. El método más económico para logos monocromos de gran volumen.',
    bestOn: 'Superficies lacadas, pintadas o lijadas suaves.',
    leadTime: 'Pantalla a medida (3–5 días).',
  },
  {
    name: 'Incrustación',
    icon: '✦',
    desc: 'Madera contrastante, latón o nácar embutidos a ras en una cavidad fresada por CNC. El nivel de lujo del branding.',
    bestOn: 'Nogal, acacia — donde se busque sensación de artesanía premium.',
    leadTime: 'Por proyecto (10–14 días).',
  },
];

export const HARDWARE = [
  {
    name: 'Bisagras de Superficie',
    desc: 'Bisagras visibles de latón o acero montadas en el exterior trasero. Clásicas, vintage, fáciles de reparar.',
    finishes: 'Latón · latón antiguo · cromo · negro mate',
    use: 'Cajones de vino, cajas regalo rústicas, baúles de herramientas',
  },
  {
    name: 'Bisagras Ocultas',
    desc: 'Bisagras estilo europeo escondidas dentro de la pared — el exterior queda completamente limpio. Cierre suave opcional.',
    finishes: 'Níquel · negro mate (interior)',
    use: 'Regalo premium, relojería y joyería, cajas con look magnético',
  },
  {
    name: 'Bisagras Piano',
    desc: 'Bisagra continua a lo largo — la opción más resistente, distribución uniforme de carga, válida para tapas muy largas.',
    finishes: 'Latón · acero · inoxidable',
    use: 'Cofres de documentos, cajas de almacenamiento grandes, cajas fuertes',
  },
  {
    name: 'Imanes Ocultos',
    desc: 'Imanes de neodimio embutidos en la pared. La tapa se cierra con un chasquido calibrado y satisfactorio. Cero herrajes visibles.',
    finishes: 'Opciones de fuerza N35–N52',
    use: 'Unboxing premium retail, cajas de suscripción, embalaje cosmético',
  },
  {
    name: 'Cerraduras de Latón con Llave',
    desc: 'Cerradura de latón de superficie con llave. Aspecto clásico, señal inequívoca de seguridad.',
    finishes: 'Pulido · latón antiguo',
    use: 'Cajas fuertes, cofres de documentos, piezas con look de herencia',
  },
  {
    name: 'Cerraduras de Combinación',
    desc: 'Mecanismo de dial de 3 dígitos — sin llaves que perder ni copiar. La opción de cierre más limpia para viaje y espacios compartidos.',
    finishes: 'Acero cepillado · negro mate',
    use: 'Humidores de viaje, cajas de oficina compartida, cajas de medicamentos',
  },
];

export const COPY = {
  meta: {
    title: 'Guía de Materiales — Referencia de Madera, Acabado y Herrajes | CHIC',
    description:
      'Guía educativa completa de especies de madera, acabados, métodos de branding y herrajes utilizados en cajas de madera personalizadas. Compara paulownia, pino, bambú, acacia y nogal y salta a los productos correspondientes.',
    ogDescription:
      'Guía educativa de especies de madera, acabados, métodos de branding y herrajes en cajas de madera personalizadas.',
  },
  hero: {
    eyebrow: 'La Biblioteca del Conocimiento',
    title: 'La Guía Completa de',
    titleEm: 'Madera, Acabado y Herrajes',
    sub: 'Elegir la caja de madera adecuada empieza por elegir el material adecuado. Esta guía recorre las cinco especies de madera con las que trabajamos cada día, ocho acabados de superficie, siete métodos de branding y cada bisagra, cerradura e imán que instalamos — para que decidas con confianza antes de la primera muestra.',
    tocLabels: {
      compare: 'Comparar Maderas',
      finishes: 'Acabados',
      branding: 'Branding',
      hardware: 'Herrajes',
      eco: 'Sostenibilidad',
    },
  },
  compare: {
    label: 'De un Vistazo',
    title: 'Cinco maderas, una al',
    titleEm: 'lado',
    lede: 'Comparativa rápida de las cinco maderas que representan más del 95% de nuestra producción anual. Úsala como atajo — luego lee el perfil completo de la especie que encaje en tu brief.',
    th: {
      wood: 'Madera',
      density: 'Densidad',
      hardness: 'Dureza (Janka)',
      color: 'Color',
      bestFor: 'Mejor para',
      price: 'Precio',
    },
  },
  wood: {
    eyebrowSpecies: 'Especie de Madera',
    eyebrowNumPrefix: 'N.º',
    listWhy: 'Por qué la eligen los compradores',
    listConsider: 'Aspectos a considerar',
    listBest: 'Mejor para',
    careLabel: 'Cuidado y mantenimiento.',
    originLabel: 'Origen e historia.',
    characterLabel: 'Carácter visual.',
    cta: 'Ver Cajas de {name}',
    ctaCount: '{count} productos',
  },
  finishes: {
    label: 'Tratamiento de Superficie',
    title: 'Ocho acabados, del crudo al',
    titleEm: 'piano-gloss',
    lede: 'El acabado es lo que tu cliente realmente toca. Un mismo cuerpo de paulownia puede leerse como un kit de manualidades rústico, una caja minimalista moderna o un envase de lujo piano-gloss — todo depende del acabado sobre la madera.',
    bestForLabel: 'Mejor para:',
    durabilityLabel: 'Durabilidad:',
  },
  branding: {
    label: 'Logo y Arte',
    title: 'Siete formas de poner tu',
    titleEm: 'marca',
    titleSuffix: 'sobre madera',
    lede: 'La madera y el acabado preparan el escenario — tu branding cierra el trato. Aquí tienes una comparación clara de cada método que ofrecemos en casa, con las especies y superficies en las que cada uno luce mejor.',
    bestOnLabel: 'Mejor sobre',
    leadTimeLabel: 'Plazo',
  },
  hardware: {
    label: 'Bisagras, Cerraduras e Imanes',
    title: 'Herrajes',
    titleEm: 'que duran',
    lede: 'Tenemos en stock bisagras europeas ocultas, bisagras de superficie en latón, imanes de neodimio y cerraduras de latón y de combinación. Combina y combina — cada caja se especifica hasta el acabado del herraje.',
    finishesLabel: 'Acabados',
    useLabel: 'Uso típico',
  },
  eco: {
    label: 'Sostenibilidad',
    title: 'La madera es renovable —',
    titleEm: 'cuando se obtiene bien',
    p1html:
      'Cada envío que hacemos parte de madera <strong>certificada FSC en cadena de custodia</strong>, con documentación auditable desde el bosque hasta la planta. Trabajamos con plantaciones de paulownia y bambú en China, plantaciones de acacia gestionadas FSC en Vietnam e Indonesia, pino FSC de bosques europeos y nogal negro de origen estadounidense.',
    p2html:
      'Nuestros acabados también importan — lacas al agua y aceites food-safe son el estándar para menaje y embalaje alimentario, y nuestros recubrimientos cumplen con <strong>EU REACH</strong> y <strong>US CARB Phase 2</strong> bajo solicitud.',
    p3html:
      'Cuando la sostenibilidad es un pilar de marca, elige <strong>bambú</strong> (rebrota en 5–7 años) o <strong>paulownia</strong> (también 5–7 años, además del menor flete por peso de cualquier madera). Para maderas duras premium, pídenos el certificado FSC antes de la aprobación — lo emitimos de serie.',
    pts: [
      {
        h: 'Cadena de custodia FSC certificada',
        p: 'Trazabilidad auditable desde el bosque hasta la paleta de fábrica — emitida bajo solicitud, en cada envío.',
      },
      {
        h: 'Especies renovables primero',
        p: 'Paulownia y bambú rebrotan en 5–7 años — la madera más eficiente en huella de carbono que ofrecemos.',
      },
      {
        h: 'Acabados de bajo COV disponibles',
        p: 'Lacas al agua, aceites food-safe y cera de abeja — conformes a REACH y CARB P2 bajo solicitud.',
      },
      {
        h: 'Certificados fitosanitarios',
        p: 'Emitidos para cada envío de madera maciza — despacho de aduanas limpio en todos los mercados principales.',
      },
    ],
  },
  cta: {
    label: '¿Aún Decidiendo?',
    title: 'Cuéntanos qué estás creando.',
    titleBr: 'Te',
    titleEm: 'emparejamos la madera',
    sub: 'Envía un boceto, un tablero de Pinterest o una muestra de la competencia — nuestro equipo elige la combinación correcta de especie, acabado, branding y herraje, y la cotiza en menos de 24 horas.',
    btnPrimary: 'Solicitar Presupuesto',
    btnSecondary: 'Ver Catálogo',
  },
};
