// Per-product page enrichment — multi-locale (en, de, it, es, fr, pt, ja, ko).
//
// Generates (a) a rich multi-paragraph "About this box" description and
// (b) a per-product FAQ set, derived entirely from the product's own data
// (specs, customization, useCases, packaging). Generated content differs
// genuinely across the catalogue because the source fields differ.
//
// Locale handling:
//   - English (en) is the source of truth and always supported.
//   - Non-English locales render IFF (a) a locale template exists here AND
//     (b) the product has full overlay translations (intro + customization
//     + useCases + packaging). Partial translations skip the block to
//     avoid mixed-language pages.

function pickSpecs(product) {
  const s = product.specs || {};
  return {
    moq: s.MOQ || '300 pieces',
    lead: s['Lead Time'] || '30–40 days',
    material: s.Material || 'solid wood',
    finish: s['Surface Finish'] || 'natural oil or matte lacquer',
    hardware: s.Hardware || 'standard hardware',
    lining: s['Interior Lining'] || 'optional foam or velvet lining',
    branding: s.Branding || 'logo print, hot foil, laser engraving and deboss',
  };
}

const EN = {
  labels: {
    richEyebrow: 'Detailed overview',
    richTitle: (name) => `About the ${name}`,
    faqEyebrow: 'Buyer questions',
    faqTitle: (name) => `${name} — buyer questions`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `What is the minimum order quantity (MOQ) for the ${name}?`, a: `The standard MOQ for the ${name} is ${s.moq}. Lower quantities may be possible for simpler designs; larger or more complex customisations can require a higher minimum. Share your design and target volume and we will confirm the exact MOQ for your project.` },
      { q: `How long is the production lead time for the ${name}?`, a: `Production of the ${name} typically takes about ${s.lead} after you approve the pre-production sample, depending on quantity, finish and decoration. Sample-making adds time up front; for tight launches, tell us your deadline and we will confirm feasibility before the order is placed.` },
      { q: `What is the ${name} made from?`, a: `The ${name} is constructed from ${s.material}, finished in ${s.finish} and fitted with ${s.hardware}. The interior uses ${s.lining} so the product inside is protected and presented to spec.` },
      { q: `Can the ${name} be branded with our logo and artwork?`, a: `Yes — branding options for the ${name} include ${s.branding}.${customization.length ? ` Additional customisation covers: ${customization.slice(0, 4).join('; ')}.` : ''} Send vector artwork (AI, EPS, PDF or SVG) for the cleanest result; we will confirm placement and method on the pre-production sample.` },
    ];
    if (useCases.length) faqs.push({ q: `What is the ${name} typically used for?`, a: `The ${name} is well suited to: ${useCases.join(', ')}. If your application is outside this list, we can usually adapt the spec — describe your product and use case and we will advise.` });
    if (packaging) faqs.push({ q: `How is the ${name} packaged for export shipping?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'custom').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : 'B2B gift and packaging applications';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `The ${name} is a ${closureWord}-closure custom wooden box engineered for ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — alternate view` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Built from ${s.material}`);
    if (s.finish) c.push(`finished in ${s.finish}`);
    if (s.hardware) c.push(`paired with ${s.hardware}`);
    if (s.lining) c.push(`and an interior of ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Each production run starts at our standard minimum of ${s.moq} with a typical lead time of ${s.lead} after pre-production sample approval.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`Customisation covers ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`branding via ${s.branding}`);
      let p3 = parts.length ? parts.join('; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' and ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Whether you need the ${name.toLowerCase()} for ${useExamples}, send us a brief and we will quote a precise spec.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const DE = {
  labels: {
    richEyebrow: 'Detaillierte Übersicht',
    richTitle: (name) => `Über ${name}`,
    faqEyebrow: 'Häufige Käuferfragen',
    faqTitle: (name) => `${name} — häufige Fragen`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `Wie hoch ist die Mindestbestellmenge (MOQ) für ${name}?`, a: `Die Standard-MOQ für ${name} beträgt ${s.moq}. Bei einfacheren Designs sind kleinere Mengen möglich; größere oder komplexere Anpassungen können eine höhere Mindestmenge erfordern. Teilen Sie uns Ihr Design und Ihre Zielmenge mit, und wir bestätigen die genaue MOQ für Ihr Projekt.` },
      { q: `Wie lang ist die Produktionszeit für ${name}?`, a: `Die Produktion von ${name} dauert in der Regel etwa ${s.lead} nach Ihrer Freigabe des Vorserienmusters, abhängig von Menge, Finish und Dekoration. Die Bemusterung kommt vorab hinzu; bei zeitkritischen Launches teilen Sie uns Ihren Termin mit, und wir bestätigen die Machbarkeit vor der Bestellung.` },
      { q: `Woraus wird ${name} gefertigt?`, a: `${name} besteht aus ${s.material}, ist in ${s.finish} ausgeführt und mit ${s.hardware} ausgestattet. Der Innenraum ist mit ${s.lining} versehen, sodass das eingelegte Produkt geschützt und stilgerecht präsentiert wird.` },
      { q: `Kann ${name} mit unserem Logo und Design gebrandet werden?`, a: `Ja — die Branding-Optionen für ${name} umfassen ${s.branding}.${customization.length ? ` Weitere Anpassungen: ${customization.slice(0, 4).join('; ')}.` : ''} Senden Sie Vektorgrafiken (AI, EPS, PDF oder SVG) für die beste Reproduktion; Platzierung und Methode bestätigen wir am Vorserienmuster.` },
    ];
    if (useCases.length) faqs.push({ q: `Wofür wird ${name} typischerweise verwendet?`, a: `${name} eignet sich gut für: ${useCases.join(', ')}. Liegt Ihre Anwendung außerhalb dieser Liste, können wir die Spezifikation in der Regel anpassen — beschreiben Sie Ihr Produkt und den Anwendungsfall, und wir beraten Sie.` });
    if (packaging) faqs.push({ q: `Wie wird ${name} für den Export verpackt?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'individuell').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : 'B2B-Geschenk- und Verpackungsanwendungen';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name} ist eine maßgefertigte Holzbox mit ${closureWord}-Verschluss, konzipiert für ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — Detailansicht` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Gefertigt aus ${s.material}`);
    if (s.finish) c.push(`ausgeführt in ${s.finish}`);
    if (s.hardware) c.push(`kombiniert mit ${s.hardware}`);
    if (s.lining) c.push(`und einem Innenraum aus ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Jede Produktion startet bei unserer Standard-Mindestmenge von ${s.moq} mit einer typischen Lieferzeit von ${s.lead} nach Freigabe des Vorserienmusters.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`Die Anpassung umfasst ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`Branding via ${s.branding}`);
      let p3 = parts.length ? parts.join('; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' und ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Ob Sie ${name} für ${useExamples} benötigen — schicken Sie uns ein Briefing, und wir kalkulieren eine präzise Spezifikation.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const IT = {
  labels: {
    richEyebrow: 'Panoramica dettagliata',
    richTitle: (name) => `Informazioni su ${name}`,
    faqEyebrow: 'Domande frequenti degli acquirenti',
    faqTitle: (name) => `${name} — domande frequenti`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `Qual è la quantità minima d'ordine (MOQ) per ${name}?`, a: `La MOQ standard per ${name} è di ${s.moq}. Per design più semplici sono possibili quantità inferiori; personalizzazioni più ampie o complesse possono richiedere un minimo più alto. Inviaci il tuo design e il volume target e confermeremo la MOQ esatta per il tuo progetto.` },
      { q: `Quanto dura il tempo di produzione per ${name}?`, a: `La produzione di ${name} richiede in genere circa ${s.lead} dopo l'approvazione del campione di preproduzione, in base a quantità, finitura e decorazione. La campionatura aggiunge tempo a monte; per lanci con scadenze strette, indicaci la data e confermeremo la fattibilità prima dell'ordine.` },
      { q: `Di cosa è fatto ${name}?`, a: `${name} è costruito in ${s.material}, rifinito in ${s.finish} e dotato di ${s.hardware}. L'interno è realizzato con ${s.lining}, così il prodotto contenuto è protetto e presentato secondo specifica.` },
      { q: `${name} può essere personalizzato con il nostro logo e grafica?`, a: `Sì — le opzioni di branding per ${name} includono ${s.branding}.${customization.length ? ` Personalizzazioni aggiuntive: ${customization.slice(0, 4).join('; ')}.` : ''} Invia file vettoriali (AI, EPS, PDF o SVG) per il miglior risultato; posizionamento e metodo vengono confermati sul campione di preproduzione.` },
    ];
    if (useCases.length) faqs.push({ q: `A cosa serve tipicamente ${name}?`, a: `${name} è adatto a: ${useCases.join(', ')}. Se la tua applicazione è al di fuori di questo elenco, possiamo solitamente adattare le specifiche — descrivici il prodotto e il caso d'uso e ti consiglieremo.` });
    if (packaging) faqs.push({ q: `Come viene imballato ${name} per la spedizione export?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'su misura').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : 'applicazioni B2B di packaging e regalo';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name} è una scatola in legno su misura con chiusura ${closureWord}, progettata per ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — vista dettagliata` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Costruita in ${s.material}`);
    if (s.finish) c.push(`rifinita in ${s.finish}`);
    if (s.hardware) c.push(`abbinata a ${s.hardware}`);
    if (s.lining) c.push(`e un interno in ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Ogni produzione parte dalla nostra MOQ standard di ${s.moq} con un tempo di consegna tipico di ${s.lead} dopo l'approvazione del campione di preproduzione.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`La personalizzazione copre ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`branding tramite ${s.branding}`);
      let p3 = parts.length ? parts.join('; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' e ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Sia che ti serva ${name} per ${useExamples}, inviaci un brief e ti quoteremo specifiche precise.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const ES = {
  labels: {
    richEyebrow: 'Resumen detallado',
    richTitle: (name) => `Acerca de ${name}`,
    faqEyebrow: 'Preguntas frecuentes de compradores',
    faqTitle: (name) => `${name} — preguntas frecuentes`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `¿Cuál es la cantidad mínima de pedido (MOQ) para ${name}?`, a: `La MOQ estándar para ${name} es de ${s.moq}. Para diseños más sencillos son posibles cantidades menores; personalizaciones más amplias o complejas pueden requerir un mínimo más alto. Envíanos tu diseño y el volumen objetivo y confirmaremos la MOQ exacta para tu proyecto.` },
      { q: `¿Cuánto dura el tiempo de producción para ${name}?`, a: `La producción de ${name} suele tardar unos ${s.lead} tras la aprobación del muestreo de preproducción, según cantidad, acabado y decoración. El muestreo añade tiempo previo; para lanzamientos con plazos ajustados, indícanos la fecha y confirmaremos la viabilidad antes del pedido.` },
      { q: `¿De qué está hecho ${name}?`, a: `${name} está construido en ${s.material}, acabado en ${s.finish} y equipado con ${s.hardware}. El interior usa ${s.lining}, así el producto contenido queda protegido y presentado según especificación.` },
      { q: `¿Se puede personalizar ${name} con nuestro logo y diseño?`, a: `Sí — las opciones de branding para ${name} incluyen ${s.branding}.${customization.length ? ` Personalizaciones adicionales: ${customization.slice(0, 4).join('; ')}.` : ''} Envía archivos vectoriales (AI, EPS, PDF o SVG) para el mejor resultado; la colocación y el método se confirman en el muestreo de preproducción.` },
    ];
    if (useCases.length) faqs.push({ q: `¿Para qué se usa típicamente ${name}?`, a: `${name} es adecuado para: ${useCases.join(', ')}. Si tu aplicación queda fuera de este listado, normalmente podemos adaptar las especificaciones — descríbenos el producto y el caso de uso y te asesoraremos.` });
    if (packaging) faqs.push({ q: `¿Cómo se embala ${name} para la exportación?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'a medida').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : 'aplicaciones B2B de regalo y embalaje';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name} es una caja de madera personalizada con cierre ${closureWord}, diseñada para ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — vista alternativa` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Construida en ${s.material}`);
    if (s.finish) c.push(`acabada en ${s.finish}`);
    if (s.hardware) c.push(`equipada con ${s.hardware}`);
    if (s.lining) c.push(`y un interior de ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Cada producción parte de nuestra MOQ estándar de ${s.moq} con un tiempo de entrega típico de ${s.lead} tras la aprobación del muestreo de preproducción.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`La personalización cubre ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`branding mediante ${s.branding}`);
      let p3 = parts.length ? parts.join('; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' y ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Ya sea que necesites ${name} para ${useExamples}, envíanos un brief y cotizaremos especificaciones precisas.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const FR = {
  labels: {
    richEyebrow: 'Aperçu détaillé',
    richTitle: (name) => `À propos de ${name}`,
    faqEyebrow: 'Questions fréquentes des acheteurs',
    faqTitle: (name) => `${name} — questions fréquentes`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `Quelle est la quantité minimale de commande (MOQ) pour ${name} ?`, a: `La MOQ standard pour ${name} est de ${s.moq}. Des quantités inférieures sont possibles pour des designs plus simples ; des personnalisations plus larges ou complexes peuvent nécessiter un minimum plus élevé. Envoyez-nous votre design et le volume visé et nous confirmerons la MOQ exacte pour votre projet.` },
      { q: `Quel est le délai de production pour ${name} ?`, a: `La production de ${name} prend généralement environ ${s.lead} après votre validation de l'échantillon de préproduction, selon la quantité, la finition et la décoration. L'échantillonnage ajoute du temps en amont ; pour des lancements à délai serré, indiquez-nous la date et nous confirmerons la faisabilité avant la commande.` },
      { q: `En quoi est fabriqué ${name} ?`, a: `${name} est construit en ${s.material}, fini en ${s.finish} et équipé de ${s.hardware}. L'intérieur utilise ${s.lining} afin que le produit à l'intérieur soit protégé et présenté selon les spécifications.` },
      { q: `${name} peut-il être personnalisé avec notre logo et notre design ?`, a: `Oui — les options de branding pour ${name} incluent ${s.branding}.${customization.length ? ` Personnalisations supplémentaires : ${customization.slice(0, 4).join(' ; ')}.` : ''} Envoyez des fichiers vectoriels (AI, EPS, PDF ou SVG) pour le meilleur résultat ; l'emplacement et la méthode sont confirmés sur l'échantillon de préproduction.` },
    ];
    if (useCases.length) faqs.push({ q: `À quoi sert habituellement ${name} ?`, a: `${name} convient à : ${useCases.join(', ')}. Si votre application est en dehors de cette liste, nous pouvons généralement adapter les spécifications — décrivez votre produit et votre cas d'usage et nous vous conseillerons.` });
    if (packaging) faqs.push({ q: `Comment ${name} est-il emballé pour l'export ?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'sur mesure').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : "applications B2B de cadeau et d'emballage";
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name} est une boîte en bois sur mesure avec fermeture ${closureWord}, conçue pour ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — vue détaillée` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Construite en ${s.material}`);
    if (s.finish) c.push(`finie en ${s.finish}`);
    if (s.hardware) c.push(`associée à ${s.hardware}`);
    if (s.lining) c.push(`et un intérieur en ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Chaque production démarre à notre minimum standard de ${s.moq} avec un délai de livraison typique de ${s.lead} après validation de l'échantillon de préproduction.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`La personnalisation couvre ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`branding via ${s.branding}`);
      let p3 = parts.length ? parts.join(' ; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' et ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Que vous ayez besoin de ${name} pour ${useExamples}, envoyez-nous un brief et nous chiffrerons des spécifications précises.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const PT = {
  labels: {
    richEyebrow: 'Visão geral detalhada',
    richTitle: (name) => `Sobre ${name}`,
    faqEyebrow: 'Perguntas frequentes dos compradores',
    faqTitle: (name) => `${name} — perguntas frequentes`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `Qual é a quantidade mínima de encomenda (MOQ) para ${name}?`, a: `A MOQ padrão para ${name} é de ${s.moq}. Para designs mais simples são possíveis quantidades menores; personalizações maiores ou mais complexas podem exigir um mínimo mais alto. Envie-nos o seu design e o volume pretendido e confirmaremos a MOQ exata para o seu projeto.` },
      { q: `Qual é o prazo de produção para ${name}?`, a: `A produção de ${name} demora normalmente cerca de ${s.lead} após a aprovação da amostra de pré-produção, conforme quantidade, acabamento e decoração. A amostragem acrescenta tempo a montante; para lançamentos com prazos apertados, indique-nos a data e confirmaremos a viabilidade antes da encomenda.` },
      { q: `De que é feito ${name}?`, a: `${name} é construído em ${s.material}, acabado em ${s.finish} e equipado com ${s.hardware}. O interior usa ${s.lining}, de modo que o produto contido fica protegido e apresentado conforme a especificação.` },
      { q: `${name} pode ser personalizado com o nosso logótipo e arte?`, a: `Sim — as opções de branding para ${name} incluem ${s.branding}.${customization.length ? ` Personalizações adicionais: ${customization.slice(0, 4).join('; ')}.` : ''} Envie ficheiros vetoriais (AI, EPS, PDF ou SVG) para o melhor resultado; o posicionamento e o método são confirmados na amostra de pré-produção.` },
    ];
    if (useCases.length) faqs.push({ q: `Para que serve normalmente ${name}?`, a: `${name} é adequado a: ${useCases.join(', ')}. Se a sua aplicação estiver fora desta lista, normalmente conseguimos adaptar as especificações — descreva o produto e o caso de uso e iremos aconselhar.` });
    if (packaging) faqs.push({ q: `Como é ${name} embalado para a exportação?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = (closure || 'à medida').toLowerCase();
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ').toLowerCase() : 'aplicações B2B de presente e embalagem';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name} é uma caixa de madeira à medida com fecho ${closureWord}, concebida para ${primaryUses}.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — vista detalhada` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`Construída em ${s.material}`);
    if (s.finish) c.push(`acabada em ${s.finish}`);
    if (s.hardware) c.push(`combinada com ${s.hardware}`);
    if (s.lining) c.push(`e um interior em ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `Cada produção começa na nossa MOQ padrão de ${s.moq} com um prazo de entrega típico de ${s.lead} após a aprovação da amostra de pré-produção.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`A personalização cobre ${customization.slice(0, 3).join(', ').toLowerCase()}`);
      if (s.branding) parts.push(`branding via ${s.branding}`);
      let p3 = parts.length ? parts.join('; ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' e ').toLowerCase();
        p3 += (p3 ? ' ' : '') + ` Quer precise de ${name} para ${useExamples}, envie-nos um briefing e cotaremos especificações precisas.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const JA = {
  labels: {
    richEyebrow: '詳細概要',
    richTitle: (name) => `${name}について`,
    faqEyebrow: '購入前によくあるご質問',
    faqTitle: (name) => `${name} — よくあるご質問`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `${name}の最小発注数量（MOQ）はどのくらいですか？`, a: `${name}の標準MOQは${s.moq}です。シンプルなデザインの場合は少量でも対応できることがあります。大規模または複雑なカスタマイズでは最低数量が高くなる場合があります。デザインと目標数量をお知らせいただければ、お客様のプロジェクトに合わせた正確なMOQをご案内いたします。` },
      { q: `${name}の生産納期はどれくらいですか？`, a: `${name}の生産は、量産前サンプルのご承認後、数量・仕上げ・装飾に応じておおむね${s.lead}を要します。サンプル製作はその前に別途お時間をいただきます。期日の厳しい発売の場合は、ご希望の納期をお知らせいただければ、ご注文前に実現可能性を確認いたします。` },
      { q: `${name}は何で作られていますか？`, a: `${name}は${s.material}で作られ、${s.finish}で仕上げられ、${s.hardware}を備えています。内部は${s.lining}を使用しており、収納する製品を保護し、仕様どおりに見せます。` },
      { q: `${name}に自社ロゴやデザインを入れることはできますか？`, a: `はい — ${name}のブランディング・オプションには${s.branding}が含まれます。${customization.length ? ` 追加のカスタマイズ: ${customization.slice(0, 4).join('、')}。` : ''} ベクターデータ（AI、EPS、PDF、SVG）をお送りいただければ最も美しい仕上がりになります。配置と手法は量産前サンプルで確定いたします。` },
    ];
    if (useCases.length) faqs.push({ q: `${name}は通常どのような用途に使われますか？`, a: `${name}は次の用途に適しています: ${useCases.join('、')}。リストにない用途でも、通常は仕様を調整できますので、製品と使用シーンをお知らせいただければご提案いたします。` });
    if (packaging) faqs.push({ q: `${name}は輸出向けにどのように梱包されますか？`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = closure || 'オーダーメイド';
    const primaryUses = useCases.length ? useCases.slice(0, 3).join('、') : 'B2Bギフト・包装用途';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name}は、${primaryUses}向けに設計された${closureWord}タイプのカスタム木箱です。`;
    if (intro) p1 += intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — 別アングル` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`${s.material}を使用`);
    if (s.finish) c.push(`${s.finish}で仕上げ`);
    if (s.hardware) c.push(`${s.hardware}を採用`);
    if (s.lining) c.push(`内部には${s.lining}`);
    let p2 = c.length ? c.join('、') + '。' : '';
    if (s.moq || s.lead) p2 += `標準MOQは${s.moq}、量産前サンプル承認後の標準納期は${s.lead}です。`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`カスタマイズには${customization.slice(0, 3).join('、')}などが含まれます`);
      if (s.branding) parts.push(`${s.branding}によるブランディングにも対応`);
      let p3 = parts.length ? parts.join('。') + '。' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join('・');
        p3 += `${useExamples}など、${name}のご用途をお知らせいただければ、的確な仕様でお見積もりいたします。`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const KO = {
  labels: {
    richEyebrow: '상세 개요',
    richTitle: (name) => `${name} 소개`,
    faqEyebrow: '구매자 자주 묻는 질문',
    faqTitle: (name) => `${name} — 자주 묻는 질문`,
  },
  buildFaqs(product) {
    const { name, customization = [], useCases = [], packaging } = product;
    const s = pickSpecs(product);
    const faqs = [
      { q: `${name}의 최소 주문 수량(MOQ)은 얼마인가요?`, a: `${name}의 표준 MOQ는 ${s.moq}입니다. 간단한 디자인의 경우 더 적은 수량이 가능할 수 있으며, 더 크거나 복잡한 맞춤화는 더 높은 최소 수량이 필요할 수 있습니다. 디자인과 목표 수량을 보내 주시면 프로젝트에 맞는 정확한 MOQ를 안내해 드립니다.` },
      { q: `${name}의 생산 납기는 얼마나 걸리나요?`, a: `${name}의 생산은 양산 전 샘플 승인 후 수량·마감·장식에 따라 약 ${s.lead} 정도 걸립니다. 샘플 제작은 그에 앞서 별도의 시간이 필요합니다. 일정이 촉박한 출시의 경우 마감일을 알려 주시면 주문 전에 가능 여부를 확인해 드립니다.` },
      { q: `${name}은 무엇으로 만들어졌나요?`, a: `${name}은 ${s.material}으로 제작되고, ${s.finish}로 마감되며, ${s.hardware}이 적용됩니다. 내부는 ${s.lining}으로 구성되어 있어 내용물이 안전하게 보호되고 사양대로 표현됩니다.` },
      { q: `${name}에 자사 로고와 디자인을 적용할 수 있나요?`, a: `네 — ${name}의 브랜딩 옵션에는 ${s.branding}이 포함됩니다.${customization.length ? ` 추가 맞춤화: ${customization.slice(0, 4).join('; ')}.` : ''} 벡터 파일(AI, EPS, PDF, SVG)을 보내 주시면 가장 깔끔한 결과를 얻을 수 있으며, 배치와 방법은 양산 전 샘플에서 확정합니다.` },
    ];
    if (useCases.length) faqs.push({ q: `${name}은 보통 어떤 용도로 사용되나요?`, a: `${name}은 다음에 적합합니다: ${useCases.join(', ')}. 목록 외 용도라도 일반적으로 사양 조정이 가능하므로, 제품과 사용 사례를 설명해 주시면 안내해 드립니다.` });
    if (packaging) faqs.push({ q: `${name}은 수출용으로 어떻게 포장되나요?`, a: packaging });
    return faqs;
  },
  buildRich(product) {
    const { name, intro, closure, customization = [], useCases = [], images = [] } = product;
    const closureWord = closure || '맞춤형';
    const primaryUses = useCases.length ? useCases.slice(0, 3).join(', ') : 'B2B 선물 및 포장 용도';
    const s = pickSpecs(product);
    const blocks = [];
    let p1 = `${name}은 ${primaryUses}을(를) 위해 설계된 ${closureWord} 방식의 맞춤 우드 박스입니다.`;
    if (intro) p1 += ' ' + intro;
    blocks.push({ type: 'paragraph', text: p1 });
    if (images.length > 1) blocks.push({ type: 'image', src: images[1], alt: `${name} — 다른 각도` });
    else if (images.length === 1) blocks.push({ type: 'image', src: images[0], alt: name });
    const c = [];
    if (s.material) c.push(`재질은 ${s.material}`);
    if (s.finish) c.push(`마감은 ${s.finish}`);
    if (s.hardware) c.push(`${s.hardware} 장착`);
    if (s.lining) c.push(`내부는 ${s.lining}`);
    let p2 = c.length ? c.join(', ') + '입니다.' : '';
    if (s.moq || s.lead) p2 += (p2 ? ' ' : '') + `표준 MOQ ${s.moq}부터 생산 가능하며, 양산 전 샘플 승인 후 표준 납기는 ${s.lead}입니다.`;
    if (p2) blocks.push({ type: 'paragraph', text: p2 });
    if (customization.length || s.branding || useCases.length) {
      const parts = [];
      if (customization.length) parts.push(`맞춤화는 ${customization.slice(0, 3).join(', ')} 등을 포함합니다`);
      if (s.branding) parts.push(`브랜딩은 ${s.branding}으로 가능합니다`);
      let p3 = parts.length ? parts.join('. ') + '.' : '';
      if (useCases.length) {
        const useExamples = useCases.slice(0, 2).join(' 및 ');
        p3 += (p3 ? ' ' : '') + `${useExamples} 등 ${name}이 필요하시면 요건을 보내 주십시오. 정확한 사양으로 견적해 드립니다.`;
      }
      if (p3) blocks.push({ type: 'paragraph', text: p3 });
    }
    return blocks;
  },
};

const LOCALES = { en: EN, de: DE, it: IT, es: ES, fr: FR, pt: PT, ja: JA, ko: KO };

export function isProductContentLocaleSupported(locale) {
  return Object.prototype.hasOwnProperty.call(LOCALES, locale);
}

export function getProductContentLabels(locale) {
  return (LOCALES[locale] || EN).labels;
}

export function buildProductFaqs(product, locale = 'en') {
  const mod = LOCALES[locale];
  if (!mod || !product || !product.name) return [];
  return mod.buildFaqs(product);
}

export function buildRichDescription(product, locale = 'en') {
  const mod = LOCALES[locale];
  if (!mod || !product || !product.name) return [];
  return mod.buildRich(product);
}

export function hasFullProductTranslation(rawTranslation, locale) {
  if (locale === 'en') return true;
  if (!rawTranslation) return false;
  return Boolean(
    rawTranslation.intro &&
      rawTranslation.customization &&
      rawTranslation.useCases &&
      rawTranslation.packaging,
  );
}
