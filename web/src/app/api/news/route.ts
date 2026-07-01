import { NextResponse } from 'next/server';
import { fetchAllFeedItems } from '@/lib/news/fetch';
import { registerParsers } from '@/lib/news/parsers/registry';

export const dynamic = 'force-dynamic';

// Ensure parsers are registered before fetching
registerParsers();

export async function GET() {
  const items = await fetchAllFeedItems();
  return NextResponse.json(items);
}
