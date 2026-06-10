import { NewsCardItem } from '@/lib/news';

interface NewsCardProps {
  item: NewsCardItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="border border-border-primary bg-neutral-secondary overflow-hidden h-full transition-colors hover:bg-[var(--color-card-bg-hover)]">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline h-full"
      >
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

        <div className="p-4 md:p-5">
          <div className="font-sans text-xs text-text-secondary mb-2">{item.source}</div>
          <h3 className="font-sans text-lg text-text-primary leading-tight mb-3">{item.title}</h3>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.intro}</p>
        </div>
      </a>
    </article>
  );
}
