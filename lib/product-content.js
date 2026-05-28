// Per-product page enrichment — multi-locale.
//
// Generates (a) a rich multi-paragraph "About this box" description and
// (b) a per-product FAQ set, derived ENTIRELY from the product's own data
// (specs, customization, useCases, packaging). Because the source fields
// differ between products, generated content is genuinely different across
// the catalogue — different MOQ, different material, different use cases →
// different sentences. No keyword stuffing; long-tail coverage emerges
// naturally from real per-product variation.
//
// Locale handling:
//   - English (`en`) is the source of truth and always supported.
//   - Non-English locales render IFF (a) a locale template exists here AND
//     (b) the product has full translation overlays (intro + customization
//     + useCases + packaging) in data/products/translations/<locale>.js.
//     The per-product check is `hasFullProductTranslation` below and is
//     evaluated by the PDP at render time. Partial translations skip the
//     block to avoid mixed-language pages.
//
// Adding a locale: register a new entry in LOCALES with `labels`,
// `buildFaqs(product)` and `buildRich(product)`. The PDP and the
// ProductRichBlock / ProductFaqBlock components pick it up automatically.

// ───────────────────────────────────────────────────────────────────────
// Shared helpers
// ───────────────────────────────────────────────────────────────────────

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

// ───────────────────────────────────────────────────────────────────────
// EN — English (source of truth)
// ───────────────────────────────────────────────────────────────────────

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
      {
        q: `What is the minimum order quantity (MOQ) for the ${name}?`,
        a: `The standard MOQ for the ${name} is ${s.moq}. Lower quantities may be possible for simpler designs; larger or more complex customisations can require a higher minimum. Share your design and target volume and we will confirm the exact MOQ for your project.`,
      },
      {
        q: `How long is the production lead time for the ${name}?`,
        a: `Production of the ${name} typically takes about ${s.lead} after you approve the pre-production sample, depending on quantity, finish and decoration. Sample-making adds time up front; for tight launches, tell us your deadline and we will confirm feasibility before the order is placed.`,
      },
      {
        q: `What is the ${name} made from?`,
        a: `The ${name} is constructed from ${s.material}, finished in ${s.finish} and fitted with ${s.hardware}. The interior uses ${s.lining} so the product inside is protected and presented to spec.`,
      },
      {
        q: `Can the ${name} be branded with our logo and artwork?`,
        a: `Yes — branding options for the ${name} include ${s.branding}.${customization.length ? ` Additional customisation covers: ${customization.slice(0, 4).join('; ')}.` : ''} Send vector artwork (AI, EPS, PDF or SVG) for the cleanest result; we will confirm placement and method on the pre-production sample.`,
      },
    ];
    if (useCases.length) {
      faqs.push({
        q: `What is the ${name} typically used for?`,
        a: `The ${name} is well suited to: ${useCases.join(', ')}. If your application is outside this list, we can usually adapt the spec — describe your product and use case and we will advise.`,
      });
    }
    if (packaging) {
      faqs.push({
        q: `How is the ${name} packaged for export shipping?`,
        a: packaging,
      });
    }
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

