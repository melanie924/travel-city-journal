"use client";

import Link from "next/link";
import { CityInfo } from "@/lib/types";

export default function CityFilter({
  cities,
  activeCity,
}: {
  cities: CityInfo[];
  activeCity?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
          !activeCity
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        }`}
      >
        全部
      </Link>
      {cities.map((city) => (
        <Link
          key={city.name}
          href={`/cities/${encodeURIComponent(city.name)}`}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeCity === city.name
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {city.name}
          <span className="ml-1 text-xs opacity-60">{city.postCount}</span>
        </Link>
      ))}
    </div>
  );
}
