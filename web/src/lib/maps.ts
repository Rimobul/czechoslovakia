import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Language } from './i18n';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MapMeta {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  embedType: string;
  embedUrl: string;
  dateAdded: string;
  hasExtendedContent: boolean;
}

export interface MapData extends MapMeta {
  content?: string;
}

interface MapsJson {
  maps: Array<{
    slug: string;
    embedType: string;
    embedUrl: string;
    thumbnail: string;
    dateAdded: string;
    hasExtendedContent: boolean;
  }>;
}

export async function getMaps(lang: Language): Promise<MapMeta[]> {
  const mapsJsonPath = path.join(contentDirectory, 'maps', 'maps.json');
  
  if (!fs.existsSync(mapsJsonPath)) {
    return [];
  }
  
  const mapsJson: MapsJson = JSON.parse(fs.readFileSync(mapsJsonPath, 'utf-8'));
  
  const maps: MapMeta[] = [];
  
  for (const mapEntry of mapsJson.maps) {
    let contentPath = path.join(contentDirectory, 'maps', 'content', mapEntry.slug, `${lang}.mdx`);
    
    // Fallback to Czech
    if (!fs.existsSync(contentPath)) {
      contentPath = path.join(contentDirectory, 'maps', 'content', mapEntry.slug, 'cs.mdx');
    }
    
    let title = mapEntry.slug;
    let description = '';
    
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath, 'utf-8');
      const { data } = matter(fileContent);
      title = data.title || mapEntry.slug;
      description = data.description || '';
    }
    
    maps.push({
      ...mapEntry,
      title,
      description,
    });
  }
  
  // Sort by date descending
  return maps.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
}

export async function getMap(slug: string, lang: Language): Promise<MapData | null> {
  const mapsJsonPath = path.join(contentDirectory, 'maps', 'maps.json');
  
  if (!fs.existsSync(mapsJsonPath)) {
    return null;
  }
  
  const mapsJson: MapsJson = JSON.parse(fs.readFileSync(mapsJsonPath, 'utf-8'));
  const mapEntry = mapsJson.maps.find(m => m.slug === slug);
  
  if (!mapEntry) {
    return null;
  }
  
  let contentPath = path.join(contentDirectory, 'maps', 'content', slug, `${lang}.mdx`);
  
  // Fallback to Czech
  if (!fs.existsSync(contentPath)) {
    contentPath = path.join(contentDirectory, 'maps', 'content', slug, 'cs.mdx');
  }
  
  let title = slug;
  let description = '';
  let content = '';
  
  if (fs.existsSync(contentPath)) {
    const fileContent = fs.readFileSync(contentPath, 'utf-8');
    const { data, content: mdxContent } = matter(fileContent);
    title = data.title || slug;
    description = data.description || '';
    content = mdxContent;
  }
  
  return {
    ...mapEntry,
    title,
    description,
    content: mapEntry.hasExtendedContent ? content : undefined,
  };
}

export function getAllMapSlugs(): string[] {
  const mapsJsonPath = path.join(contentDirectory, 'maps', 'maps.json');
  
  if (!fs.existsSync(mapsJsonPath)) {
    return [];
  }
  
  const mapsJson: MapsJson = JSON.parse(fs.readFileSync(mapsJsonPath, 'utf-8'));
  return mapsJson.maps.map(m => m.slug);
}
