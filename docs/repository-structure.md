# リポジトリ構造定義書 (Repository Structure Document)

## プロジェクト構造

```
portfolio/
├── src/                        # Astroソースコード
│   ├── pages/                  # ページコンポーネント (ルーティング)
│   ├── layouts/                # ページレイアウト
│   ├── components/             # 再利用可能なUIコンポーネント
│   ├── content/                # コンテンツコレクション (Markdown記事)
│   ├── data/                   # 構造化データ (スキル・経歴・制作物)
│   └── assets/                 # Astroが最適化する画像 (WebP変換対象)
├── public/                     # 静的アセット (そのまま配信・最適化なし)
├── docs/                       # プロジェクトドキュメント
├── .github/
│   └── workflows/              # GitHub Actions ワークフロー
├── astro.config.mjs            # Astro設定
├── tailwind.config.mjs         # Tailwind CSS設定
├── tsconfig.json               # TypeScript設定
└── package.json
```

## ディレクトリ詳細

### src/pages/ (ページディレクトリ)

**役割**: URLルーティングに対応するページコンポーネント。Astroのファイルベースルーティングに従い、ファイルパスがそのままURLになる。

**配置ファイル**:
- `index.astro`: トップページ (`/`)
- `blog/index.astro`: ブログ一覧ページ (`/blog`)
- `blog/[slug].astro`: 記事詳細ページ (`/blog/[slug]`)
- `blog/tags/[tag].astro`: タグ別記事一覧 (`/blog/tags/[tag]`)
- `404.astro`: カスタム404ページ

**命名規則**:
- 静的ページ: `kebab-case.astro`
- 動的ルート: `[param].astro`

**例**:
```
src/pages/
├── index.astro
├── blog/
│   ├── index.astro
│   ├── [slug].astro
│   └── tags/
│       └── [tag].astro
└── 404.astro
```

---

### src/layouts/ (レイアウトディレクトリ)

**役割**: ページ全体の共通レイアウト（ヘッダー・フッター・メタタグ等）を定義する。

**配置ファイル**:
- `BaseLayout.astro`: 全ページ共通のHTMLシェル
- `ArticleLayout.astro`: 記事詳細ページ専用レイアウト

**命名規則**: PascalCase + `Layout.astro`

**依存関係**:
- 依存可能: `src/components/`
- 依存禁止: `src/pages/`

**例**:
```
src/layouts/
├── BaseLayout.astro
└── ArticleLayout.astro
```

---

### src/components/ (コンポーネントディレクトリ)

**役割**: ページ間で再利用するUIコンポーネント。機能単位でサブディレクトリに整理する。

**サブディレクトリ構成**:

```
src/components/
├── common/         # 汎用コンポーネント (ヘッダー・フッター・ボタン等)
├── home/           # トップページ固有のセクションコンポーネント
└── blog/           # ブログ関連コンポーネント
```

**配置ファイル例**:

| ディレクトリ | ファイル | 説明 |
|-------------|---------|------|
| `common/` | `Header.astro` | サイト共通ヘッダー |
| `common/` | `Footer.astro` | サイト共通フッター |
| `common/` | `TagBadge.astro` | タグ表示バッジ |
| `home/` | `HeroSection.astro` | ヒーローセクション |
| `home/` | `SkillsSection.astro` | スキル一覧セクション |
| `home/` | `CareerSection.astro` | 職務経歴セクション |
| `home/` | `ProjectsSection.astro` | 制作物セクション |
| `home/` | `ContactSection.astro` | コンタクトセクション |
| `blog/` | `ArticleCard.astro` | 記事カード (一覧用) |
| `blog/` | `TagFilter.astro` | タグフィルター |
| `blog/` | `ArticleContent.astro` | 記事本文レンダラー |

**命名規則**: PascalCase + `.astro`

**依存関係**:
- 依存可能: `src/data/`、`src/content/`
- 依存禁止: `src/pages/`（循環参照防止）

---

### src/content/ (コンテンツディレクトリ)

**役割**: Astro Content Collectionsで管理するMarkdownコンテンツ。記事ファイルとスキーマ定義を配置する。

**配置ファイル**:
- `config.ts`: コレクションのスキーマ定義
- `articles/*.md`: 技術記事ファイル群

**命名規則**:
- 記事ファイル: `kebab-case.md` (例: `go-concurrency-tips.md`)
- ファイル名がそのままURLスラッグになる

**例**:
```
src/content/
├── config.ts
└── articles/
    ├── go-concurrency-tips.md
    └── postgres-index-optimization.md
```

**`config.ts` の構成**:
```typescript
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
```

---

### src/data/ (データディレクトリ)

**役割**: スキル・職務経歴・制作物などの構造化データをTypeScriptで管理する。

