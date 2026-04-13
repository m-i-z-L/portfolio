# 開発ガイドライン (Development Guidelines)

## コーディング規約

### 命名規則

#### TypeScript / Astroコンポーネント

```typescript
// 変数: camelCase、名詞または名詞句
const articleList = getArticles();
const isPublished = true;
const hasTag = tags.length > 0;

// 関数: camelCase、動詞で始める
function formatDate(date: Date): string { }
function filterByTag(articles: Article[], tag: string): Article[] { }

// 定数: UPPER_SNAKE_CASE
const MAX_ARTICLES_PER_PAGE = 20;
const SITE_TITLE = '個人ポートフォリオ';

// 型・インターフェース: PascalCase
interface Article { }
type SkillLevel = 'expert' | 'proficient' | 'familiar';
```

#### Astroコンポーネントのprops

```typescript
// ✅ 良い例: Props型を明示的に定義
interface Props {
  title: string;
  description?: string;
  publishedAt: Date;
}

const { title, description = '', publishedAt } = Astro.props;

// ❌ 悪い例: 型なし
const { title, description, publishedAt } = Astro.props;
```

### コードフォーマット

- **インデント**: 2スペース
- **行の長さ**: 最大100文字
- **クォート**: シングルクォート (`'`)
- **セミコロン**: あり

Prettierによる自動フォーマットを適用。手動調整は原則不要。

### コメント規約

```typescript
// ✅ 良い例: なぜそうするかを説明
// 公開日降順にソートして最新記事を先頭に表示する
const sortedArticles = articles
  .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

// ❌ 悪い例: コードを日本語で説明するだけ
// 記事をソートする
const sortedArticles = articles.sort(...);
```

### Astro固有の規約

```astro
---
// ✅ Frontmatter: import → props定義 → データ取得の順
import BaseLayout from '../layouts/BaseLayout.astro';
import ArticleCard from '../components/blog/ArticleCard.astro';
import { fetchZennArticles } from '../utils/zenn';

interface Props {
  tag?: string;
}

const { tag } = Astro.props;
// Zenn RSS をビルド時に取得し、タグで絞り込む
const articles = await fetchZennArticles();
const filtered = tag ? articles.filter(a => a.tags.includes(tag)) : articles;
---

<!-- ✅ テンプレート: セマンティックHTMLを使う -->
<section aria-label="記事一覧">
  {filtered.map(article => (
    <ArticleCard article={article} />
  ))}
</section>
```

## Git運用ルール

### ブランチ戦略

個人開発のため、シンプルなブランチ構成を採用する。

```
main (本番環境 = GitHub Pages)
└── feature/[機能名]   # 新機能・ページ追加
└── fix/[修正内容]     # バグ修正・誤字修正
└── chore/[作業内容]   # 依存更新・設定変更
```

**運用ルール**:
- `main` は常にビルドが通る状態を保つ
- 作業はブランチを切って実施し、完了後に `main` へマージ

**マージ方針**:
- `feature/` `fix/` `chore/` → `main`: squash merge（コミット履歴を1つにまとめる）
- マージ後はブランチを削除する

### コミットメッセージ規約

Conventional Commits に従う。

```
<type>(<scope>): <subject>
```

**Type一覧**:
- `feat`: 新ページ・新機能の追加
- `fix`: バグ修正
- `style`: デザイン・スタイル変更
- `refactor`: リファクタリング
- `chore`: 依存関係更新・設定変更
- `docs`: ドキュメント更新

**例**:
```
feat(blog): Zenn RSS連携によるブログ一覧ページを追加
fix(hero): モバイルでレイアウトが崩れる問題を修正
style(career): タイムラインのデザインを調整
chore(deps): Astroを4.5.0にアップデート
```

## 開発環境セットアップ

### 必要なツール

