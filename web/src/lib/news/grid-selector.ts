/**
 * Client-compatible grid selection.
 *
 * Mirrors the bucket-selection logic from index.ts but is fully synchronous
 * and has no server-only dependencies, so it can run in the browser.
 * Images and descriptions come directly from the parsed feed items
 * (media:thumbnail / enclosure / description snippet) — resolveArticleMeta
 * is intentionally omitted here since we execute this on every render to
 * produce a freshly-randomized selection from the cached item pool.
 */

import { ParsedFeedItem, NewsCardItem } from './types';
import { REGION_BUCKETS } from './constants';
import { normalizeText } from './utils/text';

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
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

export function selectRandomGrid(allItems: ParsedFeedItem[]): NewsCardItem[] {
  const bucketResults = REGION_BUCKETS.map((bucket) => {
    let bucketItems: ParsedFeedItem[];

    if (bucket.id === 'cesko-slovensko') {
      const explicitGlobal = allItems.filter((item) => item.buckets?.includes('cesko-slovensko'));
      const noRegionalMatch = allItems.filter((item) => !isRegionalCandidate(item));
      bucketItems = explicitGlobal.length > 0 ? explicitGlobal : noRegionalMatch;
    } else {
      const explicitMatch = allItems.filter((item) => item.buckets?.includes(bucket.id));
      const textMatch = allItems.filter((item) => matchesTerms(item, bucket.terms));
      bucketItems = explicitMatch.length > 0 ? explicitMatch : textMatch;
    }

    return { bucket, items: bucketItems };
  });

  const usedUrls = new Set<string>();
  const selected: NewsCardItem[] = [];

  for (const { bucket, items } of bucketResults) {
    const availableInBucket = items.filter((item) => !usedUrls.has(item.url));
    const availableGlobal = allItems.filter((item) => !usedUrls.has(item.url));
    const picked =
      randomItem(availableInBucket) ??
      randomItem(availableGlobal) ??
      randomItem(items) ??
      randomItem(allItems);

    if (!picked) continue;

    usedUrls.add(picked.url);
    selected.push({
      id: `${bucket.id}-${picked.url}`,
      title: picked.title,
      intro: picked.intro,
      url: picked.url,
      imageUrl: picked.imageUrl,
      source: picked.source,
      publishedAt: picked.publishedAt,
      bucket: bucket.id,
    });
  }

  // Top up to 9 from the remaining pool if any bucket slot was skipped.
  if (selected.length < 9) {
    const remaining = allItems.filter((item) => !usedUrls.has(item.url));
    for (const item of remaining) {
      if (selected.length >= 9) break;
      usedUrls.add(item.url);
      selected.push({
        id: `fallback-${item.url}`,
        title: item.title,
        intro: item.intro,
        url: item.url,
        imageUrl: item.imageUrl,
        source: item.source,
        publishedAt: item.publishedAt,
        bucket: 'fallback',
      });
    }
  }

  return selected;
}
