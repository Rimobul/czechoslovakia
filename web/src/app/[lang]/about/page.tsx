import Image from 'next/image';
import { Language, languages, t } from '@/lib/i18n';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function AboutPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = languages.includes(langParam as Language) ? (langParam as Language) : 'cs';

  const content = getAboutContent(lang);

  return (
    <div className="py-16 px-4">
      <div className="max-w-narrow mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t(lang, 'about.title')}
        </h1>

        {/* Author Photo */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 rounded-full overflow-hidden grayscale">
            <Image
              src="/images/author.svg"
              alt="Author"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* About Me */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {t(lang, 'about.aboutMe')}
          </h2>
          <p className="leading-relaxed">
            {content.aboutMe}
          </p>
        </section>

        {/* Why This Project */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {t(lang, 'about.whyProject')}
          </h2>
          <p className="leading-relaxed">
            {content.whyProject}
          </p>
        </section>

        {/* Acknowledgments */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            {t(lang, 'about.acknowledgments')}
          </h2>
          <p className="leading-relaxed">
            {content.acknowledgments}
          </p>
        </section>
      </div>
    </div>
  );
}

function getAboutContent(lang: Language) {
  const content = {
    cs: {
      aboutMe: 'Jsem datový nadšenec s kořeny v Česku i na Slovensku. Vyrostl jsem na pomezí obou kultur a vždy mě fascinovaly podobnosti i rozdíly mezi těmito dvěma národy, které kdysi tvořily jeden stát.',
      whyProject: 'Po sametovém rozvodu v roce 1993 se Česko a Slovensko vydaly každé svou cestou, přesto si zachovaly blízké vztahy. Tyto stránky mají za cíl prozkoumat, jak se oba národy vyvíjely – prostřednictvím dat, map a příběhů. Ať už pocházíte z jedné z těchto zemí, nebo vás střední Evropa jednoduše zajímá, doufám, že zde najdete něco zajímavého.',
      acknowledgments: 'Tyto webové stránky byly vytvořeny s pomocí GitHub Copilot, AI programovacího asistenta. Mapy a vizualizace využívají data z různých veřejných zdrojů včetně Eurostatu, Českého statistického úřadu a Štatistického úradu Slovenskej republiky.',
    },
    sk: {
      aboutMe: 'Som dátový nadšenec s koreňmi v Česku aj na Slovensku. Vyrastal som na pomedzí oboch kultúr a vždy ma fascinovali podobnosti aj rozdiely medzi týmito dvoma národmi, ktoré kedysi tvorili jeden štát.',
      whyProject: 'Po zamatovom rozvode v roku 1993 sa Česko a Slovensko vydali každé svojou cestou, napriek tomu si zachovali blízke vzťahy. Tieto stránky majú za cieľ preskúmať, ako sa oba národy vyvíjali – prostredníctvom dát, máp a príbehov. Či už pochádzate z jednej z týchto krajín, alebo vás stredná Európa jednoducho zaujíma, dúfam, že tu nájdete niečo zaujímavé.',
      acknowledgments: 'Tieto webové stránky boli vytvorené s pomocou GitHub Copilot, AI programovacieho asistenta. Mapy a vizualizácie využívajú dáta z rôznych verejných zdrojov vrátane Eurostatu, Českého štatistického úradu a Štatistického úradu Slovenskej republiky.',
    },
    en: {
      aboutMe: "I'm a data enthusiast with roots in both Czechia and Slovakia. Having grown up experiencing both cultures, I've always been fascinated by the similarities and differences between these two nations that once formed a single country.",
      whyProject: 'After the Velvet Divorce in 1993, Czechia and Slovakia took different paths while maintaining close ties. This website aims to explore how these two nations have evolved—through data, maps, and stories. Whether you\'re from one of these countries or simply curious about Central Europe, I hope you\'ll find something interesting here.',
      acknowledgments: 'This website was built with assistance from GitHub Copilot, an AI programming assistant. The maps and visualizations use data from various public sources including Eurostat, Czech Statistical Office, and Statistical Office of the Slovak Republic.',
    },
  };

  return content[lang];
}
