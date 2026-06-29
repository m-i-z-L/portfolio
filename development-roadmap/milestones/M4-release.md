# M4: リリース準備 — CI/CD強化と本番公開

> 状態: ⬜ 未着手
> 対象期間: 目安3〜5日
> 依存: M2完了・M3完了（M3は完了済み）

---

## 概要

GitHub Actions ワークフローに型チェック・lint・Lighthouse CI を追加して品質ゲートを整備し、
サイトを本番環境（GitHub Pages）へ公開する。
このマイルストーン完了でプライマリーKPI「サイト公開（1ヶ月以内）」と
「Lighthouse パフォーマンス 90点以上」が達成される。

---

## 含む機能・タスク

### CI/CD強化

- [ ] `.github/workflows/deploy.yml` を更新する
  - [ ] `npm run check`（Astro型チェック）ステップを `npm run build` の前に追加
  - [ ] `npm run lint`（ESLint）ステップを `npm run build` の前に追加
  - [ ] `npm audit --audit-level=high` ステップを追加（高リスクの脆弱性でCI失敗）
  - [ ] Lighthouse CI ステップをデプロイ後に追加（パフォーマンス・アクセシビリティ・SEO 90点未満で失敗）

### Lighthouse CI 設定

- [ ] `.lighthouserc.json` をリポジトリルートに作成する
  - [ ] パフォーマンス・アクセシビリティ・SEO の最低スコアを 90 に設定
  - [ ] 計測対象URLをGitHub Pages のURLに設定

### 本番公開

- [ ] GitHub リポジトリの Settings > Pages で GitHub Pages を有効化する（未設定の場合）
- [ ] `main` ブランチへ push し、デプロイが成功することを確認する
- [ ] 公開後にブラウザで全ページ（`/`、`/blog`、`/blog/tags/[tag]`）を確認する
- [ ] Lighthouse でパフォーマンス・アクセシビリティ・SEOがそれぞれ90点以上であることを確認する

### 品質チェック（最終確認）

- [ ] `npm run lint` がパスする
- [ ] `npm run check` がパスする
- [ ] `npm run build` がパスする
- [ ] `npm run preview` で全ページの表示を確認する
- [ ] モバイル・タブレット・デスクトップで表示を確認する
- [ ] 全リンクが正しく機能することを確認する（Zenn外部リンク含む）

---

## 受け入れ条件

- [ ] GitHub Actions でのビルド・デプロイが成功する
- [ ] ワークフローに型チェック・lint・Lighthouse CI が含まれている
- [ ] Lighthouse パフォーマンス・アクセシビリティ・SEOが各90点以上
- [ ] GitHub Pages でサイトが `https://{username}.github.io/portfolio/`（または設定URL）でアクセスできる
- [ ] 全ページ（`/`、`/blog`、`/blog/tags/[tag]`、`/404`）が正しく表示される

---

## KPI貢献

| KPI | 貢献内容 | 計測方法 |
|-----|---------|---------|
| サイト公開（1ヶ月以内） | 本番公開達成 | GitHub Pages URLでアクセス確認 |
| Lighthouse パフォーマンス 90点以上 | Lighthouse CI でCI/CDに組み込み継続的に品質維持 | GitHub Actions の Lighthouse CI ステップ |
| GitHub Pagesでの安定稼働率 99%以上 | GitHub Pages の標準機能に依存 | GitHubのService Status で確認 |

---

## 技術的前提条件・依存

| 種別 | 内容 | 備考 |
|------|------|------|
| 前提マイルストーン | M2: コンテンツ完成 | 制作物・コンタクトセクション実装が必要 |
| 前提マイルストーン | M3: ブログ連携 | ✅ 完了済み（2026-06-05） |
| 外部サービス | GitHub Pages | リポジトリの Pages 設定を有効化する必要あり |
| ツール | `@lhci/cli` | npm で追加インストール、または GitHub Actions で直接使用 |

---

## 実装メモ

- 現状の `deploy.yml` は `npm run build` と Pages デプロイのみ。型チェック・lint・Lighthouseを追加する
- Lighthouse CI はデプロイ済みURLに対して計測するため、`deploy` ジョブの後続ステップとして実行する
- ローカルでの事前確認: `npm run preview` 起動後に `npx lhci autorun` でスコアを確認できる
- `.lighthouserc.json` のURL設定は GitHub Pages のURLに合わせる（`https://{username}.github.io/portfolio/` 等）
- `npm audit` は `--audit-level=high` で高リスクのみCIを失敗させる（中・低リスクはログで確認）

---

## リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| Lighthouse スコアが90点未満 | 高 | デプロイ前に `npm run preview` + `npx lhci autorun` でローカル計測して先行確認する |
| GitHub Pages の設定が未完了 | 中 | リポジトリ Settings > Pages の設定を事前に確認する |

---

## 進捗

> このセクションは実装中に更新する。

- **着手日**: —
- **完了日**: —
- **担当**: Yu Sasaki
