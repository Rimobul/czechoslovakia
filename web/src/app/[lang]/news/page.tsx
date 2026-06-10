import { Language, languages, t } from '@/lib/i18n';
import { getRandomRegionalNewsGrid } from '@/lib/news';
import NewsCard from '@/components/news/NewsCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function NewsPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';
  const items = await getRandomRegionalNewsGrid();

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">{t(lang, 'news.title')}</h1>
        <p className="text-text-secondary text-lg text-center max-w-3xl mx-auto mb-10">{t(lang, 'news.intro')}</p>

        {items.length === 0 ? (
          <p className="text-center text-text-secondary">{t(lang, 'news.empty')}</p>
        ) : (
          <div className="news-grid">
            {items.slice(0, 9).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
