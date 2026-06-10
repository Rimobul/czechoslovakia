/**
 * Image and metadata extraction utilities
 */

import { stripHtml } from './text';
import { getAttributeValue, decodeXmlEntities } from './xml';
import { toAbsoluteUrl } from './url';

export function getSnippetFromDescription(descriptionHtml: string): string {
  const withoutAnchors = descriptionHtml.replace(/<a[^>]*>[\s\S]*?<\/a>/gi, ' ');
  const snippet = stripHtml(withoutAnchors);
  return snippet.slice(0, 220);
}

export function getMetaContent(html: string, property: string): string | null {
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

export async function resolveArticleMeta(
  inputUrl: string,
  fallbackIntro: string
): Promise<{ finalUrl: string; imageUrl: string | null; intro: string }> {
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
