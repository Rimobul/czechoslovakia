/**
 * Parser for HN.cz - prefix-based matching for Czech regional buckets
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { CZECH_REGIONAL_BUCKET_RULES } from './czech-regional-rules';

export const hnCzParser: SourceParser = {
  source: 'HN.cz',
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const matchedBuckets = resolveBucketsByPrefixRules(`${title} ${description}`, CZECH_REGIONAL_BUCKET_RULES);

    if (matchedBuckets.length === 0) {
      return ['cesko-slovensko'];
    }

    return ['cesko-slovensko', ...matchedBuckets];
  },
};
