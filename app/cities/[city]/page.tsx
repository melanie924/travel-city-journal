import { Metadata } from "next";
import { getAllCities, getPostsByCity } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CityFilter from "@/components/CityFilter";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    city: encodeURIComponent(city.name),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = decodeURIComponent(city);
  return {
    title: `${cityName} — 城市紀錄`,
    description: `關於${cityName}的旅行觀察與紀錄`,
    alternates: {
      canonical: `/cities/${city}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = decodeURIComponent(city);
  const posts = getPostsByCity(city);
  const cities = getAllCities();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{cityName}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {posts.length} 篇關於{cityName}的觀察紀錄
        </p>
      </section>

      <section className="mb-8">
        <CityFilter cities={cities} activeCity={cityName} />
      </section>

      <section className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
