import { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於",
  description: "關於城市觀察筆記——一個深度旅行紀錄計畫",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">關於這個計畫</h1>

      <div className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>
          <strong>城市觀察筆記</strong>
          是一個旅行紀錄計畫。我們相信，每座城市都有自己的故事，而好的旅行紀錄不只是景點打卡，更是對一個地方文化、人群、和日常生活的深度觀察。
        </p>

        <p>
          這個計畫的獨特之處在於：每一篇紀錄都融合了第一手的感官體驗、情感觀察，以及文化脈絡、歷史背景和跨城市的比較視角，創造出更豐富的旅行敘事。
        </p>

        <h2 className="pt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          為什麼要這樣做？
        </h2>

        <p>
          傳統的旅行部落格通常聚焦在「去哪裡」和「怎麼去」。但我們更想探索「為什麼」——為什麼東京的電車這麼安靜？為什麼曼谷的街頭小吃如此重要？為什麼里斯本的破舊反而是一種美？
        </p>

        <p>
          我們試著連結歷史與現在，從城市規劃的角度解讀一條街道，在不同文化之間找到意想不到的共通點。
        </p>

        <h2 className="pt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          如何閱讀這些文章
        </h2>

        <p>
          每篇文章中，你會看到標註為「深度觀察」的段落——這些是基於文化、歷史、和社會學知識提供的補充視角。其餘的文字則來自旅行者的親身經歷和感受。
        </p>

        <p>
          我們希望這樣的結合能帶給你不一樣的閱讀體驗，也希望它能啟發你在下一次旅行時，用更多元的視角去觀察身邊的世界。
        </p>
      </div>
    </div>
  );
}
