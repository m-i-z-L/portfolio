# M3: ブログ連携 — Zenn RSS統合とブログページ実装

> 状態: ✅ 完了（2026-06-05）
> 対象期間: 実績 約1週間
> 依存: M1完了（M2と並行して先行実装）

---

## 概要

P0機能の「技術ブログ/記事一覧」を実装する。
Zenn RSS フィード (`https://zenn.dev/{username}/feed`) をビルド時に取得し、
記事一覧ページ (`/blog`) とタグ別一覧ページ (`/blog/tags/[tag]`) を静的生成する。
このマイルストーン完了でPRDのP0機能が全て実装され、サイトの主要コンテンツが揃う。

---

## 含む機能・タスク

### ユーティリティ層

- [x] `src/lib/zenn.ts` を作成する（Zenn RSS取得・パースのユーティリティ）
  - [x] `fetchZennArticles(): Promise<ZennArticle[]>` 関数を実装
  - [x] RSS XML を `ZennArticle[]` 型にパース（title, url, publishedAt, tags, description）
  - [x] `ZennArticle` インターフェースを `src/lib/zenn.ts` 内に定義
  - [x] RSSの `<category>` 要素からタグ配列を取得する
  - [x] fetch失敗時に `console.warn` + 空配列返却のフォールバック

### コンポーネント層

- [x] `src/components/blog/ArticleCard.astro` を作成する
  - [x] タイトル・投稿日・タグ一覧・概要文を表示
  - [x] Zenn の記事URL へ外部リンク（`target="_blank" rel="noopener noreferrer"`）
  - [x] `animate-on-scroll` クラスで登場アニメーションを付与
- [x] `src/components/blog/TagFilter.astro` を作成する
  - [x] 全タグをバッジ形式で一覧表示
  - [x] 現在選択中のタグをハイライト（アクティブスタイル）
  - [x] 「すべて表示」リンクで `/blog` に戻る
  - [x] `import.meta.env.BASE_URL` でパスを生成（BASE_URL末尾スラッシュ対応済み）
- [x] `src/components/home/BlogSection.astro` を作成する（トップページ直近記事プレビュー）

### ページ層

- [x] `src/pages/blog/index.astro` を作成する
  - [x] ビルド時に `fetchZennArticles()` を呼び出して記事一覧を取得
  - [x] ArticleCard・TagFilter を組み込む
  - [x] 公開日降順でソートして表示
  - [x] 記事0件時のフォールバックメッセージ
- [x] `src/pages/blog/tags/[tag].astro` を作成する
  - [x] `getStaticPaths()` で Zenn RSS の全タグからページを事前生成
  - [x] 該当タグの記事のみを ArticleCard で表示

### 品質チェック

- [x] `npm run lint` がパスする
- [x] `npm run check` がパスする
- [x] `npm run build` がパスする（Zenn RSS fetch を含む）

---

## 受け入れ条件

- [x] `/blog` ページに Zenn の記事一覧がタイトル・投稿日・タグ付きで表示される
- [x] 各記事カードをクリックすると Zenn の記事ページが新しいタブで開く
- [x] タグをクリックすると `/blog/tags/[tag]` に遷移し、そのタグの記事のみが表示される
- [x] 「すべて表示」リンクで `/blog` に戻れる
- [x] TypeScript 型エラーゼロ、ESLintエラーゼロ
- [x] `astro build` が成功する（Zenn RSS fetch 含む）
- [x] トップページに直近記事プレビューセクションが表示される

---

## KPI貢献

| KPI | 貢献内容 | 計測方法 |
|-----|---------|---------|
| 技術記事公開数（3ヶ月5記事以上） | Zenn連携後は記事公開 → ビルドで自動反映。記事追加のたびに再ビルドが不要 | `/blog` の記事件数で確認 |
| サイト公開（1ヶ月以内） | P0機能が揃い、M4公開に向けて全コンテンツが完成する | — |

---

## 技術的前提条件・依存

| 種別 | 内容 | 備考 |
|------|------|------|
| 前提マイルストーン | M2: コンテンツ完成 | トップページが完成していること |
| 外部サービス | Zenn RSS (`zenn.dev/{username}/feed`) | ビルド時のみfetch。ユーザー名を確認すること |
| ゼロJS方針 | TagFilter は URLベース遷移で実装 | クライアントサイドJSを使わずに絞り込みを実現 |

---

## 実装メモ

- `fetchZennArticles()` は `src/utils/zenn.ts` に集約する。Zenn RSSのスキーマが変わった場合の修正箇所を1箇所に留めるため
- RSS の `<pubDate>` は RFC 2822 形式（例: `"Mon, 12 Apr 2026 00:00:00 +0000"`）。`new Date(pubDate)` でパース可能
- タグは `<category>` 要素から取得。Zennの記事でタグが未設定の場合は空配列になる
- `getStaticPaths()` でタグ別ページを生成する際、タグが空の記事は `/blog/tags/` ページを生成しない（フィルタ必要）
- 404ページのファイル名は `src/pages/404.astro`（GitHub Pagesは404.htmlを404ページとして認識する）

---

## リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Zenn RSS フィードのスキーマ変更 | 中 | `fetchZennArticles()` を集約し、修正箇所を最小化。ビルドエラーで即検知 |
| Zenn RSS fetch がビルド時にタイムアウト | 低 | Astro の fetch にタイムアウト設定を追加。フォールバックとして空配列を返す |

---

## 進捗

- **着手日**: 2026-06-05
- **完了日**: 2026-06-05（PR #3 マージ）
- **担当**: Yu Sasaki

### 実装後の振り返り

**計画と実績の差分**:
- `src/utils/zenn.ts` ではなく `src/lib/zenn.ts` に配置（`lib/` を採用）
- Node.js 環境に `DOMParser` がないため、XML パースを正規表現ベースで実装
- `getStaticPaths()` 内での fetch はビルド時に `/blog` と `/blog/tags/[tag]` で2回走る（将来的にキャッシュ化の余地あり）
- BASE_URL 末尾スラッシュ欠落バグを修正（PR #3 の fix コミット）

**学んだこと**:
- Astro SSG のビルド時 fetch は Node.js 18+ の標準 `fetch` API が使える
- `ZENN_USERNAME` が無効でも空配列返却でビルドが継続できる設計が有効

**次のマイルストーンへの申し送り**:
- `ZENN_USERNAME` を環境変数に移し `.env.sample` に追記することを M4 で検討する
- 404ページ (`src/pages/404.astro`) はブログ連携では未実装のため M4 で対応する
