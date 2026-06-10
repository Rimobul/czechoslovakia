/**
 * Parser for Lidovky.cz - include only items with domov category domain,
 * then map Czech regions by shared prefix rules.
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { CZECH_REGIONAL_BUCKET_RULES } from './czech-regional-rules';

const DOMOV_CATEGORY_REGEX = /<category[^>]+domain=["']([^"']+)["'][^>]*>/gi;

export const lidovkyCzParser: SourceParser = {
  source: 'Lidovky.cz',
  shouldIncludeItem(itemXml: string): boolean {
    const categories = Array.from(itemXml.matchAll(DOMOV_CATEGORY_REGEX));
    return categories.some((match) => match[1].toLowerCase().includes('domov'));
  },
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const matchedBuckets = resolveBucketsByPrefixRules(`${title} ${description}`, CZECH_REGIONAL_BUCKET_RULES);

    if (matchedBuckets.length === 0) {
      return ['bucket-5'];
    }

    return ['bucket-5', ...matchedBuckets];
  },
};
