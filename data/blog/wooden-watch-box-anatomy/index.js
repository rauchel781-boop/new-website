import de, {insertGuideProductParagraph as deLinks} from './de.js';
import fr, {insertGuideProductParagraph as frLinks} from './fr.js';
import es, {insertGuideProductParagraph as esLinks} from './es.js';
import it, {insertGuideProductParagraph as itLinks} from './it.js';
import pt, {insertGuideProductParagraph as ptLinks} from './pt.js';
import ja, {insertGuideProductParagraph as jaLinks} from './ja.js';
import ko, {insertGuideProductParagraph as koLinks} from './ko.js';

const WATCH = {de, fr, es, it, pt, ja, ko};
const LINKS = {de: deLinks, fr: frLinks, es: esLinks, it: itLinks, pt: ptLinks, ja: jaLinks, ko: koLinks};

export function getWatchArticleCopy(locale) {
  return WATCH[locale];
}

// Keep the existing insert guide and add a model-specific comparison at the
// same contextual location in each translated body. Never append to an
// unrelated section if an older translation loses the expected reference.
export function addWatchReferencesToInsertGuide(translation, locale) {
  const paragraph = LINKS[locale];
  if (!paragraph) return translation;
  const body = translation.body;
  const index = body?.findIndex(block => block.type === 'p' && block.text.includes('](/products/watch-jewelry/three-watch-display-case)'));
  if (!(index >= 0)) throw new Error(`Insert guide reference anchor missing for ${locale}`);
  return {...translation, updated: '2026-10-22', body: [...body.slice(0, index + 1), {type: 'p', text: paragraph}, ...body.slice(index + 1)]};
}
