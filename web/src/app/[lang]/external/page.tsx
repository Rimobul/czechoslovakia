import { Language, languages, t } from '@/lib/i18n';
import { getExternalContent } from '@/lib/external';
import ExternalCard from '@/components/external/ExternalCard';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function ExternalPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const items = await getExternalContent();

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          {t(lang, 'external.title')}
        </h1>

        <p className="text-center text-secondary mb-4 max-w-2xl mx-auto">
          {t(lang, 'external.intro')}
        </p>

        {/* Notice about non-translated content */}
        <div className="bg-blue-50 border-l-4 border-accent-link p-4 mb-12 max-w-2xl mx-auto">
          <p className="font-sans text-sm text-secondary">
            ℹ️ {t(lang, 'external.notTranslated')}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-secondary">
            No external content yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ExternalCard key={item.id} item={item} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
