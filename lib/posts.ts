import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter, CityInfo } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllCities(): CityInfo[] {
  const posts = getAllPosts();
  const cityMap = new Map<string, CityInfo>();

  for (const post of posts) {
    const { city, country, coordinates, date } = post.frontmatter;
    const existing = cityMap.get(city);

    if (!existing) {
      cityMap.set(city, {
        name: city,
        country,
        postCount: 1,
        latestDate: date,
        coordinates,
      });
    } else {
      existing.postCount++;
      if (new Date(date) > new Date(existing.latestDate)) {
        existing.latestDate = date;
      }
    }
  }

  return Array.from(cityMap.values()).sort((a, b) =>
    b.latestDate.localeCompare(a.latestDate)
  );
}

export function getPostsByCity(city: string): Post[] {
  return getAllPosts().filter(
    (post) => post.frontmatter.city === decodeURIComponent(city)
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    post.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  }
  return Array.from(tagSet).sort();
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 300;
  const charCount = content.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(charCount / wordsPerMinute));
}
