/**
 * Parser for HNonline.sk - include only items with "Slovensko" or "Domáca ekonomika" category,
 * then map Slovak regions by prefix rules.
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { SLOVAK_REGIONAL_BUCKET_RULES } from './slovak-regional-rules';

const ALLOWED_CATEGORIES = ['slovensko', 'domáca ekonomika'];

export const hnonlineSkParser: SourceParser = {
  source: 'HNonline.sk',
  shouldIncludeItem(itemXml: string): boolean {
    // Extract all <category> elements
    const categoryMatches = Array.from(itemXml.matchAll(/<category[^>]*>([^<]+)<\/category>/gi));
    return categoryMatches.some((match) => {
      const categoryText = match[1].toLowerCase();
      return ALLOWED_CATEGORIES.some((allowed) => categoryText.includes(allowed));
    });
  },
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const matchedBuckets = resolveBucketsByPrefixRules(`${title} ${description}`, SLOVAK_REGIONAL_BUCKET_RULES);

    if (matchedBuckets.length === 0) {
      return ['bucket-5'];
    }

    return ['bucket-5', ...matchedBuckets];
  },
};
