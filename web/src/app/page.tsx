import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { Language, defaultLanguage, languages } from '@/lib/i18n';

export default async function RootPage() {
  // Check for language preference cookie
  const cookieStore = await cookies();
  const preferredLang = cookieStore.get('preferred_lang')?.value as Language | undefined;

  if (preferredLang && languages.includes(preferredLang)) {
    redirect(`/${preferredLang}`);
  }

  // Try to detect from Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  const detectedLang = detectLanguage(acceptLanguage);
  redirect(`/${detectedLang}`);
}

function detectLanguage(acceptLanguage: string): Language {
  const langs = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().substring(0, 2).toLowerCase());

  for (const lang of langs) {
    if (languages.includes(lang as Language)) {
      return lang as Language;
    }
  }

  return defaultLanguage;
}
