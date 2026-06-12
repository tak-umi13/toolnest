# ToolNest 差別化戦略 — 乱立する汎用ツールサイトに勝つ方法

_2026-06-13 策定。DataForSEO実測データ（122キーワード・US+India）に基づく。_

## 課題認識

「無料オンラインツール」市場はコモディティ化している。カタログの広さでは
calculator.net / omnicalculator / rapidtables に勝てない。勝ち筋は
**SERPが実測で弱い場所 × 構造的に需要が伸び続ける場所** への集中。

## 3つの堀（すべて実測データで裏付け済み）

### 1. インド金融の「鮮度の堀」 — 最重要
- 実測: emi 2.74M/KD23、nps 135k/KD0、gratuity 301k/KD10、epf 27k/KD6、
  ssy 110k/KD11、step-up-sip 135k/KD15 — 巨大ボリュームなのにKDが低い
- 理由: 汎用ツールサイトはUS中心で、**毎年変わるインドの税制**
  （Union Budget）と**四半期毎に変わる小口貯蓄金利**（SSY/PPF）に追随しない
- 実装: registry の `updated`/`updateNote` → ページ上の鮮度チップ +
  JSON-LD `dateModified` + sitemap `lastmod`。**年1回のBudget対応 +
  四半期の金利確認だけで、放置型競合に対して恒常的な優位**が維持できる
- 運用: 毎年2月（Budget後）に income-tax / salary を、毎四半期に
  ssy / ppf / epf の金利を確認して `updated` を更新

### 2. 深さの堀 — 競合ウィジェットは「数字1個」
- EMI: 年次償還スケジュール表（利息の前倒し構造が見える）
- Step-up SIP: 年次成長テーブル
- 効果: 滞在時間・エンゲージメント（順位シグナル）+ 「この計算機は
  説明してくれる」という再訪理由
- 今後追加するツールも「結果+内訳テーブル+式の開示」を標準にする

### 3. 上昇需要の先回り — AI時代ユーティリティ
- token counter 5.4k/KD17（既存ツールサイトのカタログにまだ無い）
- LLM利用の拡大とともに検索数は構造的に増える。早期に建てて
  エイジングさせる

## E-E-A-T 基盤（YMYL対策）
- /about: 計算方法・出典（IT Dept / EPFO / RFC）・更新方針・連絡先
- 金融ツール全ページに免責 + /about へのリンク
- 偽レビュー・偽評価は使わない（Googleポリシー違反 = 手動対策リスク)

## 却下した方向（データが否定）
- qr code generator (KD77-83)、bmi (KD72-79)、mortgage (KD78)、
  image compressor/resizer (KD60-84)、time zone converter (KD100)、
  invoice generator (KD50+) — 数百万ボリュームでも新規ドメインでは数年勝てない
- KD<35 の規律を守る。「ボリュームの誘惑」に負けない

## 運用ループ（月次）
1. `npm run validate:keywords`（~$0.4）→ ROADMAP-keywords.md の 🔥/✅ 上位から建てる
2. GSC のインデックス被覆率・表示回数を確認、伸びた silo に guide を追加
3. 鮮度確認: 金利・税制に変更があれば該当ツールの `updated` を更新
4. クラスター完成度: 各金融ツールに最低2本の supporting guide を目指す

## 次の建設候補（検証済み・未着工）
- tds calculator (India 8.1k/KD0)、capital gains tax calculator (US 14.8k/KD32)、
  retirement calculator (India KD7)、loan prepayment calculator (KD0-13)、
  youtube earnings calculator (KD11-16)
- pdf merge (US 135k/KD34 ★) — pdf-lib によるクライアントサイド実装は
  プライバシーの差別化になるが、依存追加の判断が必要
- ガイド: 「step up sip vs normal sip」「epf vs nps」「ssy vs ppf」
  「what is fire movement」— クラスター強化用
