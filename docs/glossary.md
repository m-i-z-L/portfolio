# プロジェクト用語集 (Glossary)

## 概要

このドキュメントは、ポートフォリオサイトプロジェクトで使用される用語の定義を管理します。

**更新日**: 2026-04-12

---

## ドメイン用語

プロジェクト固有のビジネス概念や機能に関する用語。

### 記事 (Article)

**定義**: サイトオーナーが執筆・公開する技術ブログの投稿単位。

**説明**: `src/content/articles/` 配下にMarkdownファイルとして管理される。公開日・タグ・本文・ドラフトフラグなどのメタデータ（フロントマター）を持つ。

**関連用語**: フロントマター、スラッグ、タグ、ドラフト

**使用例**:
- 「新しい記事を追加する」→ `src/content/articles/` にMarkdownファイルを作成
- 「記事を非公開にする」→ フロントマターの `draft: true` を設定

**英語表記**: Article

---

### スラッグ (Slug)

**定義**: 記事のURLパスに使われる識別子文字列。

**説明**: ファイル名（拡張子を除く）から **Astroが自動生成** する。フロントマターへの記載は不要・不可。英数字とハイフンのみ使用可。例: `go-concurrency-tips.md` → slug: `go-concurrency-tips` → URL: `/blog/go-concurrency-tips`

**関連用語**: 記事、ルーティング

**使用例**:
- ファイル名 `postgres-index-optimization.md` のスラッグは `postgres-index-optimization`
- `getCollection('articles')` の結果では `entry.slug` でアクセスできる

**英語表記**: Slug

---

### タグ (Tag)

**定義**: 記事の技術カテゴリ・トピックを表すラベル。

**説明**: 1記事に複数設定可能。タグ別の記事一覧ページ (`/blog/tags/[tag]`) のルーティングに使われる。新しいタグを追加する際はこの用語集に追記する。

**関連用語**: 記事、タグフィルター

**標準タグ一覧**:
- `Go` / `Python` / `TypeScript` — プログラミング言語
- `バックエンド` — バックエンド全般
- `データベース` / `PostgreSQL` / `MySQL` — DB関連
- `インフラ` / `Docker` / `Kubernetes` / `AWS` — インフラ関連
- `アーキテクチャ` — 設計・アーキテクチャ
- `パフォーマンス` — 最適化・計測

**英語表記**: Tag

---

### ドラフト (Draft)

**定義**: 非公開状態の記事。

**説明**: フロントマターの `draft: true` を設定した記事はビルド時に除外され、公開サイトには表示されない。執筆中・レビュー中の記事に使用する。

**関連用語**: 記事、フロントマター

**英語表記**: Draft

---

### フロントマター (Front Matter)

**定義**: Markdownファイルの先頭に `---` で囲まれたYAML形式のメタデータブロック。

**説明**: 記事のタイトル・説明・公開日・タグ・ドラフトフラグなどを定義する。Astroのコンテンツコレクションスキーマ (`src/content/config.ts`) によって型検証される。

**関連用語**: 記事、コンテンツコレクション

**英語表記**: Front Matter

---

### ポートフォリオ (Portfolio)

**定義**: 本サイト全体、または職務経歴・制作物など自己の実績を示すコンテンツの総称。

**関連用語**: プロジェクト、職務経歴

**英語表記**: Portfolio

---

## 技術用語

プロジェクトで使用している技術・フレームワーク・ツールに関する用語。

### Astro

**定義**: コンテンツ中心のWebサイト向けに設計された静的サイトジェネレーター（SSG）。

**本プロジェクトでの用途**: サイト全体のビルドフレームワーク。Markdownコンテンツの処理・HTML生成・パフォーマンス最適化を担当。

**バージョン**: 4.x

**特徴**:
- デフォルトでJavaScriptをゼロ出力（Islands Architecture）
- ファイルベースルーティング
- コンテンツコレクションによるMarkdown管理

**関連ドキュメント**: `docs/architecture.md`

---

### Tailwind CSS

**定義**: ユーティリティファーストのCSSフレームワーク。

**本プロジェクトでの用途**: 全コンポーネントのスタイリング。未使用CSSは自動パージされる。

**バージョン**: 3.x

**関連ドキュメント**: `docs/architecture.md`

---

### GitHub Pages

**定義**: GitHubが提供する静的サイトホスティングサービス。

**本プロジェクトでの用途**: 本番環境のホスティング。`main` ブランチへのpushをトリガーに、GitHub ActionsがビルドしてGitHub Pagesへ自動デプロイする。

**関連ドキュメント**: `docs/architecture.md`

---

### GitHub Actions

**定義**: GitHubが提供するCI/CDサービス。

**本プロジェクトでの用途**: `main` ブランチへのpush時に自動でビルド・型チェック・Lighthouse計測・デプロイを実行する。

**設定ファイル**: `.github/workflows/deploy.yml`

**関連ドキュメント**: `docs/architecture.md`, `docs/development-guidelines.md`

---

### Shiki

**定義**: Astroに組み込まれたシンタックスハイライトライブラリ。

**本プロジェクトでの用途**: 技術記事内のコードブロックに色付けを行う。JavaScriptをゼロ出力でハイライトが適用される。

---

### Formspree

**定義**: フォーム送信をバックエンドなしで処理できる外部SaaSサービス。

