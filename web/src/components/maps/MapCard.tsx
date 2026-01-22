import Link from 'next/link';
import Image from 'next/image';
import { MapMeta } from '@/lib/maps';
import { Language, formatDate } from '@/lib/i18n';

interface MapCardProps {
  map: MapMeta;
  lang: Language;
}

export default function MapCard({ map, lang }: MapCardProps) {
  return (
    <article className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/${lang}/maps/${map.slug}`} className="no-underline">
        <div className="aspect-video relative bg-gray-100">
          <Image
            src={map.thumbnail}
            alt={map.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          {/* Title */}
          <h3 className="font-sans font-bold text-lg text-primary mb-2">
            {map.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-secondary mb-3 line-clamp-2">
            {map.description}
          </p>

          {/* Meta */}
          <div className="font-sans text-xs text-secondary">
            {formatDate(map.dateAdded, lang)}
          </div>
        </div>
      </Link>
    </article>
  );
}
