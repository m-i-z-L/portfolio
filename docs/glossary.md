# プロジェクト用語集 (Glossary)

## 概要

このドキュメントは、ポートフォリオサイトプロジェクトで使用される用語の定義を管理します。

**更新日**: 2026-04-12

---

## ドメイン用語

プロジェクト固有のビジネス概念や機能に関する用語。

### 記事 (Article)

**定義**: サイトオーナーが Zenn で執筆・公開する技術ブログの投稿単位。

**説明**: 記事は Zenn 上で管理される。ポートフォリオサイトはビルド時に Zenn RSS フィードを取得し、記事一覧ページを静的生成する。各記事カードは Zenn の記事 URL へ外部リンクする。

**関連用語**: ZennArticle、タグ、Zenn RSS

**使用例**:
- 「新しい記事を追加する」→ Zenn で記事を公開し、ポートフォリオサイトを再ビルドする
- 「記事を非公開にする」→ Zenn 上で記事を非公開にする（次回ビルド時に自動で一覧から除外）

**英語表記**: Article

---

### タグ (Tag)

**定義**: 記事の技術カテゴリ・トピックを表すラベル。

**説明**: 1記事に複数設定可能。Zenn RSS フィードの `<category>` 要素から取得する。タグ別の記事一覧ページ (`/blog/tags/[tag]`) は `getStaticPaths()` でビルド時に全タグ分を事前生成する。

**関連用語**: 記事、タグフィルター、Zenn RSS

**標準タグ一覧**:
- `Go` / `Python` / `TypeScript` — プログラミング言語
- `バックエンド` — バックエンド全般
- `データベース` / `PostgreSQL` / `MySQL` — DB関連
- `インフラ` / `Docker` / `Kubernetes` / `AWS` — インフラ関連
- `アーキテクチャ` — 設計・アーキテクチャ
- `パフォーマンス` — 最適化・計測

**英語表記**: Tag

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

### Zenn

**定義**: 日本の技術記事投稿プラットフォーム。

**本プロジェクトでの用途**: 技術記事の執筆・管理・公開を行うプラットフォーム。ポートフォリオサイトは Zenn の RSS フィード (`https://zenn.dev/{username}/feed`) をビルド時に取得し、記事一覧を静的生成する。記事本文は Zenn 上で閲覧する。

**関連用語**: ZennArticle、Zenn RSS

---

### Zenn RSS

**定義**: Zenn が提供するユーザー別の記事フィード。

**URL形式**: `https://zenn.dev/{username}/feed`

**本プロジェクトでの用途**: ビルド時に Astro のページ Frontmatter から fetch し、記事タイトル・URL・公開日・タグを取得する。取得したデータをもとにブログ一覧ページとタグ別ページを静的生成する。

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

### ZennArticle エンティティ

**定義**: Zenn の技術記事を表すデータモデル。ビルド時に Zenn RSS フィードから取得する。

**主要フィールド**:
- `title`: 記事タイトル
- `url`: Zenn の記事 URL
- `publishedAt`: 公開日
- `tags`: タグ配列 (RSS の `<category>` 要素から取得)
- `description`: 記事概要 (任意。RSS の `<description>` から取得)

**関連用語**: 記事、タグ、Zenn RSS

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
