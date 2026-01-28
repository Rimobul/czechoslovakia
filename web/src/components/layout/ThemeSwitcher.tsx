'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from './ThemeProvider';
import { Language, t } from '@/lib/i18n';

interface ThemeSwitcherProps {
  lang: Language;
}

const themeIcons = {
  light: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  ),
  dark: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <line x1="8" x2="16" y1="21" y2="21"/>
      <line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
  ),
};

export default function ThemeSwitcher({ lang }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { value: Theme; label: string }[] = [
    { value: 'light', label: t(lang, 'theme.light') },
    { value: 'dark', label: t(lang, 'theme.dark') },
    { value: 'system', label: t(lang, 'theme.system') },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 text-text-secondary hover:text-accent-primary transition-colors"
        aria-label={t(lang, 'theme.toggle')}
        title={t(lang, 'theme.toggle')}
      >
        {themeIcons[theme]}
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 bg-neutral-secondary border border-border-secondary py-1 min-w-[140px] z-50">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 font-sans text-sm hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 ${
                theme === option.value ? 'text-accent-primary font-medium' : 'text-text-secondary'
              }`}
            >
              <span className="w-5">{themeIcons[option.value]}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileThemeSwitcher({ lang }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  const themes: Theme[] = ['light', 'dark', 'system'];
  const currentIndex = themes.indexOf(theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const handleSwitch = () => {
    setTheme(nextTheme);
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return t(lang, 'theme.light');
      case 'dark': return t(lang, 'theme.dark');
      case 'system': return t(lang, 'theme.system');
    }
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex flex-col items-center justify-center px-4 py-3 min-w-[70px] text-text-secondary"
      aria-label={t(lang, 'theme.toggle')}
    >
      <span className="text-lg mb-1">{themeIcons[theme]}</span>
      <span className="font-sans text-xs">{getLabel()}</span>
    </button>
  );
}
