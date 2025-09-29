"use client";
import React from "react";
import Link from "next/link";
import styles from "@/app/postCard.module.css";
import { Card } from "antd";
import type { KurocoPost } from "./PostList";


interface PostCardProps {
  post: KurocoPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const convertedYmd = post.ymd
    ? new Date(post.ymd).toLocaleDateString()
    : "No Date";

  const title = post.subject || "No Title";

  return (
    <Link
        href={`/posts/${post.topics_id}`}
        className={styles.link}
        style={{
          textDecoration: "none",
          minWidth: 280,
          display: "block"
        }}
      >
      <Card
        key={post.topics_id || String(title)}
        title={post.subject}
        size="default"
        hoverable
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <p style={{ marginTop: 0, marginBottom: 8 }}>{convertedYmd}</p>
        {post.summary && (
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
            {post.summary}
          </p>
        )}
      </Card>
    </Link>
  )
};

export default PostCard;
