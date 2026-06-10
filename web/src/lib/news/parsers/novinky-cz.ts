/**
 * Parser for Novinky.cz - extracts region info from szn:sections element
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { normalizeText } from '../utils/text';
import { REGION_BUCKETS } from '../constants';

/**
 * Map section names from Novinky.cz to our region buckets.
 * Handles variants like "Královéhradecký kraj" → "Královéhradecký"
 */
function mapNovinkySectionToRegion(sectionValue: string): string | null {
  const normalized = sectionValue.trim().toLowerCase();

  if (normalized === 'domácí') {
    return 'bucket-5';
  }

  // Check each region bucket for matching terms
  for (const bucket of REGION_BUCKETS) {
    if (bucket.id === 'bucket-5') continue; // Skip global bucket
    for (const term of bucket.terms) {
      if (normalized.includes(normalizeText(term))) {
        return bucket.id;
      }
    }
  }

  return null;
}

export const novinkyCzParser: SourceParser = {
  source: 'Novinky.cz',
  extractBuckets(itemXml: string): string[] {
    const buckets: string[] = [];

    // Extract szn:sections element
    const sectionsMatch = itemXml.match(/<szn:sections>([\s\S]*?)<\/szn:sections>/i);
    if (!sectionsMatch) {
      return buckets;
    }

    const sectionsXml = sectionsMatch[1];

    // Extract all <value> elements within sections
    const valueMatches = Array.from(sectionsXml.matchAll(/<value>([\s\S]*?)<\/value>/gi));

    for (const match of valueMatches) {
      const sectionValue = match[1].trim();
      const mappedBucket = mapNovinkySectionToRegion(sectionValue);

      if (mappedBucket && !buckets.includes(mappedBucket)) {
        buckets.push(mappedBucket);
      }
    }

    return buckets;
  },
};
