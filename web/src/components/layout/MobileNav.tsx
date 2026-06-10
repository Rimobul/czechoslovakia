'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t } from '@/lib/i18n';
import { MobileThemeSwitcher } from './ThemeSwitcher';

interface MobileNavProps {
  lang: Language;
}

export default function MobileNav({ lang }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { key: 'home', href: `/${lang}`, label: t(lang, 'common.home'), icon: 'home' },
    { key: 'news', href: `/${lang}/news`, label: t(lang, 'common.news'), icon: 'news' },
    { key: 'blog', href: `/${lang}/blog`, label: t(lang, 'common.blog'), icon: 'blog' },
    { key: 'maps', href: `/${lang}/maps`, label: t(lang, 'common.maps'), icon: 'maps' },
    { key: 'external', href: `/${lang}/external`, label: t(lang, 'common.external'), icon: 'external' },
    { key: 'about', href: `/${lang}/about`, label: t(lang, 'common.about'), icon: 'about' },
    { key: 'theme', href: '#theme', label: 'theme', icon: 'theme' },
    { key: 'lang', href: '#lang', label: lang.toUpperCase(), icon: 'lang' },
  ];

  return (
    <nav
      className="mobile-nav sm:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-screen max-w-none border-t border-border-primary z-50 supports-[backdrop-filter]:backdrop-blur-md"
      style={{ backgroundColor: 'var(--color-menu-overlay)' }}
    >
      <div className="grid grid-cols-8 w-screen">
        {navItems.map((item) => {
          if (item.key === 'theme') {
            return <MobileThemeSwitcher key={item.key} lang={lang} />;
          }

          if (item.key === 'lang') {
            return (
              <LangSwitcher key={item.key} lang={lang} pathname={pathname} />
            );
          }

          const isActive = pathname === item.href || 
            (item.key !== 'home' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center justify-center gap-2.5 px-3 py-4 min-h-[56px] no-underline ${
                isActive ? 'text-accent-primary' : 'text-accent-primary/80'
              }`}
            >
              <span className="inline-flex p-1" aria-hidden="true">
                <NavIcon name={item.icon as NavIconName} />
              </span>
              <span className="font-sans text-xs ml-1.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function LangSwitcher({ lang, pathname }: { lang: Language; pathname: string }) {
  const languages: Language[] = ['cs', 'sk', 'en'];
  const currentIndex = languages.indexOf(lang);
  const nextLang = languages[(currentIndex + 1) % languages.length];

  const handleSwitch = () => {
    const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);
    document.cookie = `preferred_lang=${nextLang}; path=/; max-age=31536000`;
    window.location.href = newPath;
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center justify-center gap-2.5 px-3 py-4 min-h-[56px] bg-transparent border-0 rounded-none appearance-none opacity-80 hover:opacity-100"
      style={{ color: 'var(--color-accent-primary)' }}
    >
      <span className="inline-flex p-1" aria-hidden="true">
        <NavIcon name="lang" />
      </span>
      <span className="font-sans text-xs uppercase ml-1.5">{lang}</span>
    </button>
  );
}

type NavIconName = 'home' | 'news' | 'blog' | 'maps' | 'external' | 'about' | 'lang';

function NavIcon({ name }: { name: NavIconName }) {
  const commonProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (name === 'home') {
    return (
      <svg {...commonProps}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    );
  }

  if (name === 'blog') {
    return (
      <svg {...commonProps}>
        <path d="M4 19.5V4.5h12l4 4v11z" />
        <path d="M16 4.5v4h4" />
        <line x1="8" y1="13" x2="16" y2="13" />
      </svg>
    );
  }

  if (name === 'news') {
    return (
      <svg {...commonProps}>
        <path d="M3 6h18v12H3z" />
        <line x1="7" y1="10" x2="17" y2="10" />
        <line x1="7" y1="14" x2="14" y2="14" />
      </svg>
    );
  }

  if (name === 'maps') {
    return (
      <svg {...commonProps}>
        <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z" />
        <line x1="9" y1="4" x2="9" y2="17.5" />
        <line x1="15" y1="6.5" x2="15" y2="20" />
      </svg>
    );
  }

  if (name === 'external') {
    return (
      <svg {...commonProps}>
        <path d="M14 4h6v6" />
        <path d="M20 4 10 14" />
        <path d="M20 14v6H4V4h6" />
      </svg>
    );
  }

  if (name === 'about') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  );
}
