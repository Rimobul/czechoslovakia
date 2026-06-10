/**
 * Parser registry - registers all source-specific and feed-specific parsers
 */

import { SourceParser } from '../types';
import { novinkyCzParser } from './novinky-cz';
import { aktualitySkParser } from './aktuality-sk';
import { denikCzParser } from './denik-cz';
import { denikNCzParser } from './denikn-cz';
import { dennikNSkParser } from './dennikn-sk';
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
  PARSERS.set('HN.cz', hnCzParser);
  PARSERS.set('Lidovky.cz', lidovkyCzParser);
  PARSERS.set('ČTK', ctkParser);

  // iDNES.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=prahah', makeFixedBucketParser('iDNES.cz', ['bucket-1']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=usti', makeFixedBucketParser('iDNES.cz', ['bucket-1']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=brnoh', makeFixedBucketParser('iDNES.cz', ['bucket-2']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=jihlava', makeFixedBucketParser('iDNES.cz', ['bucket-2']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=budejovice', makeFixedBucketParser('iDNES.cz', ['bucket-6']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=vary', makeFixedBucketParser('iDNES.cz', ['bucket-6']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=plzen', makeFixedBucketParser('iDNES.cz', ['bucket-6']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=hradec', makeFixedBucketParser('iDNES.cz', ['bucket-9']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=liberec', makeFixedBucketParser('iDNES.cz', ['bucket-9']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=pardubice', makeFixedBucketParser('iDNES.cz', ['bucket-9']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=olomouc', makeFixedBucketParser('iDNES.cz', ['bucket-7']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ostrava', makeFixedBucketParser('iDNES.cz', ['bucket-7']));
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zlin', makeFixedBucketParser('iDNES.cz', ['bucket-7']));

  // iDNES.cz national feeds — bucket-5 conditional on category domain
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=zpravodaj', iDnesDomesticParser);
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=sport', iDnesDomesticParser);
  FEED_PARSERS.set('https://servis.idnes.cz/rss.aspx?c=ekonomikah', iDnesDomesticParser);

  // iRozhlas.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/53499', makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56511', makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/58038', makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/102217', makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/106781', makeFixedBucketParser('iRozhlas.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72127', makeFixedBucketParser('iRozhlas.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/84285', makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/56358', makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/85487', makeFixedBucketParser('iRozhlas.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/167727', makeFixedBucketParser('iRozhlas.cz', ['bucket-2']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/72476', makeFixedBucketParser('iRozhlas.cz', ['bucket-2']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/59685', makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86021', makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));
  FEED_PARSERS.set('https://www.irozhlas.cz/rss/irozhlas/tag/86697', makeFixedBucketParser('iRozhlas.cz', ['bucket-7']));

  // iRozhlas.cz national feed — bucket-5
  FEED_PARSERS.set(
    'https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov',
    makeFixedBucketParser('iRozhlas.cz', ['bucket-5'])
  );

  // Aktualne.cz regional feeds — bucket fixed by feed URL
  FEED_PARSERS.set('https://www.aktualne.cz/rss/jihocesky', makeFixedBucketParser('Aktualne.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/jihomoravsky', makeFixedBucketParser('Aktualne.cz', ['bucket-2']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/karlovarsky', makeFixedBucketParser('Aktualne.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/vysocina', makeFixedBucketParser('Aktualne.cz', ['bucket-2']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/kralovehradecky', makeFixedBucketParser('Aktualne.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/liberecky', makeFixedBucketParser('Aktualne.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/moravskoslezsky', makeFixedBucketParser('Aktualne.cz', ['bucket-7']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/olomoucky', makeFixedBucketParser('Aktualne.cz', ['bucket-7']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/pardubicky', makeFixedBucketParser('Aktualne.cz', ['bucket-9']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/plzensky', makeFixedBucketParser('Aktualne.cz', ['bucket-6']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/praha', makeFixedBucketParser('Aktualne.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/stredocesky', makeFixedBucketParser('Aktualne.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/ustecky', makeFixedBucketParser('Aktualne.cz', ['bucket-1']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/zlinsky', makeFixedBucketParser('Aktualne.cz', ['bucket-7']));

  // Aktualne.cz national feeds — bucket-5
  FEED_PARSERS.set('https://www.aktualne.cz/rss/domaci', makeFixedBucketParser('Aktualne.cz', ['bucket-5']));
  FEED_PARSERS.set('https://www.aktualne.cz/rss/ceska-ekonomika', makeFixedBucketParser('Aktualne.cz', ['bucket-5']));
}
