This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 計画

| 日数   | 内容                                                                 |
|--------|---------------------------------------------------------------------|
| 1日目  | Next.js＋microCMS環境セットアップ<br>コンテンツモデル設計（記事タイトル、本文、公開日など） |
| 2日目  | microCMSに記事データ登録（仮データ作成）                              |
| 3日目  | 記事一覧ページの作成（SSG利用）                                      |
| 4日目  | 記事詳細ページの作成                                                |
| 5日目  | SEO設定、簡単なスタイリング、パフォーマンスチェック、最終調整         |

## このスコープで得られるスキル

Next.jsの静的生成（SSG）と動的ルーティング
microCMSのAPIを使ったコンテンツ管理とデータ取得
コンポーネント設計とページ設計
基本的なSEO設定（metaタグ設定など）
サイトのパフォーマンス最適化

## 基本アーキテクチャ（推奨）

フロント：Next.js（TypeScript）。App Router。Ant。
CMS：Kuroco
検索（オプション）：Algolia（商用で信頼性高い）または MeiliSearch（OSS/安価）。
ホスティング：Vercel（Next最適）、代替：Netlify
CI/CD：GitHub Actions → プレビュー・自動ビルド・自動デプロイ

## ディレクトリ構成

app/
├─ layout.tsx           // ルートレイアウト（共通ヘッダ/フッタなど）
├─ page.tsx             // / のページ（トップ）
├─ posts/
│  ├─ layout.tsx        // /posts 以下のネストレイアウト（任意）
│  ├─ page.tsx          // /posts （記事一覧）
│  └─ [id]/
│     └─ page.tsx       // /posts/[id] （記事詳細、Server Componentでfetch）
components/             // 再利用コンポーネント（Client/Serverを分けて配置可）
├─ ui/
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  └─ PostCard.tsx
lib/
├─ kuroco.server.ts     // server-only クライアント（APIキー使用、サーバー側のみ）
├─ kuroco.client.ts     // 必要ならクライアント用の軽いfetchラッパー（公開キーのみ）
stores/
└─ useStore.ts          // Zustand のストア（クライアントコンポーネントで使用）
pages/
├─ api/
│  └─ kuroco/
│     └─ posts.ts       // Next API Route（クライアントから叩くプロキシ等）
public/                 // 画像や静的ファイル
styles/                 // グローバルCSS / Tailwind 等
.env.local              // 実際の環境変数（コミットしない）
.env.example            // 環境変数テンプレ（コミット可）
.next/                  // ビルド出力（gitignore）
package.json