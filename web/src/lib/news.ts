export interface NewsCardItem {
  id: string;
  title: string;
  intro: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  bucket: string;
}

interface ParsedFeedItem {
  title: string;
  url: string;
  intro: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
  buckets?: string[]; // Pre-determined bucket IDs from source-specific parsing
}

interface ResolvedArticleMeta {
  finalUrl: string;
  imageUrl: string | null;
  intro: string;
}

interface RegionBucket {
  id: string;
  terms: string[];
}

interface FeedSource {
  source: string;
  url: string;
}

// Parser interface for source-specific metadata extraction
interface SourceParser {
  source: string;
  /**
   * Extract region buckets from item XML.
   * Returns array of bucket IDs that this article belongs to.
   */
  extractBuckets(itemXml: string): string[];
}

// Map of parsers by source name (fallback when no per-URL parser exists)
const PARSERS: Map<string, SourceParser> = new Map();
// Map of parsers by feed URL (takes precedence over PARSERS)
const FEED_PARSERS: Map<string, SourceParser> = new Map();

/**
 * Creates a parser that unconditionally assigns fixed bucket IDs to every
 * article in a feed. Used for feeds that are scoped to a single region.
 */
function makeFixedBucketParser(source: string, buckets: string[]): SourceParser {
  return { source, extractBuckets: () => [...buckets] };
}

const FEED_SOURCES: FeedSource[] = [
  { source: 'Novinky.cz', url: 'https://www.novinky.cz/rss' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/domace/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/krimi/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/ekonomika/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/navyse/' },
  { source: 'Aktuality.sk', url: 'https://sport.aktuality.sk/api/rss' },
  { source: 'Seznam Zpravy', url: 'https://www.seznamzpravy.cz/rss' },
  // iDNES.cz — regional feeds (bucket pre-determined by feed URL)
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=prahah' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=usti' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=brnoh' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=jihlava' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=budejovice' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=vary' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=plzen' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=hradec' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=liberec' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=pardubice' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=olomouc' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=ostrava' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=zlin' },
  // iDNES.cz — national feeds (bucket-5 only when category domain contains "domaci")
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=sport' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=ekonomikah' },
  // iRozhlas.cz — regional feeds
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/53499' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/56511' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/58038' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/102217' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/106781' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/72127' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/84285' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/56358' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/85487' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/167727' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/72476' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/59685' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/86021' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/86697' },
  // iRozhlas.cz — national feed (bucket-5)
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov' },
  // ČTK — national/regional feed
  { source: 'ČTK', url: 'https://www.ceskenoviny.cz/sluzby/rss/cr.php' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/rss/xml/' },
  { source: 'Dennik N', url: 'https://dennikn.sk/feed/' },
  { source: 'HN.cz', url: 'https://archiv.hn.cz/?m=rss' },
];

const ALLOWED_HOST_PARTS = [
  'novinky.cz',
  'aktuality.sk',
  'seznamzpravy.cz',
  'idnes.cz',
  'irozhlas.cz',
  'ceskenoviny.cz',
  'pravda.sk',
  'dennikn.sk',
  'denikn.cz',
  'hn.cz',
];

const REGION_BUCKETS: RegionBucket[] = [
  {
    id: 'bucket-1',
    terms: ['Ústecký', 'Středočeský', 'Praha', 'Hlavní město Praha'],
  },
  {
    id: 'bucket-2',
    terms: ['Vysočina', 'Jihomoravský'],
  },
  {
    id: 'bucket-3',
    terms: ['Bratislavský', 'Nitriansky', 'Trnavský'],
  },
  {
    id: 'bucket-4',
    terms: ['Košický', 'Prešovský'],
  },
  {
    id: 'bucket-5',
    terms: ['Česko', 'Slovensko', 'Czechia', 'Slovakia', "Domácí"],
  },
  {
    id: 'bucket-6',
    terms: ['Jihočeský', 'Plzeňský', 'Karlovarský'],
  },
  {
    id: 'bucket-7',
    terms: ['Moravskoslezský', 'Olomoucký', 'Zlínský'],
  },
  {
    id: 'bucket-8',
    terms: ['Žilinský', 'Banskobystrický', 'Trenčiansky'],
  },
  {
    id: 'bucket-9',
    terms: ['Liberecký', 'Královéhradecký', 'Pardubický'],
  },
];

// ============================================================================
// SOURCE-SPECIFIC PARSERS
// ============================================================================

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

/**
 * Parser for Novinky.cz - extracts region info from szn:sections element
 */
