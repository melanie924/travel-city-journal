import { getAllPosts, getAllCities } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CityFilter from "@/components/CityFilter";

export default function Home() {
  const posts = getAllPosts();
  const cities = getAllCities();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          城市觀察筆記
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          每座城市都有自己的個性。用心觀察，深度思考，記錄旅途中那些值得被記住的瞬間與洞察。
        </p>
      </section>

      <section className="mb-8">
        <CityFilter cities={cities} />
      </section>

      <section className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>

      {posts.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          還沒有文章，敬請期待第一篇城市紀錄。
        </p>
      )}
    </div>
  );
}
