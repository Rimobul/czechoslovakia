import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { Language, languages, t } from '@/lib/i18n';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = languages.includes(lang as Language) ? (lang as Language) : 'cs';

  return {
    title: t(validLang, 'landing.heroTitle'),
    description: t(validLang, 'landing.intro'),
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  const validLang = languages.includes(lang as Language) ? (lang as Language) : 'cs';

  return (
    <html lang={validLang}>
      <body className="min-h-screen flex flex-col">
        <Header lang={validLang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={validLang} />
        <MobileNav lang={validLang} />
      </body>
    </html>
  );
}
