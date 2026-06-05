export interface ZennArticle {
  title: string;
  url: string;
  publishedAt: Date;
  tags: string[];
  description?: string;
  imageUrl?: string;
}

const ZENN_USERNAME = 'mizl';
const RSS_URL = `https://zenn.dev/${ZENN_USERNAME}/feed`;

function extractTagValues(xml: string): string[] {
  const tags: string[] = [];
  const categoryPattern = /<category>(.*?)<\/category>/g;
  let match;
  while ((match = categoryPattern.exec(xml)) !== null) {
    tags.push(match[1].trim());
  }
  return tags;
}

function extractItemXml(feedXml: string): string[] {
  const items: string[] = [];
  const itemPattern = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemPattern.exec(feedXml)) !== null) {
    items.push(match[1]);
  }
  return items;
}

function extractText(itemXml: string, tag: string): string {
  const pattern = new RegExp(`<${tag}(?:[^>]*)>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`, 's');
  const match = pattern.exec(itemXml);
  return match ? match[1].trim() : '';
}

function extractEnclosureUrl(itemXml: string): string | undefined {
  const match = /<enclosure[^>]+url="([^"]+)"/.exec(itemXml);
  return match ? match[1] : undefined;
}

function parseItem(itemXml: string): ZennArticle | null {
  const title = extractText(itemXml, 'title');
  const url = extractText(itemXml, 'link') || extractText(itemXml, 'guid');
  const pubDateStr = extractText(itemXml, 'pubDate');
  const description = extractText(itemXml, 'description') || undefined;
  const tags = extractTagValues(itemXml);
  const imageUrl = extractEnclosureUrl(itemXml);

  if (!title || !url) return null;

  const publishedAt = pubDateStr ? new Date(pubDateStr) : new Date(0);

  return { title, url, publishedAt, tags, description, imageUrl };
}

export async function fetchZennArticles(): Promise<ZennArticle[]> {
  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      console.warn(`[zenn] RSS fetch failed: ${response.status} ${response.statusText}`);
      return [];
    }
    const xml = await response.text();
    return extractItemXml(xml)
      .map(parseItem)
      .filter((a): a is ZennArticle => a !== null);
  } catch (err) {
    console.warn('[zenn] RSS fetch error:', err);
    return [];
  }
}
