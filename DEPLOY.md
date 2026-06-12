# ToolNest デプロイ手順（Vercel）

静的SSGサイトなので、Vercelの無料プランで十分動きます。所要時間は初回 ~15分。

## 0. 前提

- [x] `npm run build` がローカルで成功する（Next 16 / 81ページ）
- [x] `npm audit` が 0 vulnerabilities
- [x] セキュリティヘッダー設定済み（`next.config.mjs`）
- [x] `.env.local` はgitignore済み（コミットされません）

## 1. GitHubへプッシュ

```bash
# リポジトリは初期化・コミット済み。GitHubで空リポジトリを作って:
git remote add origin https://github.com/<あなたのユーザー名>/toolnest.git
git push -u origin main
```

## 2. Vercelにインポート

1. https://vercel.com/new を開き、GitHubリポジトリ `toolnest` をインポート
2. Framework Preset: **Next.js**（自動検出されます）— 設定変更は不要
3. **Environment Variables** に以下を追加:

| Name | Value | 備考 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<本番ドメイン>` | 末尾スラッシュなし。canonical/sitemap/OGの基準URL |

> DataForSEOのキーは**デプロイに不要**です（検証スクリプトはローカル実行のみ）。Vercelに登録しないでください。

4. Deploy を押す → 数分で `https://toolnest-xxx.vercel.app` が発行されます

## 3. 独自ドメイン

1. Vercelプロジェクト → Settings → Domains → ドメイン追加
2. レジストラでDNS設定（Vercelが表示するA/CNAMEレコードを設定）
3. **ドメイン確定後、`NEXT_PUBLIC_SITE_URL` を本番ドメインに更新して再デプロイ**
   （canonical・sitemap・OGタグが正しいURLになります）

## 4. 検索エンジン登録（公開直後に）

- [ ] [Google Search Console](https://search.google.com/search-console) — ドメイン所有権を確認し、`https://<ドメイン>/sitemap.xml` を送信
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters) — GSCからのインポートが最速
- [ ] 数日後、GSCのカバレッジでツールページのインデックス状況を確認

## 5. 計測と収益化（順番が重要）

1. **アナリティクス先行**: GA4 か privacy-friendly な Plausible/Umami を導入
   （`app/layout.tsx` の `<body>` にスクリプトを1つ追加するだけ）
2. **トラフィックが立ってから AdSense 申請**（コンテンツ充実後のほうが審査に通りやすい）
   承認後、`components/AdSlot.tsx` のプレースホルダーを実ユニットに差し替え
3. 金融カテゴリはアフィリエイト（ローン・証券口座）が高単価 — `categories.ts` のtier参照

## 6. 公開後の運用ループ

```bash
npm run validate:keywords   # 月1回: 順位環境の変化を確認（API課金 ~$0.3/回）
npm run roadmap:rebuild     # 無料: フィルタ変更時の再ランク
```

- ROADMAP-keywords.md の 🔥/✅ 上位からツール・ガイドを追加
- 追加方法は README の「How to add a tool」参照（レジストリに1エントリ＝1ページ）

## 7. 残タスク（ハードニング）

- [ ] CSP導入（インラインscriptをnonce化してから — テーマ初期化とJSON-LDが対象）
- [ ] OG画像の生成（`next/og` で動的生成 or 静的1枚）
- [ ] DataForSEO APIキーのローテーション（チャット履歴に露出したため）
