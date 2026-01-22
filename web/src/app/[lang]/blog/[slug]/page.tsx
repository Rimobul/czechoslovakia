import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Language, languages, t, formatDate } from '@/lib/i18n';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { mdxComponents } from '@/components/mdx/MDXComponents';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const lang of languages) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang: langParam, slug } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const post = await getBlogPost(slug, lang);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-8">
      {/* Featured Image */}
      <div className="relative h-[40vh] min-h-[300px] mb-8">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-content mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="font-sans text-sm px-3 py-1 bg-gray-100 text-secondary rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          <span className="text-secondary">·</span>

          {/* Author and Date */}
          <span className="font-sans text-sm text-secondary">
            {t(lang, 'blog.by')} {post.author}
          </span>

          <span className="text-secondary">·</span>

          <span className="font-sans text-sm text-secondary">
            {formatDate(post.date, lang)}
          </span>
        </div>

        {/* Content */}
        <div className="prose">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href={`/${lang}/blog`}
            className="font-sans text-accent-link hover:underline"
          >
            {t(lang, 'blog.backToBlog')}
          </Link>
        </div>
      </div>
    </article>
  );
}
