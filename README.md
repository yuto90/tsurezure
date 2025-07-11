# 徒然なるままに技術 - Next.js Blog

WordPressをヘッドレスCMSとして使用したNext.jsブログサイトです。

## 特徴

- **ヘッドレスCMS**: WordPress REST APIを使用してコンテンツを取得
- **モダンフロントエンド**: Next.js 15 App Routerを使用
- **レスポンシブデザイン**: Tailwind CSSによる美しいUI
- **ダークモード**: システム設定に対応した自動切り替え
- **SEO最適化**: メタタグと構造化データの自動生成
- **TypeScript**: 型安全な開発環境

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Heroicons
- **Theme**: next-themes
- **Font**: Geist Sans & Geist Mono

## セットアップ

### 1. プロジェクトのクローン

```bash
git clone <repository-url>
cd tsurezure
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local.example`をコピーして`.env.local`を作成し、設定を行います：

```bash
cp .env.local.example .env.local
```

`.env.local`を編集：

```env
# WordPress API Configuration
NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Site Configuration
NEXT_PUBLIC_SITE_NAME=徒然なるままに技術
NEXT_PUBLIC_SITE_URL=https://your-nextjs-site.com
NEXT_PUBLIC_SITE_DESCRIPTION=WordPressをヘッドレスCMSとして使用したNext.jsブログ

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)でサイトを確認できます。

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── categories/         # カテゴリページ
│   ├── tags/              # タグページ
│   ├── posts/             # 投稿詳細ページ
│   ├── profile/           # プロフィールページ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── BlogHeader.tsx     # ヘッダーコンポーネント
│   ├── BlogPostsList.tsx  # 投稿一覧
│   ├── BlogSidebar.tsx    # サイドバー
│   ├── StructuredData.tsx # 構造化データ
│   └── ThemeProvider.tsx  # テーマプロバイダー
├── lib/                   # ユーティリティ
│   ├── wordpress-api.ts   # WordPress API接続
│   └── seo.ts            # SEOヘルパー
└── types/                 # TypeScript型定義
    └── wordpress.ts       # WordPress型定義
```

## WordPress設定

### 必要なプラグイン

1. **WordPress REST API**: 既にWordPressに含まれています
2. **Yoast SEO** (推奨): SEO情報をAPIで取得するため

### WordPressでの設定

1. **パーマリンク設定**: 投稿名に設定してください
2. **CORS設定**: 必要に応じてCORSヘッダーを設定
3. **カテゴリとタグ**: 適切に設定してください

## カスタマイズ

### テーマカラーの変更

`src/app/globals.css`で主要色を変更できます：

```css
:root {
  --primary: #42b983;        /* メインカラー */
  --primary-dark: #369870;   /* ダークカラー */
}
```

### ナビゲーションの変更

`src/components/BlogHeader.tsx`のnavigation配列を編集：

```typescript
const navigation = [
  { name: 'ホーム', href: '/' },
  { name: 'プログラミング', href: '/categories/programming' },
  // ... 他のナビゲーション項目
];
```

## 本番環境デプロイ

### Vercelへのデプロイ

1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム

```bash
npm run build
npm run start
```

## コマンド

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
npm run lint         # ESLint実行
```

## ライセンス

MIT License
