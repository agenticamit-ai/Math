import { readFileSync } from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

export const NEWS_CATEGORIES = ["sports", "science", "space", "tech", "movies", "world"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

/** News category -> reader interest tag used for matching and blocking. */
export const CATEGORY_TOPIC: Record<NewsCategory, string> = {
  sports: "sports",
  science: "science",
  space: "space",
  tech: "tech",
  movies: "movies",
  world: "geography",
};

export type FeedConfig = { category: NewsCategory; name: string; url: string };
export type Headline = { category: NewsCategory; feed: string; title: string; url: string; summary: string; publishedAt: Date | null };

export function loadFeeds(file = path.join(process.cwd(), "news-feeds.json")): FeedConfig[] {
  const raw = JSON.parse(readFileSync(file, "utf8")) as { feeds: FeedConfig[] };
  return raw.feeds.filter((f) => NEWS_CATEGORIES.includes(f.category) && /^https:\/\//.test(f.url));
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();

const text = (v: unknown): string => {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return decode(String(v));
  if (Array.isArray(v)) return text(v[0]);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    return text(o["#text"] ?? o["@_href"] ?? "");
  }
  return "";
};

/** Parses RSS 2.0 or Atom into headlines. */
export function parseFeed(xml: string, feed: FeedConfig): Headline[] {
  const doc = new XMLParser({ ignoreAttributes: false, processEntities: false }).parse(xml);
  const items: unknown[] = [].concat(doc?.rss?.channel?.item ?? doc?.feed?.entry ?? doc?.["rdf:RDF"]?.item ?? []);
  return items
    .map((it) => {
      const o = it as Record<string, unknown>;
      let link = text(o.link);
      if (!link && Array.isArray(o.link)) link = text((o.link as unknown[]).find((l) => (l as Record<string, string>)["@_rel"] !== "self"));
      const date = text(o.pubDate ?? o.published ?? o.updated ?? o["dc:date"]);
      return {
        category: feed.category,
        feed: feed.name,
        title: text(o.title),
        url: link,
        summary: text(o.description ?? o.summary ?? o["content:encoded"] ?? o.content).slice(0, 600),
        publishedAt: date && !Number.isNaN(Date.parse(date)) ? new Date(date) : null,
      };
    })
    .filter((h) => h.title && /^https?:\/\//.test(h.url));
}

export type Fetch = (url: string) => Promise<{ ok: boolean; status: number; text: () => Promise<string> }>;
const defaultFetch: Fetch = (url) =>
  fetch(url, { headers: { "user-agent": "ReadUpNewsBot/1.0 (educational reading app)" }, signal: AbortSignal.timeout(15_000) });

/** Fetches every feed, keeping the newest items. Feed failures are reported, not thrown. */
export async function fetchHeadlines(feeds: FeedConfig[], opts: { perFeed?: number; maxTotal?: number; fetchImpl?: Fetch } = {}) {
  const { perFeed = 10, maxTotal = 50, fetchImpl = defaultFetch } = opts;
  const errors: string[] = [];
  const all: Headline[] = [];
  await Promise.all(
    feeds.map(async (f) => {
      try {
        const res = await fetchImpl(f.url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items = parseFeed(await res.text(), f)
          .sort((a, b) => (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0))
          .slice(0, perFeed);
        all.push(...items);
      } catch (e) {
        errors.push(`${f.name}: ${(e as Error).message}`);
      }
    }),
  );
  const seen = new Set<string>();
  const unique = all.filter((h) => {
    const k = h.url.split("?")[0];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  // Round-robin across categories so one busy feed can't crowd out the rest.
  const byCat = new Map<string, Headline[]>();
  for (const h of unique) byCat.set(h.category, [...(byCat.get(h.category) ?? []), h]);
  const out: Headline[] = [];
  while (out.length < maxTotal && [...byCat.values()].some((l) => l.length)) {
    for (const list of byCat.values()) if (list.length && out.length < maxTotal) out.push(list.shift()!);
  }
  return { headlines: out, errors };
}

/** Pulls readable paragraph text out of an article page. Falls back to "" on any failure. */
export async function fetchArticleText(url: string, fetchImpl: Fetch = defaultFetch): Promise<string> {
  try {
    const res = await fetchImpl(url);
    if (!res.ok) return "";
    const html = (await res.text()).replace(/<(script|style|noscript|svg|nav|footer|header|aside)[\s\S]*?<\/\1>/gi, " ");
    const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => decode(m[1])).filter((p) => p.split(" ").length >= 8);
    return paras.join("\n\n").slice(0, 12_000);
  } catch {
    return "";
  }
}
