/**
 * Parser for ČTK - location-based regional parser for Czech news
 */

import { SourceParser } from '../types';
import { getTagValue } from '../utils/xml';
import { normalizeText } from '../utils/text';

interface CZDistrictBucketRule {
  bucketId: string;
  cities: string[];
}

const CZ_DISTRICT_BUCKET_RULES: CZDistrictBucketRule[] = [
  {
    bucketId: 'zapadni-cechy',
    cities: [
      'Praha', 'Prague',
      'Benešov', 'Beroun', 'Kladno', 'Kolín', 'Kutná Hora', 'Mělník',
      'Mladá Boleslav', 'Nymburk', 'Příbram', 'Rakovník',
      'Ústí nad Labem', 'Teplice', 'Most', 'Louny', 'Chomutov', 'Žatec',
      'Kadaň',
    ],
  },
  {
    bucketId: 'jizni-morava',
    cities: [
      'Brno',
      'Blansko', 'Vyškov', 'Prostějov', 'Kroměříž', 'Uherské Hradiště',
      'Hodonín', 'Břeclav',
      'Jihlava', 'Havlíčkův Brod', 'Žďár nad Sázavou', 'Třebíč',
    ],
  },
  {
    bucketId: 'jizni-cechy',
    cities: [
      'České Budějovice', 'Český Krumlov', 'Prachatice', 'Strakonice',
      'Tábor', 'Pelhřimov', 'Jindřichův Hradec', 'Písek',
      'Plzeň', 'Rokycany', 'Tachov', 'Domažlice', 'Klatovy', 'Sušice',
      'Cheb', 'Karlovy Vary', 'Sokolov',
    ],
  },
  {
    bucketId: 'severni-morava',
    cities: [
      'Olomouc', 'Šumperk', 'Přerov',
      'Ostrava', 'Opava', 'Bruntál', 'Frýdek-Místek', 'Nový Jičín',
      'Zlín', 'Vsetín', 'Valašské Meziříčí',
    ],
  },
  {
    bucketId: 'vychodni-cechy',
    cities: [
      'Liberec', 'Česká Lípa', 'Jablonec nad Nisou', 'Semily',
      'Hradec Králové', 'Jičín', 'Chrudim', 'Ústí nad Orlicí',
      'Pardubice',
    ],
  },
];

/**
 * Parser for ČTK — extracts the location from the start of the description
 * (e.g., "Brno - News content...") and maps it to regional buckets.
 */
export const ctkParser: SourceParser = {
  source: 'ČTK',
  extractBuckets(itemXml: string): string[] {
    const description = getTagValue(itemXml, 'description');
    if (!description) {
      return ['cesko-slovensko'];
    }

    // Extract location (text before dash or parenthesis)
    const location = description.split(/\s*[-\(]/)[0].trim();
    if (!location) {
      return ['cesko-slovensko'];
    }

    const normalizedLocation = normalizeText(location);

    // Find matching city in Czech district mappings
    for (const rule of CZ_DISTRICT_BUCKET_RULES) {
      if (rule.cities.some((city) => normalizeText(city) === normalizedLocation)) {
        return ['cesko-slovensko', rule.bucketId];
      }
    }

    // No district match, only cesko-slovensko
    return ['cesko-slovensko'];
  },
};
