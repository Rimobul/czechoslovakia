import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ExternalItem {
  id: string;
  type: 'article' | 'video';
  title: string;
  source: string;
  url: string;
  thumbnail: string;
  dateAdded: string;
  categories: string[];
  description: string;
}

interface ExternalJson {
  items: ExternalItem[];
}

export async function getExternalContent(): Promise<ExternalItem[]> {
  const externalJsonPath = path.join(contentDirectory, 'external', 'external-content.json');
  
  if (!fs.existsSync(externalJsonPath)) {
    return [];
  }
  
  const externalJson: ExternalJson = JSON.parse(fs.readFileSync(externalJsonPath, 'utf-8'));
  
  // Sort by date descending
  return externalJson.items.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}
