import { Language, languages, t } from '@/lib/i18n';
import { getBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function BlogPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const posts = await getBlogPosts(lang);

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t(lang, 'blog.title')}
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-secondary">
            No articles yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
