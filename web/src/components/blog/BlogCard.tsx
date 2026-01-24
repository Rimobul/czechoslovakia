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
    <article className="overflow-hidden bg-white/15 hover:bg-white/20 transition-colors">
      <Link href={`/${lang}/blog/${post.slug}`} className="no-underline">
        <div className="aspect-video relative bg-neutral-secondary">
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
                className="font-sans text-xs px-2 py-1 bg-white/20 text-text-primary"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-sans font-medium text-lg text-text-primary mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="font-sans text-xs text-text-secondary">
            {post.author} · {formatDate(post.date, lang)}
          </div>
        </div>
      </Link>
    </article>
  );
}