const novinkyCzParser: SourceParser = {
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

// ============================================================================
// Aktuality.sk — prefix-based regional parser
// ============================================================================

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
const aktualitySkParser: SourceParser = {
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

// ============================================================================
// ČTK — location-based regional parser for Czech news
// ============================================================================

interface CZDistrictBucketRule {
  bucketId: string;
  cities: string[];
}

const CZ_DISTRICT_BUCKET_RULES: CZDistrictBucketRule[] = [
  {
    bucketId: 'bucket-1',
    cities: [
      'Praha', 'Prague',
      'Benešov', 'Beroun', 'Kladno', 'Kolín', 'Kutná Hora', 'Mělník',
      'Mladá Boleslav', 'Nymburk', 'Příbram', 'Rakovník',
      'Ústí nad Labem', 'Teplice', 'Most', 'Louny', 'Chomutov', 'Žatec',
      'Kadaň',
    ],
  },
  {
    bucketId: 'bucket-2',
    cities: [
      'Brno',
      'Blansko', 'Vyškov', 'Prostějov', 'Kroměříž', 'Uherské Hradiště',
      'Hodonín', 'Břeclav',
      'Jihlava', 'Havlíčkův Brod', 'Žďár nad Sázavou', 'Třebíč',
    ],
  },
  {
    bucketId: 'bucket-6',
    cities: [
      'České Budějovice', 'Český Krumlov', 'Prachatice', 'Strakonice',
      'Tábor', 'Pelhřimov', 'Jindřichův Hradec', 'Písek',
      'Plzeň', 'Rokycany', 'Tachov', 'Domažlice', 'Klatovy', 'Sušice',
      'Cheb', 'Karlovy Vary', 'Sokolov',
    ],
  },
  {
    bucketId: 'bucket-7',
    cities: [
      'Olomouc', 'Šumperk', 'Přerov',
      'Ostrava', 'Opava', 'Bruntál', 'Frýdek-Místek', 'Nový Jičín',
      'Zlín', 'Vsetín', 'Valašské Meziříčí',
    ],
  },
  {
    bucketId: 'bucket-9',
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
const ctkParser: SourceParser = {
  source: 'ČTK',
  extractBuckets(itemXml: string): string[] {
    const description = getTagValue(itemXml, 'description');
    if (!description) {
      return ['bucket-5'];
    }

    // Extract location (text before dash or parenthesis)
    const location = description.split(/\s*[-\(]/)[0].trim();
    if (!location) {
      return ['bucket-5'];
    }

    const normalizedLocation = normalizeText(location);

    // Find matching city in Czech district mappings
    for (const rule of CZ_DISTRICT_BUCKET_RULES) {
      if (rule.cities.some((city) => normalizeText(city) === normalizedLocation)) {
        return ['bucket-5', rule.bucketId];
      }
    }

    // No district match, only bucket-5
    return ['bucket-5'];
  },
};

// ============================================================================
// iDNES.cz — per-URL parsers
// ============================================================================

/**
 * Parser for iDNES.cz national feeds.
 * Only assigns bucket-5 when the item has a category whose domain attribute
 * contains the word "domaci" (e.g. domain="https://www.idnes.cz/ekonomika/domaci").
 */
const iDnesDomesticParser: SourceParser = {
  source: 'iDNES.cz',
  extractBuckets(itemXml: string): string[] {
    const categoryMatches = Array.from(itemXml.matchAll(/<category[^>]+domain=["']([^"']+)["'][^>]*>/gi));
    const hasDomaci = categoryMatches.some((m) => m[1].toLowerCase().includes('domaci'));
    return hasDomaci ? ['bucket-5'] : [];
  },
};

// Register parsers
PARSERS.set('Novinky.cz', novinkyCzParser);
// Seznam Zpravy uses the same szn:sections structure as Novinky.cz
PARSERS.set('Seznam Zpravy', novinkyCzParser);
PARSERS.set('Aktuality.sk', aktualitySkParser);
PARSERS.set('ČTK', ctkParser);

// iDNES.cz regional feeds — bucket fixed by feed URL
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=prahah',     makeFixedBucketParser('iDNES.cz', ['bucket-1']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=usti',       makeFixedBucketParser('iDNES.cz', ['bucket-1']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=brnoh',      makeFixedBucketParser('iDNES.cz', ['bucket-2']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=jihlava',    makeFixedBucketParser('iDNES.cz', ['bucket-2']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=budejovice', makeFixedBucketParser('iDNES.cz', ['bucket-6']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=vary',       makeFixedBucketParser('iDNES.cz', ['bucket-6']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=plzen',      makeFixedBucketParser('iDNES.cz', ['bucket-6']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=hradec',     makeFixedBucketParser('iDNES.cz', ['bucket-9']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=liberec',    makeFixedBucketParser('iDNES.cz', ['bucket-9']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=pardubice',  makeFixedBucketParser('iDNES.cz', ['bucket-9']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=olomouc',    makeFixedBucketParser('iDNES.cz', ['bucket-7']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ostrava',    makeFixedBucketParser('iDNES.cz', ['bucket-7']));
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zlin',       makeFixedBucketParser('iDNES.cz', ['bucket-7']));
// iDNES.cz national feeds — bucket-5 conditional on category domain
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zpravodaj',  iDnesDomesticParser);
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=sport',      iDnesDomesticParser);
FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ekonomikah', iDnesDomesticParser);

// iRozhlas.cz regional feeds — bucket fixed by feed URL
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/53499',   makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56511',   makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/58038',   makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/102217',  makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/106781',  makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72127',   makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/84285',   makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56358',   makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/85487',   makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/167727',  makeFixedBucketParser('iRozhlas.cz', ['bucket-2']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72476',   makeFixedBucketParser('iRozhlas.cz', ['bucket-2']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/59685',   makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86021',   makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86697',   makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));
// iRozhlas.cz national feed — bucket-5
FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov', makeFixedBucketParser('iRozhlas.cz', ['bucket-5']));

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, '/');
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function cleanCData(value: string): string {
  return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

function getTagValue(input: string, tagName: string): string {
  const tagRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = input.match(tagRegex);
  return match ? decodeXmlEntities(cleanCData(match[1].trim())) : '';
}

function getAttributeValue(input: string, tagName: string, attribute: string): string | null {
  const tagRegex = new RegExp(`<${tagName}[^>]*${attribute}=["']([^"']+)["'][^>]*>`, 'i');
  const match = input.match(tagRegex);
  return match?.[1] ?? null;
}

function toAbsoluteUrl(url: string | null, baseUrl: string): string | null {
  if (!url) {
    return null;
  }

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
}

function getSnippetFromDescription(descriptionHtml: string): string {
  const withoutAnchors = descriptionHtml.replace(/<a[^>]*>[\s\S]*?<\/a>/gi, ' ');
  const snippet = stripHtml(withoutAnchors);
  return snippet.slice(0, 220);
}

function getHostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function isAllowedHost(url: string): boolean {
  const host = getHostFromUrl(url);
  return ALLOWED_HOST_PARTS.some((part) => host.includes(part));
}

function parseFeedItems(xml: string, feed: FeedSource): ParsedFeedItem[] {
  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));

  return itemMatches
    .map((match) => {
      const itemXml = match[1];
      const title = getTagValue(itemXml, 'title');
      const url = getTagValue(itemXml, 'link');
      const publishedAt = getTagValue(itemXml, 'pubDate');
      const source = getTagValue(itemXml, 'source') || feed.source;
      const descriptionHtml = getTagValue(itemXml, 'description');
      const intro = getSnippetFromDescription(descriptionHtml);

      const mediaThumb = getAttributeValue(itemXml, 'media:thumbnail', 'url');
      const mediaContent = getAttributeValue(itemXml, 'media:content', 'url');
      const enclosureImage = getAttributeValue(itemXml, 'enclosure', 'url');
      const imageFromDescription = getAttributeValue(descriptionHtml, 'img', 'src');
      const imageUrl =
        toAbsoluteUrl(mediaThumb, url) ||
        toAbsoluteUrl(mediaContent, url) ||
        toAbsoluteUrl(enclosureImage, url) ||
        toAbsoluteUrl(imageFromDescription, url);

      // Per-URL parser takes precedence; fall back to per-source parser
      let buckets: string[] = [];
      const parser = FEED_PARSERS.get(feed.url) ?? PARSERS.get(feed.source);
      if (parser) {
        buckets = parser.extractBuckets(itemXml);
      }

      return {
        title,
        url,
        intro: intro || title,
        imageUrl,
        source,
        publishedAt,
        buckets: buckets.length > 0 ? buckets : undefined,
      };
    })
    .filter((item) => item.title && item.url && isAllowedHost(item.url));
}

async function fetchAllFeedItems(): Promise<ParsedFeedItem[]> {
  const responses = await Promise.all(
    FEED_SOURCES.map(async (feed) => {
      try {
        const response = await fetch(feed.url, {
          cache: 'no-store',
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        if (!response.ok) {
          return [] as ParsedFeedItem[];
        }

        const xml = await response.text();
        return parseFeedItems(xml, feed);
      } catch {
        return [] as ParsedFeedItem[];
      }
    })
  );

  const merged = responses.flat();
  const dedup = new Map<string, ParsedFeedItem>();

  for (const item of merged) {
    if (!dedup.has(item.url)) {
      dedup.set(item.url, item);
    }
  }

  return Array.from(dedup.values());
}

function randomItem<T>(items: T[]): T | null {
  if (items.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function getMetaContent(html: string, property: string): string | null {
  const escaped = property.replace(':', '\\:');
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escaped}["'][^>]*>`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeXmlEntities(match[1].trim());
    }
  }

  return null;
}

async function resolveArticleMeta(inputUrl: string, fallbackIntro: string): Promise<ResolvedArticleMeta> {
  try {
    const response = await fetch(inputUrl, {
      cache: 'no-store',
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const finalUrl = response.url || inputUrl;
    const html = await response.text();

    const ogImage = getMetaContent(html, 'og:image');
    const twitterImage = getMetaContent(html, 'twitter:image');
    const imageSrc = getAttributeValue(html, 'img', 'src');
    const ogDescription = getMetaContent(html, 'og:description');
    const description = getMetaContent(html, 'description');

    return {
      finalUrl,
      imageUrl:
        toAbsoluteUrl(ogImage, finalUrl) ||
        toAbsoluteUrl(twitterImage, finalUrl) ||
        toAbsoluteUrl(imageSrc, finalUrl),
      intro: (ogDescription || description || fallbackIntro || '').slice(0, 240),
    };
  } catch {
    return {
      finalUrl: inputUrl,
      imageUrl: null,
      intro: fallbackIntro,
    };
  }
}

function itemText(item: ParsedFeedItem): string {
  return normalizeText(`${item.title} ${item.intro} ${item.url}`);
}

function matchesTerms(item: ParsedFeedItem, terms: string[]): boolean {
  const text = itemText(item);
  return terms.some((term) => text.includes(normalizeText(term)));
}

function isRegionalCandidate(item: ParsedFeedItem): boolean {
  return REGION_BUCKETS.filter((b) => b.id !== 'bucket-5').some((bucket) => matchesTerms(item, bucket.terms));
}

export async function getRandomRegionalNewsGrid(): Promise<NewsCardItem[]> {
  const allItems = await fetchAllFeedItems();
  
  const bucketResults = REGION_BUCKETS.map((bucket) => {
    let bucketItems: ParsedFeedItem[];

    if (bucket.id === 'bucket-5') {
      // Global bucket: items with explicit bucket-5 from parser, or items with no regional content
      const explicitGlobal = allItems.filter((item) => item.buckets?.includes('bucket-5'));
      const noRegionalMatch = allItems.filter((item) => !isRegionalCandidate(item));
      bucketItems = explicitGlobal.length > 0 ? explicitGlobal : noRegionalMatch;
    } else {
      // Regional bucket: items with explicit bucket ID from parser, or text-based match
      const explicitMatch = allItems.filter((item) => item.buckets?.includes(bucket.id));
      const textMatch = allItems.filter((item) => matchesTerms(item, bucket.terms));
      bucketItems = explicitMatch.length > 0 ? explicitMatch : textMatch;
    }

    return { bucket, items: bucketItems };
  });

  const usedUrls = new Set<string>();
  const selected: NewsCardItem[] = [];

  for (const { bucket, items } of bucketResults) {
    const availableInBucket = items.filter((item) => !usedUrls.has(item.url));
    const availableGlobal = allItems.filter((item) => !usedUrls.has(item.url));
    const picked = randomItem(availableInBucket) ?? randomItem(availableGlobal) ?? randomItem(items) ?? randomItem(allItems);

    if (!picked) {
      continue;
    }

    usedUrls.add(picked.url);
    const resolved = await resolveArticleMeta(picked.url, picked.intro);

    selected.push({
      id: `${bucket.id}-${resolved.finalUrl}`,
      title: picked.title,
      intro: resolved.intro || picked.intro,
      url: resolved.finalUrl,
      imageUrl: resolved.imageUrl || picked.imageUrl,
      source: picked.source,
      publishedAt: picked.publishedAt,
      bucket: bucket.id,
    });
  }

  // Final safety net: top up to 9 cards from remaining pool if any slot was skipped.
  if (selected.length < 9) {
    const remaining = allItems.filter((item) => !usedUrls.has(item.url));
    for (const item of remaining) {
      if (selected.length >= 9) {
        break;
      }

      const resolved = await resolveArticleMeta(item.url, item.intro);
      usedUrls.add(item.url);
      selected.push({
        id: `fallback-${resolved.finalUrl}`,
        title: item.title,
        intro: resolved.intro || item.intro,
        url: resolved.finalUrl,
        imageUrl: resolved.imageUrl || item.imageUrl,
        source: item.source,
        publishedAt: item.publishedAt,
        bucket: 'fallback',
      });
    }
  }

  return selected;
}
