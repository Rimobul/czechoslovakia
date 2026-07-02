import { NewsCardItem, ParsedFeedItem } from '@/lib/news/types';
import { selectRandomGrid } from '@/lib/news/grid-selector';

const CACHE_KEY = 'ncs-news-items-cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface NewsCacheEntry {
  /** All parsed feed items from all RSS sources */
  items: ParsedFeedItem[];
  /** UTC epoch milliseconds when the cache was last populated */
  timestamp: number;
}

export function getItemsFromCache(): ParsedFeedItem[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: NewsCacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
    return entry.items;
  } catch {
    return null;
  }
}

function saveItemsToCache(items: ParsedFeedItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: NewsCacheEntry = { items, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage may be unavailable (private browsing, storage quota exceeded)
  }
}

/**
 * SWR fetcher.
 *
 * Returns a freshly-randomized 9-card grid on every call.
 * The full item pool is fetched from the API at most once per hour and
 * persisted in localStorage; randomization runs locally from the pool
 * every time, so each page render produces a different selection.
 */
export async function newsFetcher(): Promise<NewsCardItem[]> {
  let items = getItemsFromCache();

  if (!items) {
    const res = await fetch('/api/news');
    if (!res.ok) throw new Error(`News API responded with ${res.status}`);
    items = (await res.json()) as ParsedFeedItem[];
    saveItemsToCache(items);
  }

  return selectRandomGrid(items);
}
