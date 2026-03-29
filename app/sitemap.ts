import { MetadataRoute } from "next";
import { getAllPosts, getAllCities } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL || "https://city-journal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const cities = getAllCities();

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityEntries = cities.map((city) => ({
    url: `${SITE_URL}/cities/${encodeURIComponent(city.name)}`,
    lastModified: new Date(city.latestDate),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postEntries,
    ...cityEntries,
  ];
}
