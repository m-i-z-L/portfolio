# M3: ブログ連携 — Zenn RSS統合とブログページ実装

> 状態: ⬜ 未着手
> 対象期間: 目安1〜2週間
> 依存: M2完了

---

## 概要

P0機能の「技術ブログ/記事一覧」を実装する。
Zenn RSS フィード (`https://zenn.dev/{username}/feed`) をビルド時に取得し、
記事一覧ページ (`/blog`) とタグ別一覧ページ (`/blog/tags/[tag]`) を静的生成する。
このマイルストーン完了でPRDのP0機能が全て実装され、サイトの主要コンテンツが揃う。

---

## 含む機能・タスク

### ユーティリティ層

- [ ] `src/utils/zenn.ts` を作成する（Zenn RSS取得・パースのユーティリティ）
  - [ ] `fetchZennArticles(): Promise<ZennArticle[]>` 関数を実装
  - [ ] RSS XML を `ZennArticle[]` 型にパース（title, url, publishedAt, tags, description）
  - [ ] `ZennArticle` インターフェースを `src/types/zenn.ts` に定義（または `src/utils/zenn.ts` 内に定義）
  - [ ] RSSの `<category>` 要素からタグ配列を取得する

### コンポーネント層

- [ ] `src/components/blog/ArticleCard.astro` を作成する
  - [ ] タイトル・投稿日・タグ一覧・概要文を表示
  - [ ] Zenn の記事URL へ外部リンク（`target="_blank" rel="noopener noreferrer"`）
- [ ] `src/components/blog/TagFilter.astro` を作成する
  - [ ] 全タグをバッジ形式で一覧表示
  - [ ] 現在選択中のタグをハイライト（アクティブスタイル）
  - [ ] 「すべて表示」リンクで `/blog` に戻る
- [ ] `src/components/common/TagBadge.astro` を作成する（任意: ArticleCardとTagFilterで共用）

### ページ層

- [ ] `src/pages/blog/index.astro` を作成する
  - [ ] ビルド時に `fetchZennArticles()` を呼び出して記事一覧を取得
  - [ ] ArticleCard・TagFilter を組み込む
  - [ ] 公開日降順でソートして表示
- [ ] `src/pages/blog/tags/[tag].astro` を作成する
  - [ ] `getStaticPaths()` で Zenn RSS の全タグからページを事前生成
  - [ ] 該当タグの記事のみを ArticleCard で表示
- [ ] `src/pages/404.astro` を作成する
  - [ ] 「ページが見つかりません」メッセージとトップページへの誘導リンクを表示

### ナビゲーション連携

- [ ] `Header.astro` に「ブログ」ナビゲーションリンクを追加する（`/blog` へのリンク）

### 品質チェック

- [ ] `npm run lint` がパスする
- [ ] `npm run check` がパスする
- [ ] `npm run build` がパスする（Zenn RSS fetch を含む）
- [ ] `/blog` でZenn記事一覧が表示されることを確認する
- [ ] タグをクリックすると `/blog/tags/[tag]` に遷移することを確認する
- [ ] 存在しないURLで404ページが表示されることを確認する

---

## 受け入れ条件

- [ ] `/blog` ページに Zenn の記事一覧がタイトル・投稿日・タグ付きで表示される
- [ ] 各記事カードをクリックすると Zenn の記事ページが新しいタブで開く
- [ ] タグをクリックすると `/blog/tags/[tag]` に遷移し、そのタグの記事のみが表示される
- [ ] 「すべて表示」リンクで `/blog` に戻れる
- [ ] カスタム404ページが表示される
- [ ] TypeScript 型エラーゼロ、ESLintエラーゼロ
- [ ] `astro build` が成功する（Zenn RSS fetch 含む）

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

> このセクションは実装中に更新する。

- **着手日**: —
- **完了日**: —
- **担当**: Yu Sasaki
