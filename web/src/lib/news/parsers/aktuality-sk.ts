/**
 * Parser for Aktuality.sk - uses prefix-based matching for Slovak regions
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { normalizeText } from '../utils/text';

/**
 * A rule is either a single normalised prefix (substring match) or an array
 * of prefixes that ALL must appear in the text (combination match).
 */
type AktualityPrefixRule = string | string[];

interface AktualityBucketRules {
  bucketId: string;
  rules: AktualityPrefixRule[];
}

const AKTUALITY_BUCKET_RULES: AktualityBucketRules[] = [
  {
    bucketId: 'bucket-3',
    rules: [
      'bratislav', 'dunaj', 'záhor', 'malac', 'komárn',
      ['nov', 'zám'],   // Novozámocký, Nové Zámky
      'trnav', 'nitr', 'piešť', 'topoľč',
      ['biel', 'karpat'],  // Biele Karpaty
      'senic', 'senec', 'skalic', 'pezin', 'štúrov', 'levic', 'hlohov',
      'galant', 'šaľ',
      ['zlat', 'morav'],  // Zlaté Moravce
      'západ', 'juh',
    ],
  },
  {
    bucketId: 'bucket-4',
    rules: [
      'košic', 'prešov', 'poprad', 'tatr', 'zemplín', 'šariš', 'spiš', 'gemer',
      'kežmar',
      ['star', 'ľubov'],  // Stará Ľubovňa
      'levoč', 'sabinov', 'bardejov', 'svidní', 'stropkov', 'medzilabor',
      'humen', 'snin', 'vranov', 'sobran', 'michalov', 'trebiš', 'gelnic',
      'rožňav', 'východ',
    ],
  },
  {
    bucketId: 'bucket-8',
    rules: [
      'žilin',
      ['bansk', 'bystric'],  // Banská Bystrica
      'kysuc', 'orav', 'turiec', 'turč', 'liptov', 'trenč', 'myjav',
      ['nov', 'mest'],  // Nové Mesto
      'bánov', 'prievidz', 'partizán', 'ilav', 'púchov',
      ['považ', 'bystric'],  // Považská Bystrica
      'bytč', 'čadč', 'čadca', 'námestov', 'tvrdošín',
      ['doln', 'kubín'],  // Dolný Kubín
      'martin', 'ružomber', 'brezn', 'revúc', 'rimav', 'poltár', 'lučenec',
      'krtíš', 'krupin', 'štiavnic', 'zvolen', 'žiar', 'žarnov', 'stred', 'sever',
    ],
  },
];

function textMatchesAktualityRule(normalizedText: string, rule: AktualityPrefixRule): boolean {
  if (typeof rule === 'string') {
    return normalizedText.includes(normalizeText(rule));
  }
  // Combination rule: every part must appear in the text
  return rule.every((part) => normalizedText.includes(normalizeText(part)));
}

/**
 * Parser for Aktuality.sk — all subfeeds are Slovak domestic news (bucket-5).
 * Regional buckets (3, 4, 8) are determined via prefix matching on the article text.
 */
export const aktualitySkParser: SourceParser = {
  source: 'Aktuality.sk',
  extractBuckets(itemXml: string): string[] {
    const buckets: string[] = ['bucket-5'];

    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const normalizedText = normalizeText(`${title} ${description}`);

    for (const { bucketId, rules } of AKTUALITY_BUCKET_RULES) {
      if (rules.some((rule) => textMatchesAktualityRule(normalizedText, rule))) {
        buckets.push(bucketId);
      }
    }

    return buckets;
  },
};
