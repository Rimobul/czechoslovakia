import { BucketPrefixRules } from './prefix-engine';

export const SLOVAK_REGIONAL_BUCKET_RULES: BucketPrefixRules[] = [
  {
    bucketId: 'zapadne-slovensko',
    rules: [
      'bratislav', 'dunaj', 'záhor', 'malac', 'komárn',
      ['nov', 'zám'],
      'trnav', 'nitr', 'piešť', 'topoľč',
      ['biel', 'karpat'],
      'senic', 'senec', 'skalic', 'pezin', 'štúrov', 'levic', 'hlohov',
      'galant', 'šaľ',
      ['zlat', 'morav'],
      'západ', 'juh',
    ],
  },
  {
    bucketId: 'vychodne-slovensko',
    rules: [
      'košic', 'prešov', 'poprad', 'tatr', 'zemplín', 'šariš', 'spiš', 'gemer',
      'kežmar',
      ['star', 'ľubov'],
      'levoč', 'sabinov', 'bardejov', 'svidní', 'stropkov', 'medzilabor',
      'humen', 'snin', 'vranov', 'sobran', 'michalov', 'trebiš', 'gelnic',
      'rožňav', 'východ',
    ],
  },
  {
    bucketId: 'stredne-slovensko',
    rules: [
      'žilin',
      ['bansk', 'bystric'],
      'kysuc', 'orav', 'turiec', 'turč', 'liptov', 'trenč', 'myjav',
      ['nov', 'mest'],
      'bánov', 'prievidz', 'partizán', 'ilav', 'púchov',
      ['považ', 'bystric'],
      'bytč', 'čadč', 'čadca', 'námestov', 'tvrdošín',
      ['doln', 'kubín'],
      'martin', 'ružomber', 'brezn', 'revúc', 'rimav', 'poltár', 'lučenec',
      'krtíš', 'krupin', 'štiavnic', 'zvolen', 'žiar', 'žarnov', 'stred', 'sever',
    ],
  },
];