'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {useLocale} from 'next-intl';
import {readProductInquiry} from '@/lib/product-inquiry';

// Only this renderless component depends on the query string. The contact
// content and form remain in the statically generated HTML outside Suspense.
export default function ProductInquiryPrefill({onContext}) {
  const searchParams = useSearchParams();
  const locale = useLocale();
  useEffect(() => {
    onContext(readProductInquiry(searchParams, locale));
  }, [searchParams, locale, onContext]);
  return null;
}
