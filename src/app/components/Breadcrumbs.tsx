import React from "react";
import Link from "next/link";

/**
 * パンくずリスト用アイテム型
 * href が無い（未指定 or 最後の要素）の場合は現在ページとして表示
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string; // 区切り文字（デフォルト: "/"）
  className?: string;
}

/**
 * シンプルなパンくずリストコンポーネント
 *
 * 使い方例:
 * <Breadcrumbs items={[{label: "ホーム", href: "/"}, {label: "記事タイトル"}]} />
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  className,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="パンくずリスト" className={className}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          margin: "0 0 16px",
          padding: 0,
          fontSize: 12,
          color: "#555",
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
            return (
              <li key={idx} style={{ alignItems: "center" }}>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    style={{
                      color: "#0366d6",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    style={{
                      fontWeight: isLast ? 600 : 400,
                      color: isLast ? "#222" : "#555",
                    }}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    style={{ margin: "0 6px", color: "#999" }}
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

/**
 * 実装ポイント（日本語解説）
 *
 * 1. nav要素 + aria-label で「ここがパンくず」であることをスクリーンリーダーに伝える
 * 2. ol/li 構造: 順序付きリスト(上層 → 現在)で意味付け
 * 3. 最終項目に aria-current="page" を付加（現在位置であることを示す）
 * 4. 区切り文字は装飾扱いのため aria-hidden
 * 5. items 配列は「上から順に階層」を渡すだけのシンプル設計
 * 6. 余計な外部依存を増やさないため CSS Modules ではなく最小限のインラインスタイル
 * 7. separator を props で差し替え可能（"›" ">" などに変更可能）
 */
