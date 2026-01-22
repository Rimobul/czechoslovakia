import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={`callout callout-${type}`}>
      {children}
    </div>
  );
}

interface InteractiveMapProps {
  src: string;
  caption?: string;
  height?: number;
}

export function InteractiveMap({ src, caption, height = 400 }: InteractiveMapProps) {
  return (
    <figure className="my-8">
      <div className="w-full border border-border rounded overflow-hidden">
        <iframe
          src={src}
          title={caption || 'Interactive Map'}
          width="100%"
          height={height}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-secondary mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  InteractiveMap,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-secondary my-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent-link hover:underline" {...props} />
  ),
};
