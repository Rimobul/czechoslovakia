/**
 * URL handling utilities
 */

import { ALLOWED_HOST_PARTS } from '../constants';

export function toAbsoluteUrl(url: string | null, baseUrl: string): string | null {
  if (!url) {
    return null;
  }

  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return null;
  }
}

export function getHostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function isAllowedHost(url: string): boolean {
  const host = getHostFromUrl(url);
  return ALLOWED_HOST_PARTS.some((part) => host.includes(part));
}
