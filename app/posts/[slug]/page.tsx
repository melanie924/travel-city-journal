import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getReadingTime } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";
import TagBadge from "@/components/TagBadge";

const SITE_URL =
  process.env.SITE_URL || "https://travel-city-journal.vercel.app";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      url: `${SITE_URL}/posts/${slug}`,
      siteName: "城市觀察筆記",
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();
  const readingTime = getReadingTime(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    url: `${SITE_URL}/posts/${slug}`,
    keywords: post.frontmatter.tags,
    inLanguage: "zh-TW",
    isPartOf: {
      "@type": "WebSite",
      name: "城市觀察筆記",
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.frontmatter.city,
        item: `${SITE_URL}/cities/${encodeURIComponent(post.frontmatter.city)}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: `${SITE_URL}/posts/${slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link
        href="/"
        className="mb-8 inline-flex items-center text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        &larr; 返回所有文章
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href={`/cities/${encodeURIComponent(post.frontmatter.city)}`}
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {post.frontmatter.city}, {post.frontmatter.country}
          </Link>
          <span>·</span>
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{readingTime} 分鐘閱讀</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.frontmatter.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {post.frontmatter.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <div
        className="prose max-w-none text-zinc-700 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
