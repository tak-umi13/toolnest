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

## 多国展開の実測結果（2026-06-13、英語話者人口の上位10カ国）

136キーワード × 10カ国（US/IN/UK/PK/NG/PH/BD/CA/AU/ZA）を実測。
77/136通過・17ジャックポット。発見:

### 国別の性格（実測）
- **UK = 第2の柱**: vat calculator 201k/KD20★、mortgage 450k/KD28★、
  salary 368k/KD32★、take-home 301k(KD43)。ボリュームも CPC もある
- **オーストラリア = KDが異常に低い**: gst 110k/KD7★、superannuation
  40.5k/KD8、salary 60.5k/KD15★、mortgage 90.5k/KD22★。即勝てる市場
- **パキスタン = 第2のインド**: age calculator 301k/KD34、text repeater
  33k/KD6、percentage 33k/KD31。CPC は低い（トラフィック市場）
- **カナダ**: gpa 40.5k/KD24（構築済が刺さる）、zakat KD3、pdf merge 60.5k/KD34
- **フィリピン**: 13th month pay 8.1k/KD0、sss/philhealth KD0-12 だが
  CPC ≈ $0 — 容易だが収益性なし（トラフィック専用、低優先）
- **ナイジェリア/バングラ/南ア**: 単独では弱い。既存ツールの増分のみ

### 最重要発見
1. **zakat calculator — 8カ国同時パスの普遍ツール**: UK 14.8k/KD3/$6.55、
   PK 18.1k/KD9/$7.99、IN 22.2k/KD6、US 9.9k/KD3/$8.87、CA KD3、AU KD0。
   合計 ~73k/月、全地域 KD≤26、CPC $2.6-8.9。ムスリム人口は英語圏で
   構造的に増加 + 毎年ラマダンで需要スパイク = 恒常的上昇ニーズの典型
2. **1ツール=多国パターン**: vat（UK20%/ZA15%/NG7.5%/PH12%）、
   mortgage（UK+AU、既存EMIの数式+償還表を流用）、gst-australia
   （10%固定、既存GstCalculatorのparams化）
3. **鮮度の堀が他国にも拡張**: AUのsuper保証率は法定で段階上昇
   （2025-07から12%）、UKは毎年4月に税年度更新 — インドと同じ
   年次更新優位が効く

### 多国展開の建設キュー（スコア順）
1. zakat calculator（8カ国・KD一桁・CPC $8）
2. vat calculator（UK 201k★ + 4カ国）
3. mortgage calculator（UK 450k/KD28★ + AU 90.5k/KD22★ — EMI流用）
4. gst-calculator-australia（110k/KD7★）
5. superannuation calculator（AU 40.5k/KD8）
6. age calculator（PK 301k/KD34 ✓ + IN 9.1M/KD36 + US 673k — 世界~10M）
7. salary-to-hourly（UK KD4）+ overtime pay（US KD15）
8. UKクラスター（要税制実装・高報酬）: salary/take-home 368k+301k、
   national insurance 6.6k/KD20、student loan repayment 12.1k/KD28

## 次の建設候補（検証済み・未着工）
- tds calculator (India 8.1k/KD0)、capital gains tax calculator (US 14.8k/KD32)、
  retirement calculator (India KD7)、loan prepayment calculator (KD0-13)、
  youtube earnings calculator (KD11-16)
- pdf merge (US 135k/KD34 ★) — pdf-lib によるクライアントサイド実装は
  プライバシーの差別化になるが、依存追加の判断が必要
- ガイド: 「step up sip vs normal sip」「epf vs nps」「ssy vs ppf」
  「what is fire movement」— クラスター強化用
