'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t, getLanguageDisplayName, languages } from '@/lib/i18n';
import { useState } from 'react';

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
    <header className="hidden sm:block sticky top-0 bg-white border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="font-sans font-bold text-xl text-primary no-underline hover:no-underline">
            NČS
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-sans text-sm no-underline hover:text-accent-link transition-colors ${
                  pathname === item.href || (item.key !== 'home' && pathname.startsWith(item.href))
                    ? 'text-accent-link font-medium'
                    : 'text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="font-sans text-sm text-secondary hover:text-accent-link uppercase"
              >
                {lang}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-border rounded shadow-lg py-1 min-w-[120px]">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        switchLanguage(l);
                        setLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 font-sans text-sm hover:bg-gray-50 ${
                        l === lang ? 'text-accent-link font-medium' : 'text-secondary'
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
