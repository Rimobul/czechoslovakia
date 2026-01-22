import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Language, languages, t, formatDate } from '@/lib/i18n';
import { getMap, getAllMapSlugs } from '@/lib/maps';
import { mdxComponents } from '@/components/mdx/MDXComponents';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllMapSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export default async function MapDetailPage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const map = await getMap(slug, lang);

  if (!map) {
    notFound();
  }

  return (
    <article className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          {map.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-secondary mb-4">
          {map.description}
        </p>

        {/* Date */}
        <p className="font-sans text-sm text-secondary mb-8">
          {t(lang, 'maps.addedOn')} {formatDate(map.dateAdded, lang)}
        </p>

        {/* Map Embed */}
        <div className="w-full border border-border rounded overflow-hidden mb-8">
          <iframe
            src={map.embedUrl}
            title={map.title}
            width="100%"
            height="500"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        </div>

        {/* Extended Content */}
        {map.content && (
          <div className="prose mt-8 pt-8 border-t border-border">
            <MDXRemote source={map.content} components={mdxComponents} />
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href={`/${lang}/maps`}
            className="font-sans text-accent-link hover:underline"
          >
            {t(lang, 'maps.backToMaps')}
          </Link>
        </div>
      </div>
    </article>
  );
}
