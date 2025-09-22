import styles from "./page.module.css";
import { fetchPostsFromKuroco } from "./lib/kuroco.server";
import { PostList, KurocoPost } from "@/app/components/PostList";

// ISR 再生成間隔 (必要に応じ調整)
export const revalidate = 60;

interface KurocoApiResponse {
  list?: KurocoPost[];
  items?: KurocoPost[];
  error?: boolean;
  [k: string]: unknown;
}

export default async function Home() {
  let data: KurocoApiResponse;
  try {
    data = await fetchPostsFromKuroco();
  } catch (e) {
    console.error("Failed to fetch posts from Kuroco:", e);
    data = { error: true };
  }

  const posts: KurocoPost[] =
    (Array.isArray(data?.list)
      ? (data.list as KurocoPost[])
      : Array.isArray(data?.items)
        ? (data.items as KurocoPost[])
        : []);

  return (
    <div className={styles.page}>
      <main className={styles.main} style={{ width: "100%", maxWidth: 1200 }}>
        <h1 style={{ marginTop: 24 }}>田中の犬に関するブログ</h1>

        {data?.error && (
          <p style={{ color: "red" }}>
            データ取得に失敗しました。環境変数 / API キー / エンドポイントを確認してください。
          </p>
        )}

        {!data?.error && (
          <PostList posts={posts} loading={false} />
        )}

      </main>
    </div>
  );
}
