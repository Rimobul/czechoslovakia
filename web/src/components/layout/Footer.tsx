import Link from 'next/link';
import { Language, t } from '@/lib/i18n';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const navItems = [
    { href: `/${lang}`, label: t(lang, 'common.home') },
    { href: `/${lang}/blog`, label: t(lang, 'common.blog') },
    { href: `/${lang}/maps`, label: t(lang, 'common.maps') },
    { href: `/${lang}/external`, label: t(lang, 'common.external') },
    { href: `/${lang}/about`, label: t(lang, 'common.about') },
  ];

  return (
    <footer className="h-[50vh] min-h-[300px] border-t border-border flex items-center justify-center bg-gray-50">
      <div className="max-w-content mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-secondary hover:text-accent-link no-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* About Authors */}
          <p className="text-sm text-secondary text-center max-w-md">
            {t(lang, 'footer.madeWith')} GitHub Copilot
          </p>

          {/* Copyright */}
          <p className="font-sans text-xs text-secondary">
            {t(lang, 'footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
