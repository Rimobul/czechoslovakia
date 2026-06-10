import { BucketPrefixRules } from './prefix-engine';

export const CZECH_REGIONAL_BUCKET_RULES: BucketPrefixRules[] = [
  {
    bucketId: 'bucket-1',
    rules: [
      'prah', 'praz', 'nymbur', 'kolin', ['kutn', 'hor'], 'benesov', 'pribram', 'beroun',
      'rakovni', 'klad', 'melni', ['mlad', 'boleslav'], 'loun', 'litomer', 'decin',
      ['ust', 'labe'], 'teplic', 'most', 'chomutov', ['stred', 'cesk'], ['krusn', 'hor'],
    ],
  },
  {
    bucketId: 'bucket-2',
    rules: [
      'brn', 'znoj', 'breclav', 'hodonin', 'vyskov', 'blan', 'trebic', ['zdar', 'sazav'],
      'jihlav', 'pelhrimov', ['halvic', 'brod'], 'vysocina', ['ji', 'morav'],
    ],
  },
  {
    bucketId: 'bucket-6',
    rules: [
      'plzen', 'rokycan', 'klatov', 'domazlic', 'tachov', 'pise', 'strakonic', 'prachatic',
      ['cesk', 'krumlov'], ['cesk', 'budejov'], 'tabor', ['jindrich', 'hradec'], 'cheb',
      'sokolov', ['karlov', 'var'], 'sumav', ['jiz', 'cech'], ['zapad', 'cech'],
    ],
  },
  {
    bucketId: 'bucket-7',
    rules: [
      'ostrav', 'karvin', 'trinec', ['nov', 'jicin'], 'opav', 'bruntal', 'krnov', 'jeseni',
      'sumper', 'olomouc', 'prostejov', 'prerov', 'kromeriz', 'zlin', 'vsetin', 'uhersk',
      'beskyd', ['sever', 'morav'], 'slezsk', 'slovac', 'hana',
    ],
  },
  {
    bucketId: 'bucket-9',
    rules: [
      ['cesk', 'lip'], 'liberec', ['jablon', 'nis'], 'semil', 'jicin', 'trutnov', 'nachod',
      ['hradec', 'kralov'], 'kralovehradec', ['rychnov', 'knez'], 'pardubic', 'chrudim',
      'svitav', ['ust', 'orlic'], 'krkonos', ['vychod', 'cech'],
    ],
  },
];