// ───────────────────────────────────────────────────────────────────────
// DE — German
// ───────────────────────────────────────────────────────────────────────

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
      {
        q: `Wie hoch ist die Mindestbestellmenge (MOQ) für ${name}?`,
        a: `Die Standard-MOQ für ${name} beträgt ${s.moq}. Bei einfacheren Designs sind kleinere Mengen möglich; größere oder komplexere Anpassungen können eine höhere Mindestmenge erfordern. Teilen Sie uns Ihr Design und Ihre Zielmenge mit, und wir bestätigen die genaue MOQ für Ihr Projekt.`,
      },
      {
        q: `Wie lang ist die Produktionszeit für ${name}?`,
        a: `Die Produktion von ${name} dauert in der Regel etwa ${s.lead} nach Ihrer Freigabe des Vorserienmusters, abhängig von Menge, Finish und Dekoration. Die Bemusterung kommt vorab hinzu; bei zeitkritischen Launches teilen Sie uns Ihren Termin mit, und wir bestätigen die Machbarkeit vor der Bestellung.`,
      },
      {
        q: `Woraus wird ${name} gefertigt?`,
        a: `${name} besteht aus ${s.material}, ist in ${s.finish} ausgeführt und mit ${s.hardware} ausgestattet. Der Innenraum ist mit ${s.lining} versehen, sodass das eingelegte Produkt geschützt und stilgerecht präsentiert wird.`,
      },
      {
        q: `Kann ${name} mit unserem Logo und Design gebrandet werden?`,
        a: `Ja — die Branding-Optionen für ${name} umfassen ${s.branding}.${customization.length ? ` Weitere Anpassungen: ${customization.slice(0, 4).join('; ')}.` : ''} Senden Sie Vektorgrafiken (AI, EPS, PDF oder SVG) für die beste Reproduktion; Platzierung und Methode bestätigen wir am Vorserienmuster.`,
      },
    ];
    if (useCases.length) {
      faqs.push({
        q: `Wofür wird ${name} typischerweise verwendet?`,
        a: `${name} eignet sich gut für: ${useCases.join(', ')}. Liegt Ihre Anwendung außerhalb dieser Liste, können wir die Spezifikation in der Regel anpassen — beschreiben Sie Ihr Produkt und den Anwendungsfall, und wir beraten Sie.`,
      });
    }
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

// ───────────────────────────────────────────────────────────────────────
// IT — Italian
// ───────────────────────────────────────────────────────────────────────

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
      {
        q: `Qual è la quantità minima d'ordine (MOQ) per ${name}?`,
        a: `La MOQ standard per ${name} è di ${s.moq}. Per design più semplici sono possibili quantità inferiori; personalizzazioni più ampie o complesse possono richiedere un minimo più alto. Inviaci il tuo design e il volume target e confermeremo la MOQ esatta per il tuo progetto.`,
      },
      {
        q: `Quanto dura il tempo di produzione per ${name}?`,
        a: `La produzione di ${name} richiede in genere circa ${s.lead} dopo l'approvazione del campione di preproduzione, in base a quantità, finitura e decorazione. La campionatura aggiunge tempo a monte; per lanci con scadenze strette, indicaci la data e confermeremo la fattibilità prima dell'ordine.`,
      },
      {
        q: `Di cosa è fatto ${name}?`,
        a: `${name} è costruito in ${s.material}, rifinito in ${s.finish} e dotato di ${s.hardware}. L'interno è realizzato con ${s.lining}, così il prodotto contenuto è protetto e presentato secondo specifica.`,
      },
      {
        q: `${name} può essere personalizzato con il nostro logo e grafica?`,
        a: `Sì — le opzioni di branding per ${name} includono ${s.branding}.${customization.length ? ` Personalizzazioni aggiuntive: ${customization.slice(0, 4).join('; ')}.` : ''} Invia file vettoriali (AI, EPS, PDF o SVG) per il miglior risultato; posizionamento e metodo vengono confermati sul campione di preproduzione.`,
      },
    ];
    if (useCases.length) {
      faqs.push({
        q: `A cosa serve tipicamente ${name}?`,
        a: `${name} è adatto a: ${useCases.join(', ')}. Se la tua applicazione è al di fuori di questo elenco, possiamo solitamente adattare le specifiche — descrivici il prodotto e il caso d'uso e ti consiglieremo.`,
      });
    }
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

// ───────────────────────────────────────────────────────────────────────
// Dispatcher
// ───────────────────────────────────────────────────────────────────────

const LOCALES = { en: EN, de: DE, it: IT };

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

// True iff the product has overlay translations for the fields we need to
// render localised rich content / FAQs without falling back to English data.
// Used by the PDP to skip the block on partially-translated products and
// avoid mixed-language pages. English is always considered fully covered.
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
