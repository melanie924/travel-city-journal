import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = process.env.SITE_URL || "https://city-journal.netlify.app";
const postsDir = path.join(process.cwd(), "content/posts");
const outDir = path.join(process.cwd(), "public");

const fileNames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const posts = fileNames
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(postsDir, fileName), "utf8"));
    return { slug, frontmatter: data };
  })
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

const rssItems = posts
  .map(
    (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <category>${post.frontmatter.city}</category>
    </item>`
  )
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>城市觀察筆記</title>
    <link>${SITE_URL}</link>
    <description>人類視角 + AI 洞察的旅行紀錄</description>
    <language>zh-TW</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.join(outDir, "rss.xml"), rss);
console.log("RSS feed generated at public/rss.xml");
