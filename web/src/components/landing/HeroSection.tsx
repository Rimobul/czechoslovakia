'use client';

import Image from 'next/image';
import { useTheme } from '@/components/layout/ThemeProvider';

interface HeroSectionProps {
  heroTitle: string;
  heroSubtitle: string;
}

export default function HeroSection({ heroTitle, heroSubtitle }: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/images/logo-light.svg' : '/images/logo-dark.svg';
  const overlayClass = resolvedTheme === 'dark' 
    ? 'bg-black/80' 
    : 'bg-white/80';

  return (
    <section className="relative h-screen min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/ncsHeroBackground.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      
      {/* Semi-transparent Overlay (80% transparency = 20% opacity) */}
      <div className={`absolute inset-0 ${overlayClass}`} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Logo - 20% of viewport width with auto height */}
        <div className="w-[30vw] min-w-[80px] max-w-[1200px] mb-6">
          <Image
            src={logoSrc}
            alt="New Czechoslovakia Logo"
            width={1200}
            height={1200}
            className="w-full h-auto"
            priority
          />
        </div>
        
        {/* Title */}
        <h1>
          {heroTitle}
        </h1>
        
        {/* Subtitle */}
        <h2>
          {heroSubtitle}
        </h2>
      </div>
    </section>
  );
}
