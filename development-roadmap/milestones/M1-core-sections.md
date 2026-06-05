# M1: 基盤構築 — プロジェクト初期化とコアセクション実装

> 状態: ✅ 完了
> 完了日: 2026-04-13
> 依存: なし

---

## 概要

Astro + Tailwind CSS + TypeScript によるプロジェクト基盤を構築し、
ポートフォリオのコアとなるヒーロー・スキル・職務経歴セクションを実装した。
IntersectionObserver によるスクロールアニメーションを全セクションに適用し、
職務経歴には参画プロジェクト情報の表示機能を追加した。

---

## 含む機能・タスク

### プロジェクト基盤

- [x] Astroプロジェクト初期化（`npm create astro` / 手動作成）
- [x] Tailwind CSS インテグレーション（`@astrojs/tailwind`）
- [x] TypeScript 設定（strict モード）
- [x] ESLint v9 設定（`eslint.config.js`）
- [x] Prettier 設定
- [x] `public/favicon.svg` 作成

### 共通レイアウト

- [x] `src/layouts/BaseLayout.astro` — 全ページ共通HTMLシェル
- [x] `src/components/common/Header.astro` — ナビゲーションヘッダー
- [x] `src/components/common/Footer.astro` — フッター

### コアセクション

- [x] `src/data/skills.ts` — スキルデータ定義（Skill インターフェース）
- [x] `src/components/home/SkillsSection.astro` — カテゴリ別スキル一覧
- [x] `src/data/career.ts` — 職務経歴データ定義（CareerHistory + CareerProject インターフェース）
- [x] `src/components/home/CareerSection.astro` — タイムライン + 参画プロジェクトカード
- [x] `src/components/home/HeroSection.astro` — 名前・職種・自己紹介・SNSリンク
- [x] `src/pages/index.astro` — 全セクションを組み込んだトップページ

### アニメーションUI

- [x] `tailwind.config.mjs` にカスタム `fade-up` アニメーション追加
- [x] `BaseLayout.astro` に IntersectionObserver スクリプト追加（`prefers-reduced-motion` 対応）
- [x] 各セクションへのスクロールアニメーション適用

### CI/CD 基盤

- [x] `.github/workflows/deploy.yml` — main ブランチ push で GitHub Pages へ自動デプロイ

### 品質チェック

- [x] `npm run lint` がパスする
- [x] `npm run check` がパスする
- [x] `npm run build` がパスする

---

## 受け入れ条件

- [x] トップページにヒーロー・スキル・職務経歴の3セクションが表示される
- [x] 各セクションにスクロールアニメーションが適用されている
- [x] `prefers-reduced-motion: reduce` 時にアニメーションが無効化される
- [x] 職務経歴にプロジェクト情報が表示される（プロジェクト未設定の経歴は影響なし）
- [x] TypeScript 型エラーゼロ、ESLintエラーゼロ
- [x] `astro build` が成功する

---

## KPI貢献

| KPI | 貢献内容 | 計測方法 |
|-----|---------|---------|
| サイト公開（1ヶ月以内） | 基盤構築完了によりM2〜M4への道筋確立 | — |

---

## 技術的前提条件・依存

| 種別 | 内容 | 備考 |
|------|------|------|
| 前提マイルストーン | なし | 最初のマイルストーン |

---

## 実装メモ

- `npm create astro` は既存リポジトリではインタラクティブUIが起動するため、設定ファイルを手動作成した
- `npm run check` には `@astrojs/check` パッケージの別途インストールが必要
- `animationDelay` Tailwindカスタム値は不要。Arbitrary value `[animation-delay:Xms]` で代替可能
- `CATEGORY_ORDER` 配列によるカテゴリ表示順制御は他セクションに流用可能なパターン

---

## 進捗

- **着手日**: 2026-04-12
- **完了日**: 2026-04-13
- **担当**: Yu Sasaki
