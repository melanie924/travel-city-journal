export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            城市觀察筆記 — 記錄每座城市的獨特個性
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