| ツール | バージョン | インストール方法 |
|--------|-----------|-----------------|
| Node.js | v22.x (LTS) | [nodejs.org](https://nodejs.org) or `nvm install 22` |
| npm | v10.x | Node.jsに同梱 |

### セットアップ手順

```bash
# 1. リポジトリのクローン
git clone https://github.com/<username>/portfolio.git
cd portfolio

# 2. 依存関係のインストール
npm ci

# 3. 開発サーバーの起動
npm run dev
# → http://localhost:4321 でプレビュー
```

### 主要コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 (ホットリロード付き) |
| `npm run build` | 本番用ビルド (`dist/` に出力) |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run check` | Astro型チェック + TypeScript検証 |
| `npm run lint` | ESLintでコード品質チェック |
| `npm run format` | Prettierでコード自動整形 |

### 推奨エディタ設定 (VS Code)

拡張機能:
- `astro-build.astro-vscode`: Astroのシンタックスハイライト・補完
- `bradlc.vscode-tailwindcss`: Tailwindクラスの補完
- `esbenp.prettier-vscode`: 保存時自動フォーマット

`.vscode/settings.json` (リポジトリに含めて設定を共有):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

## 記事執筆ガイドライン

技術記事は **Zenn** で執筆・公開する。ポートフォリオサイトへの反映はビルドによって自動で行われる。

### 記事公開フロー

1. Zenn で記事を執筆・公開する
2. GitHub Actions を手動トリガー（または次回 `main` push 時）でビルドを実行する
3. ビルド時に Zenn RSS フィードを取得し、記事一覧ページが自動更新される

### タグ運用

Zenn 側でのタグ設定が RSS に反映される。一貫性のあるタグ名を使用すること（`glossary.md` のタグ一覧を参照）。

## CI/CDパイプライン

### GitHub Actions ワークフロー

`main` ブランチへの push 時に自動実行:

```yaml
# .github/workflows/deploy.yml の概要
jobs:
  build-and-deploy:
    steps:
      - npm ci
      - npm run check      # 型チェック・Astroバリデーション
      - npm run lint        # ESLint
      - npm run build       # 静的ファイル生成
      - lighthouse-ci       # パフォーマンス計測 (スコア90点未満で失敗)
      - deploy to GitHub Pages
```

### 品質ゲート

以下の条件を満たさない場合はデプロイされない:

| チェック | 条件 |
|---------|------|
| `astro check` | エラーゼロ |
| ESLint | エラーゼロ |
| `astro build` | ビルド成功 |
| Lighthouse パフォーマンス | 90点以上 |
| Lighthouse アクセシビリティ | 90点以上 |
| Lighthouse SEO | 90点以上 |

## コードレビュー基準 (セルフレビュー)

個人開発のため、PRマージ前に以下の観点でセルフレビューを行う。

### 機能性
- [ ] 変更の意図通りに動作するか
- [ ] モバイル・デスクトップ両方で表示を確認したか
- [ ] リンク切れがないか

### コード品質
- [ ] 命名が明確か
- [ ] 不要なコード・コメントがないか
- [ ] TypeScript型エラーがないか (`npm run check` でパス)

### パフォーマンス
- [ ] 画像に `alt` テキストがあるか
- [ ] 不要なJavaScriptを追加していないか
- [ ] Lighthouse スコアが落ちていないか

### アクセシビリティ
- [ ] 適切なセマンティックHTMLを使っているか
- [ ] 画像に `alt` テキストがあるか
- [ ] フォームラベルが正しく設定されているか (該当する場合)

## 実装チェックリスト

新しいページ・コンポーネントを追加する際の確認事項:

### コンポーネント
- [ ] Props の型定義がある
- [ ] モバイルレスポンシブを確認した
- [ ] アクセシビリティ (ARIA属性・セマンティックHTML) を確認した
- [ ] Tailwindクラスが整理されている (可読性を優先)

### デプロイ前
- [ ] `npm run build` が成功する
- [ ] `npm run preview` でビルド結果を確認した
- [ ] Lighthouseスコアが90点以上
