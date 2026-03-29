export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      {tag}
    </span>
  );
}
