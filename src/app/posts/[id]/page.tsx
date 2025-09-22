import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../../page.module.css";
import { fetchPostFromKuroco } from "../../lib/kuroco.server";
import { sanitizeHtml } from "../../lib/sanitize";

interface KurocoPost {
  topics_id?: string | number;
  slug?: string;
  subject?: string;
  ymd?: string;
  update_ymdhi?: string;
  summary?: string;
  contents?: string;
}

export const revalidate = 60;

async function getPost(topics_id:number): Promise<KurocoPost> {
  try {
    const data = await fetchPostFromKuroco(topics_id);
    return data.details;
  } catch {
    return {};
  }
}

interface PostDetailPageParams {
  params: {
    id: number;
  }
}

const PostDetailPage: React.FC<PostDetailPageParams> = async ({ params }) => {
  const post = await getPost(params.id);
  if (!post) {
    notFound();
  }

  const bodyContent: string = (() => {
    if (post.contents) {
      if (typeof post.contents === "string") return post.contents;
      try {
        return JSON.stringify(post.contents, null, 2);
      } catch {
        return String(post.contents);
      }
    }
    if (post.summary) return post.summary;
    return "";
  })();
  const sanitizedBody = sanitizeHtml(bodyContent);

  return (
    <div className={styles.page}>
      <main
        className={styles.main}
        style={{ width: "100%", maxWidth: 860, alignItems: "flex-start" }}
      >
        <Link href="/" style={{ fontSize: 14, marginBottom: 24 }}>
          ← 一覧へ戻る
        </Link>
        <h1 style={{ marginBottom: 8 }}>{post.subject}</h1>
        {post.ymd && (
          <p style={{ color: "#666", fontSize: 12, marginTop: 0 }}>
            {post.ymd}
          </p>
        )}

        <article
          style={{
            marginTop: 24,
            fontSize: 14,
            lineHeight: 1.7,
            width: "100%",
            wordBreak: "break-word",
          }}
          dangerouslySetInnerHTML={{
            __html: sanitizedBody || "<p>本文はありません</p>",
          }}
        />
      </main>
    </div>
  );
};

export default PostDetailPage;
