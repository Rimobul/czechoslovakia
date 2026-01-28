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
    <header className="hidden sm:block sticky top-0 bg-neutral-primary border-b border-border-primary z-50 w-full">
      <div className="w-full px-6">
        <nav className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="font-sans font-medium text-xl text-text-primary no-underline hover:no-underline">
            NČS
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-sans text-sm no-underline hover:text-accent-primary transition-colors ${
                  pathname === item.href || (item.key !== 'home' && pathname.startsWith(item.href))
                    ? 'text-accent-primary font-medium'
                    : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Switcher */}
            <ThemeSwitcher lang={lang} />

            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="font-sans text-sm text-text-secondary hover:text-accent-primary uppercase"
              >
                {lang}
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
