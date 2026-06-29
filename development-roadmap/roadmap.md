# 開発ロードマップ

> 最終更新: 2026-06-29
> ベースドキュメント: docs/product-requirements.md, docs/architecture.md

---

## プロダクト概要

バックエンドエンジニア7年間の経験・スキル・実績を発信する個人ポートフォリオサイト。
Astro + GitHub Pages によるゼロコスト運用で、採用担当者・エンジニア仲間に技術力と人柄を直感的に伝えることを目指す。

---

## 現在地

### 実装済み機能

- [x] **Astroプロジェクト基盤** — Astro 4.x + Tailwind CSS + TypeScript + ESLint/Prettier 設定 (`.steering/20260412-ヒーローセクション`)
- [x] **共通レイアウト** — BaseLayout.astro, Header.astro, Footer.astro (`.steering/20260412-ヒーローセクション`)
- [x] **ヒーローセクション** — 名前・職種・自己紹介・GitHubリンク表示 (`.steering/20260412-ヒーローセクション`)
- [x] **スキルセクション** — skills.ts データ + カテゴリ別習熟度表示 (`.steering/20260412-スキルセクション`)
- [x] **職務経歴セクション** — career.ts データ + タイムライン表示 (`.steering/20260412-職務経歴セクション`)
- [x] **アニメーションUI** — IntersectionObserver によるスクロールアニメーション + reduced-motion 対応 (`.steering/20260412-アニメーションUI`)
- [x] **参画プロジェクト表示** — CareerProject インターフェース + 職歴内プロジェクトカード表示 (`.steering/20260413-職務経歴プロジェクト経験表示`)
- [x] **GitHub Actions 基本デプロイ** — main ブランチ push で GitHub Pages へ自動デプロイ (`.github/workflows/deploy.yml`)
- [x] **ブログ連携 (P0)** — `src/lib/zenn.ts` による Zenn RSS フェッチ、`/blog` 一覧ページ、`/blog/tags/[tag]` タグ別ページ、ArticleCard・TagFilter コンポーネント (`.steering/20260605-ブログ連携`, PR #3)
- [x] **トップページ直近記事プレビュー** — `BlogSection.astro` でホームにZenn最新記事を表示 (PR #3)

### 未実装（残作業）

- P1: 制作物セクション — `src/data/projects.ts` + `ProjectsSection.astro`
- P1: コンタクトセクション — `ContactSection.astro`（Formspree連携）
- コンテンツ: スキル・職務経歴・ヒーロー情報を実際のデータに差し替え、`src/data/profile.ts` 作成
- インフラ: CI品質ゲート強化（型チェック・lint・Lighthouse CIをワークフローに追加）
- インフラ: カスタム404ページ
- P2: ダークモード対応
- P2: OGP/SNSシェア最適化

---

## マイルストーン一覧

| # | マイルストーン | 主な機能 | KPI貢献 | 状態 |
|---|--------------|---------|---------|------|
| M1 | 基盤構築 — コアセクション実装 | プロジェクト初期化・ヒーロー・スキル・職務経歴・アニメーション | — | ✅ 完了 |
| M2 | コンテンツ完成 — 制作物・コンタクト追加 | ProjectsSection・ContactSection・実データ入力 | サイト公開 (1ヶ月以内) | ⬜ 未着手 |
| M3 | ブログ連携 — Zenn RSS統合 | /blog・/blog/tags/[tag]・ArticleCard・TagFilter・トップ記事プレビュー | 技術記事公開数 (3ヶ月5記事) | ✅ 完了 |
| M4 | リリース準備 — CI/CD強化と本番公開 | Lighthouse CI・型チェック/lint CI・404ページ | Lighthouse 90点以上・サイト公開 | ⬜ 未着手 |
| M5 | Post-MVP — ダークモード・OGP対応 | ダークモード・OGP最適化 | 月間PV・SNSシェア | ⬜ 未着手 |

---

## マイルストーン依存関係

```
M1: 基盤構築（✅ 完了）
  └── M2: コンテンツ完成（⬜ 未着手 ← 次の優先タスク）
  └── M3: ブログ連携（✅ 完了 ※ M2と並行して先行実装済み）
        └── M4: リリース準備（M2・M3完了後）
              └── M5: Post-MVP
```

---

## KPI対応表

| KPI | 対応マイルストーン | 達成条件 |
|-----|-----------------|---------|
| サイト公開（リリース日から1ヶ月以内） | M4完了時 | GitHub Pages で全ページが閲覧可能 |
| 技術記事公開数（3ヶ月以内に5記事以上） | M3完了後 | Zenn で記事公開 → ビルドで自動反映 |
| Lighthouse パフォーマンス 90点以上 | M4 | Lighthouse CI がパスする |
| 月間PV 100以上（6ヶ月後） | M5以降 | GA等で計測（任意） |

---

## 技術的前提条件・外部依存

| 依存先 | 用途 | 影響するマイルストーン | 備考 |
|--------|------|---------------------|------|
| GitHub Pages | 静的サイトホスティング | M4〜 | 無料・HTTPS自動対応 |
| GitHub Actions | CI/CDパイプライン | M4〜 | deploy.yml は既存。M4で強化 |
| Zenn RSS (`zenn.dev/{username}/feed`) | ビルド時記事取得 | M3〜 | ビルド時のみ外部fetchが必要 |
| Formspree（または同等サービス） | コンタクトフォーム送信 | M2〜 | 無料プランあり・月間制限に注意 |

---

## リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Zenn RSS フィードのスキーマ変更 | 中 | ビルドエラーで即検知。`fetchZennArticles()` ユーティリティを集約して修正箇所を最小化 |
| Lighthouse スコアが90点未満 | 中 | M4前に `npm run preview` + `npx lhci autorun` でローカル計測して先行確認 |
| Formspree 無料プランの送信上限 | 低 | ポートフォリオへの問い合わせ頻度は低いため許容範囲内 |
| GitHub Pages のビルド時間超過 | 低 | 静的サイト+Zenn RSSのみでビルドが重くなる要因はほぼなし |

---

## 詳細

各マイルストーンの詳細は `milestones/` ディレクトリを参照。

- [M1詳細](milestones/M1-core-sections.md)
- [M2詳細](milestones/M2-content-sections.md)
- [M3詳細](milestones/M3-blog-integration.md)
- [M4詳細](milestones/M4-release.md)
- [M5詳細](milestones/M5-post-mvp.md)
