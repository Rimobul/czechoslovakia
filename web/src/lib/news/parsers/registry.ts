/**
 * Parser registry - registers all source-specific and feed-specific parsers
 */

import { SourceParser } from '../types';
import { novinkyCzParser } from './novinky-cz';
import { aktualitySkParser } from './aktuality-sk';
import { denikCzParser } from './denik-cz';
import { denikNCzParser } from './denikn-cz';
import { dennikNSkParser } from './dennikn-sk';
import { smeSkParser } from './sme-sk';
import { topkySkParser } from './topky-sk';
import { hnonlineSkParser } from './hnonline-sk';
import { hnCzParser } from './hn-cz';
import { lidovkyCzParser } from './lidovky-cz';
import { ctkParser } from './ctk';
import { iDnesDomesticParser, makeFixedBucketParser } from './idnes';

// Map of parsers by source name (fallback when no per-URL parser exists)
export const PARSERS: Map<string, SourceParser> = new Map();

// Map of parsers by feed URL (takes precedence over PARSERS)
export const FEED_PARSERS: Map<string, SourceParser> = new Map();

/**
 * Initialize all parser registrations
 */
export function registerParsers(): void {
  // Source-based parsers (fallback)
  PARSERS.set('Novinky.cz', novinkyCzParser);
  PARSERS.set('Seznam Zpravy', novinkyCzParser); // Reuse Novinky.cz parser
  PARSERS.set('Aktuality.sk', aktualitySkParser);
  PARSERS.set('Denik.cz', denikCzParser);
  PARSERS.set('Denik N.cz', denikNCzParser);
  PARSERS.set('Dennik N', dennikNSkParser);
  PARSERS.set('SME.sk', smeSkParser);
  PARSERS.set('Topky.sk', topkySkParser);
  PARSERS.set('HNonline.sk', hnonlineSkParser);
  PARSERS.set('HN.cz', hnCzParser);
  PARSERS.set('Lidovky.cz', lidovkyCzParser);
  PARSERS.set('ČTK', ctkParser);

  // iDNES.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=prahah', makeFixedBucketParser('iDNES.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=usti', makeFixedBucketParser('iDNES.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=brnoh', makeFixedBucketParser('iDNES.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=jihlava', makeFixedBucketParser('iDNES.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=budejovice', makeFixedBucketParser('iDNES.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=vary', makeFixedBucketParser('iDNES.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=plzen', makeFixedBucketParser('iDNES.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=hradec', makeFixedBucketParser('iDNES.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=liberec', makeFixedBucketParser('iDNES.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=pardubice', makeFixedBucketParser('iDNES.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=olomouc', makeFixedBucketParser('iDNES.cz', ['severni-morava']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ostrava', makeFixedBucketParser('iDNES.cz', ['severni-morava']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zlin', makeFixedBucketParser('iDNES.cz', ['severni-morava']));

  // iDNES.cz national feeds — cesko-slovensko conditional on category domain
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zpravodaj', iDnesDomesticParser);
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=sport', iDnesDomesticParser);
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ekonomikah', iDnesDomesticParser);

  // iRozhlas.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/53499', makeFixedBucketParser('iRozhlas.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56511', makeFixedBucketParser('iRozhlas.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/58038', makeFixedBucketParser('iRozhlas.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/102217', makeFixedBucketParser('iRozhlas.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/106781', makeFixedBucketParser('iRozhlas.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72127', makeFixedBucketParser('iRozhlas.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/84285', makeFixedBucketParser('iRozhlas.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56358', makeFixedBucketParser('iRozhlas.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/85487', makeFixedBucketParser('iRozhlas.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/167727', makeFixedBucketParser('iRozhlas.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72476', makeFixedBucketParser('iRozhlas.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/59685', makeFixedBucketParser('iRozhlas.cz', ['severni-morava']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86021', makeFixedBucketParser('iRozhlas.cz', ['severni-morava']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86697', makeFixedBucketParser('iRozhlas.cz', ['severni-morava']));

  // iRozhlas.cz national feed — cesko-slovensko
  FEED_PARSERS.set(
    'https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov',
    makeFixedBucketParser('iRozhlas.cz', ['cesko-slovensko'])
  );

  // Aktualne.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://www.aktualne.cz/rss/jihocesky', makeFixedBucketParser('Aktualne.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/jihomoravsky', makeFixedBucketParser('Aktualne.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/karlovarsky', makeFixedBucketParser('Aktualne.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/vysocina', makeFixedBucketParser('Aktualne.cz', ['jizni-morava']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/kralovehradecky', makeFixedBucketParser('Aktualne.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/liberecky', makeFixedBucketParser('Aktualne.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/moravskoslezsky', makeFixedBucketParser('Aktualne.cz', ['severni-morava']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/olomoucky', makeFixedBucketParser('Aktualne.cz', ['severni-morava']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/pardubicky', makeFixedBucketParser('Aktualne.cz', ['vychodni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/plzensky', makeFixedBucketParser('Aktualne.cz', ['jizni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/praha', makeFixedBucketParser('Aktualne.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/stredocesky', makeFixedBucketParser('Aktualne.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/ustecky', makeFixedBucketParser('Aktualne.cz', ['zapadni-cechy']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/zlinsky', makeFixedBucketParser('Aktualne.cz', ['severni-morava']));

  // Aktualne.cz national feeds — cesko-slovensko
  FEED_PARSERS.set('https://www.aktualne.cz/rss/domaci', makeFixedBucketParser('Aktualne.cz', ['cesko-slovensko']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/ceska-ekonomika', makeFixedBucketParser('Aktualne.cz', ['cesko-slovensko']));

  // Pravda.sk regional feeds
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/bratislava/', makeFixedBucketParser('Pravda.sk', ['zapadne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/banska-bystrica/', makeFixedBucketParser('Pravda.sk', ['stredne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/kosice/', makeFixedBucketParser('Pravda.sk', ['vychodne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/nitra/', makeFixedBucketParser('Pravda.sk', ['zapadne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/presov/', makeFixedBucketParser('Pravda.sk', ['vychodne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/trencin/', makeFixedBucketParser('Pravda.sk', ['stredne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/trnava/', makeFixedBucketParser('Pravda.sk', ['zapadne-slovensko']));
  FEED_PARSERS.set('https://spravy.pravda.sk/regiony/rss/xml/zilina/', makeFixedBucketParser('Pravda.sk', ['stredne-slovensko']));

  // Pravda.sk domestic feeds — cesko-slovensko
  FEED_PARSERS.set('https://spravy.pravda.sk/domace/rss/xml/', makeFixedBucketParser('Pravda.sk', ['cesko-slovensko']));
  FEED_PARSERS.set('https://sportweb.pravda.sk/rss/xml/', makeFixedBucketParser('Pravda.sk', ['cesko-slovensko']));
  FEED_PARSERS.set('https://kultura.pravda.sk/rss/xml/', makeFixedBucketParser('Pravda.sk', ['cesko-slovensko']));
  FEED_PARSERS.set('https://ekonomika.pravda.sk/rss/xml/', makeFixedBucketParser('Pravda.sk', ['cesko-slovensko']));
}
