'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t, getLanguageDisplayName, languages } from '@/lib/i18n';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  lang: Language;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: `/${lang}`, label: t(lang, 'common.home') },
    { key: 'news', href: `/${lang}/news`, label: t(lang, 'common.news') },
    { key: 'blog', href: `/${lang}/blog`, label: t(lang, 'common.blog') },
    { key: 'maps', href: `/${lang}/maps`, label: t(lang, 'common.maps') },
    { key: 'external', href: `/${lang}/external`, label: t(lang, 'common.external') },
    { key: 'about', href: `/${lang}/about`, label: t(lang, 'common.about') },
  ];

  const switchLanguage = (newLang: Language) => {
    // Replace current language in path with new language
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    document.cookie = `preferred_lang=${newLang}; path=/; max-age=31536000`;
    window.location.href = newPath;
  };

  return (
    <header
      className="hidden sm:block sticky top-0 left-1/2 -translate-x-1/2 border-b border-border-primary z-50 w-screen max-w-none supports-[backdrop-filter]:backdrop-blur-md"
      style={{ backgroundColor: 'var(--color-menu-overlay)' }}
    >
      <div className="w-full px-6">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center h-16 w-full gap-6">
          <Link href={`/${lang}`} className="font-sans font-medium text-xl text-text-primary no-underline hover:no-underline">
            NČS
          </Link>

          <div className="grid grid-cols-6 items-center w-full min-w-0">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-sans text-xs lg:text-sm text-center no-underline hover:text-accent-primary transition-colors px-2 lg:px-3 py-2 w-full whitespace-nowrap ${
                  pathname === item.href || (item.key !== 'home' && pathname.startsWith(item.href))
                    ? 'text-accent-primary font-medium'
                    : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Switcher */}
            <ThemeSwitcher lang={lang} />

            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`font-sans text-xs lg:text-sm text-center no-underline transition-opacity px-2 lg:px-3 py-2 inline-flex items-center whitespace-nowrap bg-transparent border-0 rounded-none appearance-none ${
                  langMenuOpen ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ color: 'var(--color-accent-primary)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 0 20" />
                  <path d="M12 2a15.3 15.3 0 0 0 0 20" />
                </svg>
                <span className="ml-2 uppercase">{lang}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-neutral-secondary border border-border-secondary py-1 min-w-[120px]">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        switchLanguage(l);
                        setLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-sans text-sm hover:bg-white/10 ${
                        l === lang ? 'text-accent-primary font-medium' : 'text-text-secondary'
                      }`}
                    >
                      {getLanguageDisplayName(l)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
