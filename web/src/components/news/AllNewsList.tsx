'use client';

import { useState, useEffect } from 'react';
import { Language, t } from '@/lib/i18n';
import { ParsedFeedItem } from '@/lib/news/types';
import { getItemsFromCache } from '@/lib/news/client-cache';
import { REGION_BUCKETS } from '@/lib/news/constants';
import { getRegionLabel } from '@/lib/news/region-labels';
import { normalizeText } from '@/lib/news/utils/text';

interface AllNewsListProps {
  lang: Language;
}

function itemText(item: ParsedFeedItem): string {
  return normalizeText(`${item.title} ${item.intro} ${item.url}`);
}

function matchesTerms(item: ParsedFeedItem, terms: string[]): boolean {
  const text = itemText(item);
  return terms.some((term) => text.includes(normalizeText(term)));
}

function isRegionalCandidate(item: ParsedFeedItem): boolean {
  return REGION_BUCKETS.filter((b) => b.id !== 'cesko-slovensko').some((bucket) =>
    matchesTerms(item, bucket.terms),
  );
}

function getItemBuckets(item: ParsedFeedItem): string[] {
  // First check for explicit buckets
  if (item.buckets && item.buckets.length > 0) {
    return item.buckets;
  }

  // Fall back to text matching
  const matchedBuckets: string[] = [];
  for (const bucket of REGION_BUCKETS) {
    if (bucket.id === 'cesko-slovensko') {
      if (!isRegionalCandidate(item)) {
        matchedBuckets.push(bucket.id);
      }
    } else {
      if (matchesTerms(item, bucket.terms)) {
        matchedBuckets.push(bucket.id);
      }
    }
  }

  return matchedBuckets.length > 0 ? matchedBuckets : ['cesko-slovensko'];
}

export default function AllNewsList({ lang }: AllNewsListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<ParsedFeedItem[] | null>(null);

  useEffect(() => {
    if (isOpen && items === null) {
      const cachedItems = getItemsFromCache();
      setItems(cachedItems || []);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Group items by bucket using the same logic as grid-selector
  const groupedByBucket = REGION_BUCKETS.reduce(
    (acc, bucket) => {
      acc[bucket.id] = (items || []).filter((item) => getItemBuckets(item).includes(bucket.id));
      return acc;
    },
    {} as Record<string, ParsedFeedItem[]>
  );

  // Filter to only buckets that have items
  const bucketsWithItems = REGION_BUCKETS.filter((bucket) => groupedByBucket[bucket.id].length > 0);

  return (
    <section className="mt-16 border-t border-border-primary pt-8">
      <button
        onClick={handleToggle}
        className="flex items-center gap-3 text-lg font-semibold hover:text-text-primary transition-colors"
      >
        <span className={`inline-block transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
        {t(lang, 'news.allNews')}
      </button>

      {isOpen && (
        <div className="mt-6 space-y-8">
          {!items || items.length === 0 || bucketsWithItems.length === 0 ? (
            <p className="text-text-secondary">{t(lang, 'news.empty')}</p>
          ) : (
            bucketsWithItems.map((bucket) => (
              <div key={bucket.id}>
                <h3 className="text-base font-semibold mb-3">{getRegionLabel(bucket.id, lang)}</h3>
                <ul className="space-y-2 ml-4">
                  {groupedByBucket[bucket.id].map((item) => (
                    <li key={item.url} className="text-text-primary">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-link hover:underline break-words"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
