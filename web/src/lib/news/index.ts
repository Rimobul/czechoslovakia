/**
 * Main news grid orchestration
 */

import { NewsCardItem } from './types';
import { REGION_BUCKETS } from './constants';
import { normalizeText } from './utils/text';
import { resolveArticleMeta } from './utils/image';
import { fetchAllFeedItems, parseFeedItems } from './fetch';
import { registerParsers } from './parsers/registry';
import { ParsedFeedItem } from './types';

// Initialize parser registry on module load
registerParsers();

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
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
    matchesTerms(item, bucket.terms)
  );
}

export async function getRandomRegionalNewsGrid(): Promise<NewsCardItem[]> {
  const allItems = await fetchAllFeedItems();

  const bucketResults = REGION_BUCKETS.map((bucket) => {
    let bucketItems: ParsedFeedItem[];

    if (bucket.id === 'cesko-slovensko') {
      // Global bucket: items with explicit cesko-slovensko from parser, or items with no regional content
      const explicitGlobal = allItems.filter((item) => item.buckets?.includes('cesko-slovensko'));
      const noRegionalMatch = allItems.filter((item) => !isRegionalCandidate(item));
      bucketItems = explicitGlobal.length > 0 ? explicitGlobal : noRegionalMatch;
    } else {
      // Regional bucket: items with explicit bucket ID from parser, or text-based match
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
      randomItem(availableInBucket) ?? randomItem(availableGlobal) ?? randomItem(items) ?? randomItem(allItems);

    if (!picked) {
      continue;
    }

    usedUrls.add(picked.url);
    const resolved = await resolveArticleMeta(picked.url, picked.intro);

    selected.push({
      id: `${bucket.id}-${resolved.finalUrl}`,
      title: picked.title,
      intro: resolved.intro || picked.intro,
      url: resolved.finalUrl,
      imageUrl: resolved.imageUrl || picked.imageUrl,
      source: picked.source,
      publishedAt: picked.publishedAt,
      bucket: bucket.id,
    });
  }

  // Final safety net: top up to 9 cards from remaining pool if any slot was skipped.
  if (selected.length < 9) {
    const remaining = allItems.filter((item) => !usedUrls.has(item.url));
    for (const item of remaining) {
      if (selected.length >= 9) {
        break;
      }

      const resolved = await resolveArticleMeta(item.url, item.intro);
      usedUrls.add(item.url);
      selected.push({
        id: `fallback-${resolved.finalUrl}`,
        title: item.title,
        intro: resolved.intro || item.intro,
        url: resolved.finalUrl,
        imageUrl: resolved.imageUrl || item.imageUrl,
        source: item.source,
        publishedAt: item.publishedAt,
        bucket: 'fallback',
      });
    }
  }

  return selected;
}
