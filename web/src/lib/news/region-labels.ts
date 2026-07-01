/**
 * Localized region labels for news cards
 */

export interface RegionLabel {
  cs: string;
  sk: string;
  en: string;
}

export const REGION_LABELS: Record<string, RegionLabel> = {
  'zapadni-cechy': {
    cs: 'Západní Čechy',
    sk: 'Západné Čechy',
    en: 'Western Czechia',
  },
  'vychodni-cechy': {
    cs: 'Východní Čechy',
    sk: 'Východné Čechy',
    en: 'Eastern Czechia',
  },
  'jizni-cechy': {
    cs: 'Jižní Čechy',
    sk: 'Južné Čechy',
    en: 'South Czechia',
  },
  'jizni-morava': {
    cs: 'Jižní Morava',
    sk: 'Južná Morava',
    en: 'South Moravia',
  },
  'cesko-slovensko': {
    cs: 'Česko & Slovensko',
    sk: 'Česko & Slovensko',
    en: 'Czechia & Slovakia',
  },
  'severni-morava': {
    cs: 'Severní Morava',
    sk: 'Severná Morava',
    en: 'North Moravia',
  },
  'zapadne-slovensko': {
    cs: 'Západní Slovensko',
    sk: 'Západné Slovensko',
    en: 'Western Slovakia',
  },
  'stredne-slovensko': {
    cs: 'Střední Slovensko',
    sk: 'Stredné Slovensko',
    en: 'Central Slovakia',
  },
  'vychodne-slovensko': {
    cs: 'Východní Slovensko',
    sk: 'Východné Slovensko',
    en: 'Eastern Slovakia',
  },
  'fallback': {
    cs: 'Ostatní',
    sk: 'Ostatné',
    en: 'Other',
  },
};

export function getRegionLabel(bucketId: string, lang: 'cs' | 'sk' | 'en' = 'cs'): string {
  return REGION_LABELS[bucketId]?.[lang] || REGION_LABELS['fallback'][lang];
}
