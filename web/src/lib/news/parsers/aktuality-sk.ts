/**
 * Parser for Aktuality.sk - uses prefix-based matching for Slovak regions
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { SLOVAK_REGIONAL_BUCKET_RULES } from './slovak-regional-rules';

/**
 * Parser for Aktuality.sk — all subfeeds are Slovak domestic news (cesko-slovensko).
 * Regional buckets (3, 4, 8) are determined via prefix matching on the article text.
 */
export const aktualitySkParser: SourceParser = {
  source: 'Aktuality.sk',
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const matchedBuckets = resolveBucketsByPrefixRules(`${title} ${description}`, SLOVAK_REGIONAL_BUCKET_RULES);
    return ['cesko-slovensko', ...matchedBuckets];
  },
};
