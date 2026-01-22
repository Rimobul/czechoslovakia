import cs from '@/content/i18n/cs.json';
import sk from '@/content/i18n/sk.json';
import en from '@/content/i18n/en.json';

export type Language = 'cs' | 'sk' | 'en';

export const languages: Language[] = ['cs', 'sk', 'en'];
export const defaultLanguage: Language = 'cs';

const translations = { cs, sk, en } as const;

type TranslationValue = string | { [key: string]: TranslationValue };

export function getTranslations(lang: Language) {
  return translations[lang] || translations.cs;
}

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: TranslationValue = translations[lang] || translations.cs;
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = (value as { [key: string]: TranslationValue })[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function formatDate(date: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function getLanguageDisplayName(lang: Language): string {
  const names: Record<Language, string> = {
    cs: 'Čeština',
    sk: 'Slovenčina',
    en: 'English'
  };
  return names[lang];
}
