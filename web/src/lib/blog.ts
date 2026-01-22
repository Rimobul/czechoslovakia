import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Language } from './i18n';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPostMeta {
  slug: string;
  title: string;
  author: string;
  date: string;
  categories: string[];
  thumbnail: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export async function getBlogPosts(lang: Language): Promise<BlogPostMeta[]> {
  const blogDir = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const folders = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  const posts: BlogPostMeta[] = [];
  
  for (const folder of folders) {
    let filePath = path.join(blogDir, folder, `${lang}.mdx`);
    
    // Fallback to Czech if language version doesn't exist
    if (!fs.existsSync(filePath)) {
      filePath = path.join(blogDir, folder, 'cs.mdx');
    }
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      posts.push({
        slug: folder,
        title: data.title || folder,
        author: data.author || 'Unknown',
        date: data.date || new Date().toISOString(),
        categories: data.categories || [],
        thumbnail: data.thumbnail || '/images/placeholder.jpg',
        excerpt: data.excerpt || '',
      });
    }
  }
  
  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string, lang: Language): Promise<BlogPost | null> {
  const blogDir = path.join(contentDirectory, 'blog', slug);
  
  let filePath = path.join(blogDir, `${lang}.mdx`);
  
  // Fallback to Czech if language version doesn't exist
  if (!fs.existsSync(filePath)) {
    filePath = path.join(blogDir, 'cs.mdx');
  }
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    title: data.title || slug,
    author: data.author || 'Unknown',
    date: data.date || new Date().toISOString(),
    categories: data.categories || [],
    thumbnail: data.thumbnail || '/images/placeholder.jpg',
    excerpt: data.excerpt || '',
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  const blogDir = path.join(contentDirectory, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  return fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}
