import { Language, languages, t } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function NewsPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">{t(lang, 'news.title')}</h1>
        <p className="text-text-secondary text-lg">{t(lang, 'news.intro')}</p>
      </div>
    </div>
  );
}