**配置ファイル**:
- `skills.ts`: スキル一覧データ
- `career.ts`: 職務経歴データ
- `projects.ts`: 制作物データ

**命名規則**: `kebab-case.ts`

**例**:
```
src/data/
├── skills.ts
├── career.ts
└── projects.ts
```

---

### public/ (静的アセットディレクトリ)

**役割**: ビルド時に処理されず、そのまま配信される静的ファイル。

**配置ファイル**:
- `images/`: 画像ファイル (OGP画像・プロフィール写真・プロジェクトスクリーンショット等)
- `favicon.svg`: ファビコン

**命名規則**:
- 画像ファイル: `kebab-case.{png,jpg,webp,svg}`
- 画像は `src/assets/` に置くとAstroが最適化するため、最適化が不要なファイルのみ `public/` に配置

**例**:
```
public/
├── favicon.svg
└── images/
    ├── og-image.png
    ├── profile.jpg
    └── projects/
        └── portfolio-screenshot.png
```

---

### .github/workflows/ (CI/CDワークフロー)

**役割**: GitHub Actions のワークフロー定義。

**配置ファイル**:
- `deploy.yml`: mainブランチへのpush時にビルドしてGitHub Pagesへデプロイ

**例**:
```
.github/
└── workflows/
    └── deploy.yml
```

---

### docs/ (ドキュメントディレクトリ)

**役割**: プロジェクトの設計・仕様ドキュメント。

**配置ドキュメント**:
- `product-requirements.md`: プロダクト要求定義書 (PRD)
- `functional-design.md`: 機能設計書
- `architecture.md`: アーキテクチャ設計書
- `repository-structure.md`: リポジトリ構造定義書 (本ドキュメント)
- `development-guidelines.md`: 開発ガイドライン
- `glossary.md`: 用語集
- `ideas/`: アイデアメモ・初期要求定義の草稿

## ファイル配置規則

### ソースファイル

| ファイル種別 | 配置先 | 命名規則 | 例 |
|------------|--------|---------|-----|
| ページ | `src/pages/` | kebab-case.astro | `index.astro` |
| レイアウト | `src/layouts/` | PascalCaseLayout.astro | `BaseLayout.astro` |
| コンポーネント | `src/components/[category]/` | PascalCase.astro | `HeroSection.astro` |
| 記事Markdown | `src/content/articles/` | kebab-case.md | `go-tips.md` |
| 静的データ | `src/data/` | kebab-case.ts | `skills.ts` |
| 型定義 | `src/types/` (必要に応じて) | PascalCase.ts | `Article.ts` |
| 静的画像 | `public/images/` | kebab-case.{拡張子} | `profile.jpg` |
| 最適化画像 | `src/assets/images/` | kebab-case.{拡張子} | `project-thumb.png` |

### 設定ファイル

| ファイル種別 | 配置先 | 備考 |
|------------|--------|------|
| Astro設定 | `astro.config.mjs` | プロジェクトルート |
| Tailwind設定 | `tailwind.config.mjs` | プロジェクトルート |
| TypeScript設定 | `tsconfig.json` | プロジェクトルート |
| ESLint設定 | `eslint.config.js` | プロジェクトルート |
| Prettier設定 | `.prettierrc` | プロジェクトルート |

## 命名規則

### ディレクトリ名

- **ソースディレクトリ**: 複数形、kebab-case (`components/`, `layouts/`)
- **コンポーネントカテゴリ**: 単数形、kebab-case (`home/`, `blog/`, `common/`)

### ファイル名

| 種別 | 規則 | 例 |
|------|------|-----|
| Astroコンポーネント | PascalCase | `HeroSection.astro` |
| Astroページ | kebab-case | `index.astro`, `blog/[slug].astro` |
| TypeScriptデータ | kebab-case | `skills.ts`, `career.ts` |
| Markdown記事 | kebab-case | `go-concurrency-tips.md` |
| 設定ファイル | ツール標準に従う | `astro.config.mjs` |

## 依存関係のルール

```
pages/
  ↓ (OK)
layouts/ + components/
  ↓ (OK)
data/ + content/
```

**禁止される依存**:
- `data/` → `components/` (データレイヤーからUIへの逆依存 ❌)
- `layouts/` → `pages/` (循環参照 ❌)
- `components/` → `pages/` (循環参照 ❌)

## 除外設定

### .gitignore

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
.astro/
```

### .prettierignore

```
dist/
node_modules/
.astro/
```

## スケーリング戦略

### コンテンツ増加

- 記事が50件を超えたら、`src/content/articles/` 内をカテゴリ別サブディレクトリで整理
- 例: `articles/backend/`, `articles/infrastructure/`

### コンポーネント増加

- `src/components/` 内のコンポーネントが各カテゴリ10件を超えたら、さらに細分化を検討
- 独立して再利用される汎用UIは `common/` に移動
