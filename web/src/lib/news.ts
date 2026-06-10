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

const FEED_SOURCES: FeedSource[] = [
  { source: 'Novinky.cz', url: 'https://www.novinky.cz/rss' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/' },
  { source: 'Seznam Zpravy', url: 'https://www.seznamzpravy.cz/rss' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=regiony' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/rss/xml/' },
  { source: 'Dennik N', url: 'https://dennikn.sk/feed/' },
  { source: 'HN.cz', url: 'https://archiv.hn.cz/?m=rss' },
];

const ALLOWED_HOST_PARTS = [
  'novinky.cz',
  'aktuality.sk',
  'seznamzpravy.cz',
  'idnes.cz',
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
    terms: ['Vysočina', 'Jihomoravský', 'Jihomoravský kraj'],
  },
  {
    id: 'bucket-3',
    terms: ['Bratislavský', 'Nitriansky', 'Trnavský kraj'],
  },
  {
    id: 'bucket-4',
    terms: ['Košický', 'Prešovský kraj'],
  },
  {
    id: 'bucket-5',
    terms: ['Česko', 'Slovensko', 'Czechia', 'Slovakia'],
  },
  {
    id: 'bucket-6',
    terms: ['Jihočeský', 'Plzeňský', 'Karlovarský kraj'],
  },
  {
    id: 'bucket-7',
    terms: ['Moravskoslezský', 'Olomoucký', 'Zlínský kraj'],
  },
  {
    id: 'bucket-8',
    terms: ['Žilinský', 'Banskobystrický', 'Trenčiansky kraj'],
  },
  {
    id: 'bucket-9',
    terms: ['Liberecký', 'Královéhradecký', 'Pardubický kraj'],
  },
];

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

function parseFeedItems(xml: string, fallbackSource: string): ParsedFeedItem[] {
  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));

  return itemMatches
    .map((match) => {
      const itemXml = match[1];
      const title = getTagValue(itemXml, 'title');
      const url = getTagValue(itemXml, 'link');
      const publishedAt = getTagValue(itemXml, 'pubDate');
      const source = getTagValue(itemXml, 'source') || fallbackSource;
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

      return {
        title,
        url,
        intro: intro || title,
        imageUrl,
        source,
        publishedAt,
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
        return parseFeedItems(xml, feed.source);
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
    if (bucket.id === 'bucket-5') {
      const globalOnly = allItems.filter((item) => !isRegionalCandidate(item));
      return { bucket, items: globalOnly.length > 0 ? globalOnly : allItems };
    }
    return { bucket, items: allItems.filter((item) => matchesTerms(item, bucket.terms)) };
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
