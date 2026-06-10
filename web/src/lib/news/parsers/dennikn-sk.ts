/**
 * Parser for DennikN.sk - prefix-based matching for Slovak regional buckets
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { SLOVAK_REGIONAL_BUCKET_RULES } from './slovak-regional-rules';

export const dennikNSkParser: SourceParser = {
  source: 'Dennik N',
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