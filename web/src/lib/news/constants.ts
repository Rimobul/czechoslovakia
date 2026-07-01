import { FeedSource, RegionBucket } from './types';

export const FEED_SOURCES: FeedSource[] = [
  { source: 'Novinky.cz', url: 'https://www.novinky.cz/rss' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/domace/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/krimi/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/ekonomika/' },
  { source: 'Aktuality.sk', url: 'https://www.aktuality.sk/rss/navyse/' },
  { source: 'Aktuality.sk', url: 'https://sport.aktuality.sk/api/rss' },
  { source: 'Seznam Zpravy', url: 'https://www.seznamzpravy.cz/rss' },
  // iDNES.cz — regional feeds (bucket pre-determined by feed URL)
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=prahah' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=usti' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=brnoh' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=jihlava' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=budejovice' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=vary' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=plzen' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=hradec' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=liberec' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=pardubice' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=olomouc' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=ostrava' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=zlin' },
  // iDNES.cz — national feeds (bucket-5 only when category domain contains "domaci")
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=zpravodaj' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=sport' },
  { source: 'iDNES.cz', url: 'https://servis.idnes.cz/rss.aspx?c=ekonomikah' },
  // iRozhlas.cz — regional feeds
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/53499' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/56511' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/58038' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/102217' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/106781' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/72127' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/84285' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/56358' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/85487' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/167727' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/72476' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/59685' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/86021' },
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/tag/86697' },
  // iRozhlas.cz — national feed (bucket-5)
  { source: 'iRozhlas.cz', url: 'https://www.irozhlas.cz/rss/irozhlas/section/zpravy-domov' },
  // Denik.cz — national/regional feeds (prefix-based regional parser)
  { source: 'Denik.cz', url: 'https://www.denik.cz/rss/podnikani.html' },
  { source: 'Denik.cz', url: 'https://www.denik.cz/rss/sport.html' },
  { source: 'Denik.cz', url: 'https://www.denik.cz/rss/zpravy.html' },
  // Lidovky.cz — single feed (domov-only items)
  { source: 'Lidovky.cz', url: 'https://servis.lidovky.cz/rss.aspx' },
  // Aktualne.cz — regional feeds
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/jihocesky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/jihomoravsky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/karlovarsky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/vysocina' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/kralovehradecky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/liberecky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/moravskoslezsky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/olomoucky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/pardubicky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/plzensky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/praha' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/stredocesky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/ustecky' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/zlinsky' },
  // Aktualne.cz — national feeds
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/domaci' },
  { source: 'Aktualne.cz', url: 'https://www.aktualne.cz/rss/ceska-ekonomika' },
  // DenikN.cz — domestic feeds (prefix-based regional parser)
  { source: 'Denik N.cz', url: 'https://denikn.cz/cesko/feed/' },
  { source: 'Denik N.cz', url: 'https://denikn.cz/tag/nazor/feed' },
  { source: 'Denik N.cz', url: 'https://denikn.cz/kultura/feed' },
  { source: 'Denik N.cz', url: 'https://denikn.cz/sport/feed' },
  // ČTK — national/regional feed
  { source: 'ČTK', url: 'https://www.ceskenoviny.cz/sluzby/rss/cr.php' },
  // HN.cz — domestic feeds (prefix-based regional parser)
  { source: 'HN.cz', url: 'https://domaci.hn.cz/?m=rss' },
  { source: 'HN.cz', url: 'https://byznys.hn.cz/?p=02R000_rss' },
  { source: 'HN.cz', url: 'https://investice.hn.cz/?m=rss' },
  // Pravda.sk — regional feeds (fixed bucket per URL)
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/bratislava/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/banska-bystrica/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/kosice/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/nitra/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/presov/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/trencin/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/trnava/' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/regiony/rss/xml/zilina/' },
  // Pravda.sk — domestic feeds (bucket-5)
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/domace/rss/xml/' },
  { source: 'Pravda.sk', url: 'https://sportweb.pravda.sk/rss/xml/' },
  { source: 'Pravda.sk', url: 'https://kultura.pravda.sk/rss/xml/' },
  { source: 'Pravda.sk', url: 'https://ekonomika.pravda.sk/rss/xml/' },
  // SME.sk — single feed (prefix-based regional parser with domov fallback)
  { source: 'SME.sk', url: 'https://www.sme.sk/rss-title' },
  // DennikN.sk — domestic feeds (prefix-based regional parser)
  { source: 'Dennik N', url: 'https://dennikn.sk/slovensko/feed/' },
  { source: 'Dennik N', url: 'https://dennikn.sk/ekonomika/feed' },
  { source: 'Dennik N', url: 'https://dennikn.sk/komentare/feed' },
  { source: 'Dennik N', url: 'https://dennikn.sk/kultura/feed' },
  { source: 'Dennik N', url: 'https://dennikn.sk/veda/feed' },
  // Topky.sk — domestic and regional feed (prefix-based regional parser)
  { source: 'Topky.sk', url: 'https://www.topky.sk/rss/10/Spravy_-_Domace.rss' },
  // HNonline.sk — domestic and regional feed (category-filtered, prefix-based regional parser)
  { source: 'HNonline.sk', url: 'https://hnonline.sk/feed' },
];

export const ALLOWED_HOST_PARTS = [
  'novinky.cz',
  'aktuality.sk',
  'seznamzpravy.cz',
  'idnes.cz',
  'irozhlas.cz',
  'denik.cz',
  'lidovky.cz',
  'aktualne.cz',
  'ceskenoviny.cz',
  'pravda.sk',
  'sme.sk',
  'dennikn.sk',
  'denikn.cz',
  'hn.cz',
];

export const REGION_BUCKETS: RegionBucket[] = [
  {
    id: 'bucket-1',
    terms: ['Ústecký', 'Středočeský', 'Praha', 'Hlavní město Praha'],
  },
  {
    id: 'bucket-2',
    terms: ['Vysočina', 'Jihomoravský'],
  },
  {
    id: 'bucket-3',
    terms: ['Bratislavský', 'Nitriansky', 'Trnavský'],
  },
  {
    id: 'bucket-4',
    terms: ['Košický', 'Prešovský'],
  },
  {
    id: 'bucket-5',
    terms: ['Česko', 'Slovensko', 'Czechia', 'Slovakia', 'Domácí'],
  },
  {
    id: 'bucket-6',
    terms: ['Jihočeský', 'Plzeňský', 'Karlovarský'],
  },
  {
    id: 'bucket-7',
    terms: ['Moravskoslezský', 'Olomoucký', 'Zlínský'],
  },
  {
    id: 'bucket-8',
    terms: ['Žilinský', 'Banskobystrický', 'Trenčiansky'],
  },
  {
    id: 'bucket-9',
    terms: ['Liberecký', 'Královéhradecký', 'Pardubický'],
  },
];
