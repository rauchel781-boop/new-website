'use client';

// "Print / Save as PDF" control for blog articles.
//
// Client component purely because it calls window.print(). There is no
// separate PDF pipeline: every desktop browser's print dialog offers
// "Save as PDF" as a destination, so one button covers both jobs and we
// avoid shipping a PDF library to the browser.
//
// The actual print styling lives in the article's POST_CSS @media print
// block (nav, share buttons, related posts and the CTA are hidden there);
// this component only triggers the dialog.
//
// Hidden from print output itself via .no-print, so the button does not
// appear in the saved PDF.

export default function BlogPrintButton({ label = 'Print / PDF' }) {
  return (
    <button
      type="button"
      className="bp-print no-print"
      onClick={() => window.print()}
    >
      <span aria-hidden="true">⎙</span>
      {label}
    </button>
  );
}
