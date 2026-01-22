import Link from 'next/link';
import Image from 'next/image';
import { ExternalItem } from '@/lib/external';
import { Language, formatDate } from '@/lib/i18n';

interface ExternalCardProps {
  item: ExternalItem;
  lang: Language;
}

export default function ExternalCard({ item, lang }: ExternalCardProps) {
  return (
    <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <div className="aspect-video relative bg-gray-100">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                ▶
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          {/* Type and Source */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`font-sans text-xs px-2 py-1 rounded ${
                item.type === 'video'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-secondary'
              }`}
            >
              {item.type === 'video' ? 'VIDEO' : 'ARTICLE'}
            </span>
            <span className="font-sans text-xs text-secondary">
              {item.source}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-lg text-primary mb-2 line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-secondary mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {item.categories.map((cat) => (
              <span
                key={cat}
                className="font-sans text-xs text-secondary"
              >
                #{cat}
              </span>
            ))}
          </div>

          {/* Date */}
          <div className="font-sans text-xs text-secondary">
            {formatDate(item.dateAdded, lang)}
          </div>
        </div>
      </Link>
    </article>
  );
}
