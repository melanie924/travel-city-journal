import Link from "next/link";
import { Post } from "@/lib/types";
import { getReadingTime } from "@/lib/posts";
import TagBadge from "./TagBadge";

export default function PostCard({ post }: { post: Post }) {
  const { frontmatter, slug, content } = post;
  const readingTime = getReadingTime(content);

  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        <div className="rounded-xl border border-zinc-200 p-6 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700">
          <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{frontmatter.city}, {frontmatter.country}</span>
            <span>·</span>
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString("zh-TW", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{readingTime} 分鐘閱讀</span>
          </div>
          <h2 className="mb-2 text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {frontmatter.title}
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            {frontmatter.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
