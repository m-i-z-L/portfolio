# M5: Post-MVP — ダークモード・OGP対応

> 状態: ⬜ 未着手
> 対象期間: 目安1〜2週間
> 依存: M4完了（本番公開後）

---

## 概要

本番公開後にユーザー体験をさらに向上させるPost-MVP機能を実装する。
PRDの P2（できれば）機能であるダークモード対応・OGP最適化と、
運用上必要になったSEO改善・アクセス解析を対象とする。
これらはサイトの本質的な価値には影響しないため、M4完了後に余裕があれば着手する。

---

## 含む機能・タスク

### OGP / SNSシェア最適化（P2）

- [ ] `BaseLayout.astro` に OGP メタタグを追加する
  - [ ] `og:title`, `og:description`, `og:image`, `og:url`, `og:type` を設定
  - [ ] Twitter Card メタタグ（`twitter:card`, `twitter:title`, `twitter:image`）を追加
- [ ] OGP 画像 (`public/images/og-image.png`) を作成する（1200×630px 推奨）
- [ ] ブログページ (`/blog`) にも個別の OGP タグを設定する

### ダークモード対応（P2）

- [ ] `tailwind.config.mjs` でダークモードを `class` 戦略に設定する
- [ ] `BaseLayout.astro` にダークモード切替スクリプトを追加する（OS設定を初期値として取得）
- [ ] ヘッダーにダークモードトグルボタンを追加する
- [ ] 全コンポーネントに `dark:` Tailwindクラスを追加する
  - [ ] HeroSection
  - [ ] SkillsSection
  - [ ] CareerSection
  - [ ] ProjectsSection
  - [ ] ContactSection
  - [ ] BlogListPage / ArticleCard

### SEO改善（任意）

- [ ] `src/pages/index.astro` の `<title>` と `<meta name="description">` を最適化する
- [ ] `sitemap.xml` を生成する（`@astrojs/sitemap` インテグレーション追加）
- [ ] `robots.txt` を `public/` に追加する

### 品質チェック

- [ ] `npm run lint` がパスする
- [ ] `npm run check` がパスする
- [ ] `npm run build` がパスする
- [ ] ダークモード切替時に全セクションが正しく表示されることを確認する
- [ ] SNSシェアプレビューツールでOGP画像・タイトルが正しく表示されることを確認する

---

## 受け入れ条件

- [ ] SNSでシェアした際にOGP画像・タイトル・説明が正しく表示される
- [ ] OS設定に応じてダークモード/ライトモードが初期表示される
- [ ] トグルボタンでダークモード/ライトモードを切り替えられる
- [ ] ダークモードで全セクションが読みやすいコントラストで表示される
- [ ] TypeScript 型エラーゼロ、ESLintエラーゼロ

---

## KPI貢献

| KPI | 貢献内容 | 計測方法 |
|-----|---------|---------|
| 月間PV 100以上（6ヶ月後） | OGP最適化によりSNSシェア時のクリック率向上 | Google Analytics 等（任意導入） |
| 記事の更新頻度（月1記事以上） | ダークモードによりエンジニア向けUX向上 | — |

---

## 技術的前提条件・依存

| 種別 | 内容 | 備考 |
|------|------|------|
| 前提マイルストーン | M4: リリース準備 | 本番公開済みであること |
| 外部サービス | なし | ダークモード・OGPは外部依存なし |

---

## 実装メモ

- ダークモードは Tailwind の `class` 戦略を使う。`localStorage` にユーザー設定を保存し、ページ遷移後も維持する
- OGP画像はCanvaや figma でシンプルなデザインを作成すれば十分
- `@astrojs/sitemap` を使う場合は `astro.config.mjs` に `site` プロパティ（本番URL）を設定する必要がある
- 検索機能（P2）は記事数が20件以上になった段階で検討する（現時点では優先度低）

---

## リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| ダークモード対応で既存コンポーネントのコントラスト比が不足 | 中 | WCAG AA 基準（4.5:1）をブラウザのコントラストチェッカーで確認しながら実装 |
| OGP画像のキャッシュが更新されない | 低 | SNSシェアデバッグツール（Twitter Card Validator等）でキャッシュをパージ |

---

## 進捗

> このセクションは実装中に更新する。

- **着手日**: —
- **完了日**: —
- **担当**: Yu Sasaki
