/**
 * Parser for SME.sk - prefix-based regional matching with domov fallback
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { resolveBucketsByPrefixRules } from './prefix-engine';
import { SLOVAK_REGIONAL_BUCKET_RULES } from './slovak-regional-rules';
import { normalizeText } from '../utils/text';

export const smeSkParser: SourceParser = {
  source: 'SME.sk',
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const fullText = `${title} ${description}`;
    
    // Try to match regional buckets
    const matchedBuckets = resolveBucketsByPrefixRules(fullText, SLOVAK_REGIONAL_BUCKET_RULES);

    if (matchedBuckets.length > 0) {
      return ['cesko-slovensko', ...matchedBuckets];
    }

    // If no regional match, check for "domov" keyword
    if (normalizeText(fullText).includes('domov')) {
      return ['cesko-slovensko'];
    }

    // Default to cesko-slovensko
    return ['cesko-slovensko'];
  },
};
