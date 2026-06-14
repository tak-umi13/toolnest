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
- [x] OG画像の生成（`next/og` で動的生成 — 全ページ種別に実装済み）
- [ ] DataForSEO APIキーのローテーション（チャット履歴に露出したため）

## 8. 独自ドメイン移行（toolnest.app）— パワー継承手順

**前提**: 早いほどリスク小（旧 vercel.app に権威がほぼ無いうちに移すのが理想）。
コード側は env 連動の旧→新 301 リダイレクトを実装済み（`next.config.mjs`）。
`NEXT_PUBLIC_SITE_URL` を新ドメインに切り替えた時だけ作動するので順序が重要。

**手順（この順番で）:**

1. **ドメイン取得** — レジストラで `toolnest.app` を取得（`.app` は常時HTTPS必須＝VercelのHTTPSで自動対応）。
2. **Vercelにドメイン追加** — Project → Settings → Domains で `toolnest.app` を追加。
   - apex（`toolnest.app`）を正規にする推奨。`www.toolnest.app` も追加し www→apex リダイレクトに設定。
   - Vercelが表示するDNSレコード（apexは A `76.76.21.21` または推奨のVercelネームサーバー、wwwは CNAME `cname.vercel-dns.com`）をレジストラに設定。
3. **DNS伝播 & 証明書を待つ** — Vercelのドメイン欄が「Valid Configuration」になり、`https://toolnest.app` が現行サイトを表示することを確認（この時点では旧 vercel.app も生きている）。
4. **環境変数を切替** — Vercel → Settings → Environment Variables で
   `NEXT_PUBLIC_SITE_URL = https://toolnest.app` に変更し **Redeploy**。
   - これで全ページの canonical / sitemap / robots / OG / JSON-LD が新ドメインを指す。
   - 同時に `next.config.mjs` の旧→新 301 リダイレクトが自動で有効化（旧 vercel.app は新ドメインへ転送）。
5. **検証** — `curl -I https://toolnest-lime.vercel.app/` が `301 → https://toolnest.app/` を返すこと、
   `https://toolnest.app/sitemap.xml` のURLが新ドメインになっていることを確認。
6. **Google Search Console** —
   - 新しく `toolnest.app`（ドメインプロパティ推奨）を追加してDNS TXTで認証。
   - 新サイトマップ `https://toolnest.app/sitemap.xml` を送信。
   - （任意）旧 URL-prefix プロパティで「アドレス変更ツール」→ 新ドメインを指定（301が前提）。
   - 主要URL（ホーム＋人気ツール5–10本）をURL検査→インデックス登録をリクエスト。
7. **GA4** — データストリームのURLを `toolnest.app` に更新（測定ID `G-HGB240TWVS` は不変）。
8. **その他** — `app/layout.tsx` の `verification.google` は新プロパティ認証後に不要なら整理。
   被リンク・SNS・プロフィール等のURLも順次新ドメインへ。

**注意**: 手順4（env切替）は必ず手順3（新ドメインが実際に表示される）の確認後に行うこと。
旧ドメインが生きている状態でenvを先に切り替えると、まだ繋がっていない新ドメインへ301して自滅する。
