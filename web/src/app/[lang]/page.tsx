import Link from 'next/link';
import Image from 'next/image';
import { Language, languages, t } from '@/lib/i18n';
import { getBlogPosts } from '@/lib/blog';
import { getMaps } from '@/lib/maps';
import BlogCard from '@/components/blog/BlogCard';
import MapCard from '@/components/maps/MapCard';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LandingPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const posts = await getBlogPosts(lang);
  const latestPosts = posts.slice(0, 3);

  const maps = await getMaps(lang);
  const latestMap = maps[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center bg-gray-900">
        <Image
          src="/images/hero.svg"
          alt="Czechoslovakia"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {t(lang, 'landing.heroTitle')}
          </h1>
          <p className="text-xl sm:text-2xl font-sans opacity-90">
            {t(lang, 'landing.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-narrow mx-auto text-center">
          <p className="text-lg leading-relaxed">
            {t(lang, 'landing.intro')}
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t(lang, 'landing.latestArticles')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${lang}/blog`}
                className="inline-block font-sans text-accent-link hover:underline"
              >
                {t(lang, 'landing.viewAllArticles')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Map */}
      {latestMap && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t(lang, 'landing.latestMap')}
            </h2>
            <MapCard map={latestMap} lang={lang} />
            <div className="text-center mt-8">
              <Link
                href={`/${lang}/maps`}
                className="inline-block font-sans text-accent-link hover:underline"
              >
                {t(lang, 'landing.viewAllMaps')}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
