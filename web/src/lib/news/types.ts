export interface NewsCardItem {
  id: string;
  title: string;
  intro: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  bucket: string;
}

export interface ParsedFeedItem {
  title: string;
  url: string;
  intro: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  buckets?: string[]; // Pre-determined bucket IDs from source-specific parsing
}

export interface ResolvedArticleMeta {
  finalUrl: string;
  imageUrl: string | null;
  intro: string;
}

export interface RegionBucket {
  id: string;
  terms: string[];
}

export interface FeedSource {
  source: string;
  url: string;
}

export interface SourceParser {
  source: string;
  /**
   * Optional gate for provider-specific filtering.
   * Return false to drop the item before bucket assignment.
   */
  shouldIncludeItem?(itemXml: string): boolean;
  /**
   * Extract region buckets from item XML.
   * Returns array of bucket IDs that this article belongs to.
   */
  extractBuckets(itemXml: string): string[];
}
