/**
 * Parser for iDNES.cz - conditional cesko-slovensko assignment based on category domain
 */

import { SourceParser } from '../types';

/**
 * Parser for iDNES.cz national feeds.
 * Only assigns cesko-slovensko when the item has a category whose domain attribute
 * contains the word "domaci" (e.g. domain="https://www.idnes.cz/ekonomika/domaci").
 */
export const iDnesDomesticParser: SourceParser = {
  source: 'iDNES.cz',
  extractBuckets(itemXml: string): string[] {
    const categoryMatches = Array.from(itemXml.matchAll(/<category[^>]+domain=["']([^"']+)["'][^>]*>/gi));
    const hasDomaci = categoryMatches.some((m) => m[1].toLowerCase().includes('domaci'));
    return hasDomaci ? ['cesko-slovensko'] : [];
  },
};

/**
 * Creates a parser that unconditionally assigns fixed bucket IDs to every
 * article in a feed. Used for feeds that are scoped to a single region.
 */
export function makeFixedBucketParser(source: string, buckets: string[]): SourceParser {
  return { source, extractBuckets: () => [...buckets] };
}
