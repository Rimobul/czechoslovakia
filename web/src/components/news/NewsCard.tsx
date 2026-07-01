import { NewsCardItem } from '@/lib/news';
import { getRegionLabel } from '@/lib/news/region-labels';
import { Language } from '@/lib/i18n';

interface NewsCardProps {
  item: NewsCardItem;
  lang: Language;
}

export default function NewsCard({ item, lang }: NewsCardProps) {
  const regionLabel = getRegionLabel(item.bucket, lang);

  return (
    <article className="border border-border-primary bg-neutral-secondary overflow-hidden h-full transition-colors hover:bg-[var(--color-card-bg-hover)]">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline h-full flex flex-col"
      >
        <div className="bg-black bg-opacity-60 text-white px-3 py-2 text-xs font-sans font-semibold">
          {regionLabel}
        </div>
        
        <div className="aspect-video bg-neutral-primary">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary font-sans text-xs uppercase tracking-wide">
              {item.source}
            </div>
          )}
        </div>

        <div className="p-4 md:p-5 flex-grow">
          <div className="font-sans text-xs text-text-secondary mb-2">{item.source}</div>
          <h3 className="font-sans text-lg text-text-primary leading-tight mb-3">{item.title}</h3>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.intro}</p>
        </div>
      </a>
    </article>
  );
}
