import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mb-4 text-6xl font-bold text-zinc-300 dark:text-zinc-700">
        404
      </h1>
      <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
        這個頁面迷路了，就像旅途中走錯的巷弄。
      </p>
      <Link
        href="/"
        className="rounded-full bg-zinc-900 px-6 py-2 text-sm text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        回到首頁
      </Link>
    </div>
  );
}
