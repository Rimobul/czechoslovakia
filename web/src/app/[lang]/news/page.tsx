import { Language, languages, t } from '@/lib/i18n';
import NewsGrid from '@/components/news/NewsGrid';
import AllNewsList from '@/components/news/AllNewsList';

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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">{t(lang, 'news.title')}</h1>
        <p className="text-text-secondary text-lg text-center max-w-3xl mx-auto mb-10">{t(lang, 'news.intro')}</p>

        <NewsGrid lang={lang} />

        <AllNewsList lang={lang} />
      </div>
    </div>
  );
}
