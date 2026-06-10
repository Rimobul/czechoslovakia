/**
 * XML parsing utilities for RSS feed parsing
 */

export function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, '/');
}

export function cleanCData(value: string): string {
  return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

export function getTagValue(input: string, tagName: string): string {
  const tagRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = input.match(tagRegex);
  return match ? decodeXmlEntities(cleanCData(match[1].trim())) : '';
}

export function getAttributeValue(input: string, tagName: string, attribute: string): string | null {
  const tagRegex = new RegExp(`<${tagName}[^>]*${attribute}=["']([^"']+)["'][^>]*>`, 'i');
  const match = input.match(tagRegex);
  return match?.[1] ?? null;
}
