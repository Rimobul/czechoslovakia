/**
 * Parser for Aktuality.sk - uses prefix-based matching for Slovak regions
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { BucketPrefixRules, resolveBucketsByPrefixRules } from './prefix-engine';

const AKTUALITY_BUCKET_RULES: BucketPrefixRules[] = [
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

/**
 * Parser for Aktuality.sk — all subfeeds are Slovak domestic news (bucket-5).
 * Regional buckets (3, 4, 8) are determined via prefix matching on the article text.
 */
export const aktualitySkParser: SourceParser = {
  source: 'Aktuality.sk',
  extractBuckets(itemXml: string): string[] {
    const title = getTagValue(itemXml, 'title');
    const description = getTagValue(itemXml, 'description');
    const matchedBuckets = resolveBucketsByPrefixRules(`${title} ${description}`, AKTUALITY_BUCKET_RULES);
    return ['bucket-5', ...matchedBuckets];
  },
};
