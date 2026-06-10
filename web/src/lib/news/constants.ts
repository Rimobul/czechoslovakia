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
  // ČTK — national/regional feed
  { source: 'ČTK', url: 'https://www.ceskenoviny.cz/sluzby/rss/cr.php' },
  { source: 'Pravda.sk', url: 'https://spravy.pravda.sk/rss/xml/' },
  { source: 'Dennik N', url: 'https://dennikn.sk/feed/' },
  { source: 'HN.cz', url: 'https://archiv.hn.cz/?m=rss' },
];

export const ALLOWED_HOST_PARTS = [
  'novinky.cz',
  'aktuality.sk',
  'seznamzpravy.cz',
  'idnes.cz',
  'irozhlas.cz',
  'ceskenoviny.cz',
  'pravda.sk',
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
