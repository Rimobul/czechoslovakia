import Link from 'next/link';
import { Language, languages, t } from '@/lib/i18n';
import { getBlogPosts } from '@/lib/blog';
import { getMaps } from '@/lib/maps';
import BlogCard from '@/components/blog/BlogCard';
import MapCard from '@/components/maps/MapCard';
import HeroSection from '@/components/landing/HeroSection';

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
      <HeroSection
        heroTitle={t(lang, 'landing.heroTitle')}
        heroSubtitle={t(lang, 'landing.heroSubtitle')}
      />

      {/* Introduction */}
      <section className="h-screen min-h-[500px] flex items-center justify-center px-4">
        <div className="w-[50%] sm:w-[80%] mx-auto text-center">
          <p className="leading-relaxed text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2rem]">
            {t(lang, 'landing.intro')}
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="h-screen min-h-[600px] flex flex-col items-center justify-center px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              {t(lang, 'landing.latestArticles')}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-10">
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
        <section className="h-screen min-h-[600px] flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
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
