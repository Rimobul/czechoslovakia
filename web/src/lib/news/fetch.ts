/**
 * Feed fetching and item parsing
 */

import { FeedSource, ParsedFeedItem } from './types';
import { FEED_SOURCES } from './constants';
import { getTagValue } from './utils/xml';
import { getSnippetFromDescription } from './utils/image';
import { getAttributeValue } from './utils/xml';
import { toAbsoluteUrl } from './utils/url';
import { isAllowedHost } from './utils/url';
import { FEED_PARSERS, PARSERS } from './parsers/registry';

export function parseFeedItems(xml: string, feed: FeedSource): ParsedFeedItem[] {
  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));

  return itemMatches
    .map((match) => {
      const itemXml = match[1];
      const parser = FEED_PARSERS.get(feed.url) ?? PARSERS.get(feed.source);

      if (parser?.shouldIncludeItem && !parser.shouldIncludeItem(itemXml)) {
        return null;
      }

      const title = getTagValue(itemXml, 'title');
      const url = getTagValue(itemXml, 'link');
      const publishedAt = getTagValue(itemXml, 'pubDate');
      const source = getTagValue(itemXml, 'source') || feed.source;
      const descriptionHtml = getTagValue(itemXml, 'description');
      const intro = getSnippetFromDescription(descriptionHtml);

      const mediaThumb = getAttributeValue(itemXml, 'media:thumbnail', 'url');
      const mediaContent = getAttributeValue(itemXml, 'media:content', 'url');
      const enclosureImage = getAttributeValue(itemXml, 'enclosure', 'url');
      const imageFromDescription = getAttributeValue(descriptionHtml, 'img', 'src');
      const imageUrl =
        toAbsoluteUrl(mediaThumb, url) ||
        toAbsoluteUrl(mediaContent, url) ||
        toAbsoluteUrl(enclosureImage, url) ||
        toAbsoluteUrl(imageFromDescription, url);

      // Per-URL parser takes precedence; fall back to per-source parser
      let buckets: string[] = [];
      if (parser) {
        buckets = parser.extractBuckets(itemXml);
      }

      return {
        title,
        url,
        intro: intro || title,
        imageUrl,
        source,
        publishedAt,
        buckets: buckets.length > 0 ? buckets : undefined,
      };
    })
    .filter((item): item is ParsedFeedItem => Boolean(item))
    .filter((item) => item.title && item.url && isAllowedHost(item.url));
}

export async function fetchAllFeedItems(): Promise<ParsedFeedItem[]> {
  const responses = await Promise.all(
    FEED_SOURCES.map(async (feed) => {
      try {
        const response = await fetch(feed.url, {
          cache: 'no-store',
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (!response.ok) {
          return [] as ParsedFeedItem[];
        }

        const xml = await response.text();
        return parseFeedItems(xml, feed);
      } catch {
        return [] as ParsedFeedItem[];
      }
    })
  );

  const merged = responses.flat();
  const dedup = new Map<string, ParsedFeedItem>();

  for (const item of merged) {
    if (!dedup.has(item.url)) {
      dedup.set(item.url, item);
    }
  }

  return Array.from(dedup.values());
}
