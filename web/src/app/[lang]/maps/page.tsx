import { Language, languages, t } from '@/lib/i18n';
import { getMaps } from '@/lib/maps';
import MapCard from '@/components/maps/MapCard';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function MapsPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const maps = await getMaps(lang);

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t(lang, 'maps.title')}
        </h1>

        {maps.length === 0 ? (
          <p className="text-center text-secondary">
            No maps yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {maps.map((map) => (
              <MapCard key={map.slug} map={map} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
