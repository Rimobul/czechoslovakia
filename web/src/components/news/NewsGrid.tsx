'use client';

import useSWR from 'swr';
import { Language, t } from '@/lib/i18n';
import { newsFetcher } from '@/lib/news/client-cache';
import NewsCard from '@/components/news/NewsCard';

interface NewsGridProps {
  lang: Language;
}

function NewsCardSkeleton() {
  return (
    <article className="border border-border-primary bg-neutral-secondary overflow-hidden h-full animate-pulse flex flex-col">
      <div className="bg-neutral-primary px-3 py-2 h-5" />
      <div className="aspect-video bg-neutral-primary" />
      <div className="p-4 md:p-5 space-y-3 flex-grow">
        <div className="h-3 bg-neutral-primary rounded w-1/4" />
        <div className="h-5 bg-neutral-primary rounded w-full" />
        <div className="h-5 bg-neutral-primary rounded w-3/4" />
        <div className="h-4 bg-neutral-primary rounded w-full" />
        <div className="h-4 bg-neutral-primary rounded w-5/6" />
      </div>
    </article>
  );
}

export default function NewsGrid({ lang }: NewsGridProps) {
  const { data: items, error, isLoading } = useSWR('news-grid', newsFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // dedupingInterval is intentionally omitted (defaults to 2 s).
    // The fetcher is cheap — it reads from localStorage and randomizes in JS —
    // so re-running it on every mount is fine and gives a fresh card selection.
  });

  if (error) {
    return <p className="text-center text-text-secondary">{t(lang, 'news.error')}</p>;
  }

  if (isLoading || !items) {
    return (
      <div className="news-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-center text-text-secondary">{t(lang, 'news.empty')}</p>;
  }

  return (
    <div className="news-grid">
      {items.slice(0, 9).map((item) => (
        <NewsCard key={item.id} item={item} lang={lang} />
      ))}
    </div>
  );
}