**本プロジェクトでの用途**: コンタクトフォームの送信処理を委譲する外部サービス。GitHub Pagesは静的ホスティングのためサーバーサイド処理を持てないため、フォーム送信にはFormspree等の外部サービスを使用する。メールアドレスをHTMLに直接記載する必要がなくなるため、スパム対策にもなる。

**注意**: Formspreeの無料プランには月間送信数の制限がある。

---

## 略語・頭字語

### SSG

**正式名称**: Static Site Generator

**意味**: 静的サイトジェネレーター。コンテンツとテンプレートからビルド時に静的HTMLを生成するツール。

**本プロジェクトでの使用**: Astroが担うロール。サーバーレス・ホスティングコストゼロを実現する。

---

### PRD

**正式名称**: Product Requirements Document

**意味**: プロダクト要求定義書。何を作るかを定義するドキュメント。

**本プロジェクトでの使用**: `docs/product-requirements.md`

---

### CI/CD

**正式名称**: Continuous Integration / Continuous Deployment

**意味**: コードのpushをトリガーに自動でビルド・テスト・デプロイを実行する開発手法。

**本プロジェクトでの使用**: GitHub Actionsで実装。`main` ブランチへのpush時に自動実行。

---

### LCP

**正式名称**: Largest Contentful Paint

**意味**: ページの最大コンテンツ要素が描画されるまでの時間。Webパフォーマンスのコア指標（Core Web Vitals）の一つ。

**本プロジェクトでの使用**: Lighthouseで計測。目標値2.5秒以内。

---

### CLS

**正式名称**: Cumulative Layout Shift

**意味**: ページロード中のレイアウトの予期せぬズレを数値化した指標。Core Web Vitalsの一つ。

**本プロジェクトでの使用**: Lighthouseで計測。目標値0.1以下。

---

## アーキテクチャ用語

### コンテンツコレクション (Content Collection)

**定義**: Astroが提供するMarkdownコンテンツの型安全な管理機構。

**本プロジェクトでの適用**: `src/content/articles/` 配下の記事MarkdownをAstroのコンテンツコレクションで管理。`src/content/config.ts` でスキーマ定義し、ビルド時に型バリデーションを実施。

**関連コンポーネント**: `src/content/config.ts`, `src/pages/blog/[slug].astro`

---

### Jamstack

**定義**: JavaScript + API + Markup の頭文字。事前ビルドした静的ファイルをCDNで配信するアーキテクチャパターン。

**本プロジェクトでの適用**: Astro + GitHub Pagesの組み合わせで実現。サーバー不要・高速・低コストを実現する。

**関連ドキュメント**: `docs/architecture.md`

---

### Islands Architecture

**定義**: Astroが採用するアーキテクチャパターン。ページの大部分は静的HTMLとして配信し、インタラクティブな「島（Island）」部分のみJavaScriptを読み込む。

**本プロジェクトでの適用**: インタラクションが少ないポートフォリオサイトのため、ほぼ全ページがJavaScriptゼロ出力。パフォーマンス向上に貢献。

---

## データモデル用語

### Article エンティティ

**定義**: 技術記事を表すデータモデル。

**主要フィールド**:
- `slug`: URLスラッグ (**フロントマターに書かない**。ファイル名からAstroが自動生成)
- `title`: 記事タイトル
- `description`: 記事概要
- `publishedAt`: 公開日
- `updatedAt`: 最終更新日 (任意)
- `tags`: タグ配列
- `draft`: 非公開フラグ
- `body`: 本文 (Markdown)

**関連用語**: 記事、スラッグ、タグ

---

### Skill エンティティ

**定義**: スキル・技術スタックを表すデータモデル。

**主要フィールド**:
- `name`: スキル名
- `category`: カテゴリ (`language` / `framework` / `database` / `infrastructure` / `tool`)
- `level`: 習熟度 (`expert` / `proficient` / `familiar`)
- `yearsOfExperience`: 経験年数
- `featured`: トップページ表示フラグ

---

### CareerHistory エンティティ

**定義**: 職務経歴を表すデータモデル。

**主要フィールド**:
- `company`: 会社名
- `role`: 職種・役職
- `startDate`: 開始年月 (例: `2018-04`)
- `endDate`: 終了年月 (現職は省略)
- `description`: 担当業務概要
- `achievements`: 主な実績配列
- `technologies`: 使用技術配列

---

### Project エンティティ

**定義**: 制作物・個人プロジェクトを表すデータモデル。

**主要フィールド**:
- `name`: プロジェクト名
- `description`: 概要
- `technologies`: 使用技術配列
- `githubUrl`: GitHubリポジトリURL (任意)
- `liveUrl`: デモ・本番URL (任意)
- `featured`: トップページ表示フラグ

---

## SkillLevel の定義

| 値 | 日本語 | 意味 |
|----|--------|------|
| `expert` | エキスパート | 実務で深く使用。チームへの技術指導が可能なレベル |
| `proficient` | 習熟 | 実務で継続的に使用。一人で設計〜実装を完結できるレベル |
| `familiar` | 経験あり | 実務経験あり。補助的・部分的に使用したレベル |

---

## SkillCategory の定義

| 値 | 意味 |
|----|------|
| `language` | プログラミング言語 |
| `framework` | フレームワーク・ライブラリ |
| `database` | データベース |
| `infrastructure` | インフラ・クラウド |
| `tool` | 開発ツール・その他 |
