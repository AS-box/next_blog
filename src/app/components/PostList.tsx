"use client";
import { Flex, Empty, Spin } from "antd";
import PostCard from "./PostCard";
import React from "react";


export interface KurocoPost {
  topics_id?: string | number;
  slug?: string;
  subject?: string;
  ymd?: string;
  update_ymdhi?: string;
  summary?: string;
  contents?: string;
}

interface PostCardsProps {
  posts: KurocoPost[];
  loading?: boolean;
}


export const PostList: React.FC<PostCardsProps> = ({ posts, loading }) => {
  if (loading) {
    return (
      <Flex style={{ marginTop: 32, width: "100%" }} justify="center">
        <Spin />
      </Flex>
    );
  }

  if (!loading && posts.length === 0) {
    return <Empty description="投稿がありません" style={{ marginTop: 24 }} />;
  }

  // PostCard 単位で表示
  const cards = posts.map((post) => (
    <PostCard key={post.topics_id || post.slug || Math.random().toString(36).slice(2)} post={post} />
  ));

  return (
    <Flex
      wrap="wrap"
      gap={8}
      align="stretch"
      style={{ width: "100%", marginTop: 24 }}
    >
      {cards}
    </Flex>
  );
};

export default PostList;
