'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language, t } from '@/lib/i18n';

interface MobileNavProps {
  lang: Language;
}

export default function MobileNav({ lang }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { key: 'home', href: `/${lang}`, label: t(lang, 'common.home'), icon: '🏠' },
    { key: 'blog', href: `/${lang}/blog`, label: t(lang, 'common.blog'), icon: '📝' },
    { key: 'maps', href: `/${lang}/maps`, label: t(lang, 'common.maps'), icon: '🗺️' },
    { key: 'external', href: `/${lang}/external`, label: t(lang, 'common.external'), icon: '🔗' },
    { key: 'about', href: `/${lang}/about`, label: t(lang, 'common.about'), icon: '👤' },
    { key: 'lang', href: '#lang', label: lang.toUpperCase(), icon: '🌐' },
  ];

  return (
    <nav className="mobile-nav sm:hidden">
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
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
              className={`flex flex-col items-center justify-center px-4 py-3 min-w-[70px] no-underline ${
                isActive ? 'text-accent-link' : 'text-secondary'
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="font-sans text-xs">{item.label}</span>
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
      className="flex flex-col items-center justify-center px-4 py-3 min-w-[70px] text-secondary"
    >
      <span className="text-lg mb-1">🌐</span>
      <span className="font-sans text-xs uppercase">{lang}</span>
    </button>
  );
}
