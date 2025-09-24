"use client";
import { Flex, Empty, Spin, Select, Space, Button } from "antd";
import PostCard from "./PostCard";
import React, { useMemo, useEffect } from "react";
import { usePostFilterStore } from "@/../stores/useStore";
import type { CategoryItem } from "@/../stores/useStore";

export interface KurocoPost {
  topics_id?: string | number;
  slug?: string;
  subject?: string;
  ymd?: string;
  update_ymdhi?: string;
  summary?: string;
  contents?: string;
  /* Kuroco記事に含まれると想定: コンテンツタイプID/名称など */
  contents_type_list?: (string | number)[];
}

interface PostCardsProps {
  posts: KurocoPost[];
  loading?: boolean;
}

export const PostList: React.FC<PostCardsProps> = ({ posts, loading }) => {
  const {
    selectedContentTypes,
    setSelectedContentTypes,
    clearContentTypes,
    categories,
    categoriesLoading,
    categoriesError,
    fetchCategories,
  } = usePostFilterStore();

  /* 初回マウント時にカテゴリーを取得（TTL内はストア側でスキップ） */
  useEffect(() => {
    fetchCategories().catch((e) => console.error("fetchCategories failed", e));
  }, [fetchCategories]);

  /* カテゴリー一覧をSelect用に整形 */
  const categoryOptions = useMemo(() => {
    return categories
      .map((c: CategoryItem) => {
        const label = String(c.category_nm ?? c.name ?? "");
        const value = Number(c.topics_category_id ?? c.category_id ?? c.id ?? "");
        return { label, value };
      })
      .filter(o => o.label && o.value);
  }, [categories]);

  const filteredPosts = useMemo(() => {
    if (selectedContentTypes.length === 0) return posts;
    const selectedContentTypesNum = selectedContentTypes.map(Number);
    return posts.filter((p) => {
      const list = (p.contents_type_list || []).map(Number);
      return list.some((ct) => selectedContentTypesNum.includes(ct));
    });
  }, [posts, selectedContentTypes]);

  if (loading) {
    return (
      <Flex style={{ marginTop: 32, width: "100%" }} justify="center">
        <Spin />
      </Flex>
    );
  }

  const cards = filteredPosts.map((post) => (
    <PostCard
      key={post.topics_id || post.slug || Math.random().toString(36).slice(2)}
      post={post}
    />
  ));

  return (
    <div style={{ width: "100%" }}>
      <Space wrap style={{ width: "100%", marginTop: 16 }}>
        <Select
          mode="multiple"
          allowClear
          placeholder="カテゴリーで絞り込み"
          value={selectedContentTypes}
          style={{ minWidth: 280 }}
          onChange={(vals) => setSelectedContentTypes(vals)}
          options={categoryOptions}
          loading={categoriesLoading}
          maxTagCount="responsive"
        />
        {selectedContentTypes.length > 0 && (
          <Button onClick={() => clearContentTypes()}>クリア</Button>
        )}
        {categoriesError && (
          <span style={{ color: "red" }}>カテゴリ取得失敗: {categoriesError}</span>
        )}
      </Space>

      {filteredPosts.length === 0 ? (
        <Empty description="該当する投稿がありません" style={{ marginTop: 24 }} />
      ) : (
        <Flex
          wrap="wrap"
          gap={8}
          align="stretch"
          style={{ width: "100%", marginTop: 24 }}
        >
          {cards}
        </Flex>
      )}
    </div>
  );
};

export default PostList;
