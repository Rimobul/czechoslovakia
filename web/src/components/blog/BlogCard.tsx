import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';
import { Language, formatDate } from '@/lib/i18n';

interface BlogCardProps {
  post: BlogPostMeta;
  lang: Language;
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  return (
    <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/${lang}/blog/${post.slug}`} className="no-underline">
        <div className="aspect-video relative bg-gray-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="font-sans text-xs px-2 py-1 bg-gray-100 text-secondary rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-lg text-primary mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-secondary mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="font-sans text-xs text-secondary">
            {post.author} · {formatDate(post.date, lang)}
          </div>
        </div>
      </Link>
    </article>
  );
}
