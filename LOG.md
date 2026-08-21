# CSS LAB 第四弾：CSS Layout Lab 実装記録 (LOG.md)

## 1. 実装した展示一覧

CSSレイアウトの主要概念を直感的に学べる5つのインタラクティブ展示を実装しました。

1. **Flexbox Lab（1次元レイアウト展示）**
   - 複数カード（Card A〜F）を用いた動的Flexコンテナ操作
   - `flex-direction`（row, column, row-reverse, column-reverse）による主軸方向の変更
   - `justify-content`（flex-start, center, flex-end, space-between, space-around, space-evenly）による主軸配分
   - `align-items`（stretch, flex-start, center, flex-end）による交差軸揃え
   - `gap`（0px〜48px）スライダー
   - `flex-wrap`（nowrap / wrap）およびコンテナ幅リサイズシミュレーター
   - 主軸（Main Axis）と交差軸（Cross Axis）の動的ガイドライン表示（ON/OFF切替可能）

2. **Grid Lab（2次元マス目レイアウト展示）**
   - 複数カード（Item 01〜08）を用いたCSS Grid操作
   - 固定列数モード（1列、2列、3列、4列：`repeat(N, 1fr)`）
   - レスポンシブ `minmax()` モード（`repeat(auto-fit, minmax(180px, 1fr))`）
   - アイテム1の `grid-column: span 2` 拡張トグルによる2次元配置体験
   - `1fr`, `repeat()`, `minmax()`, `auto-fit` の初心者向けクイック用語解説カード

3. **Flexbox vs Grid（比較対照展示）**
   - 同一のカード一覧をFlexboxとGridで左右に並列表示
   - 端数アイテム（5枚 vs 6枚）時の最終行の挙動差（Flexboxの行末伸縮 vs Gridの厳密な列固定）
   - 双方のCSSコード並列表示とコピー機能
   - 「1次元・コンテンツ主導」vs「2次元・グリッド主導」の実践的使い分けガイドライン

4. **Position Lab（通常フローと要素配置展示）**
   - `static`, `relative`, `absolute`, `fixed`, `sticky` の全5モードの挙動シミュレーション
   - スクロール可能領域と兄弟要素を配置した「通常のドキュメントフロー」の可視化
   - `relative`: 元のスペースを残した相対移動（top / left スライダー）
   - `absolute`: 親要素の `position: relative` 有無による基準点（親 vs ビューポート）の切り替え
   - `fixed`: スクロールに追従する画面固定要素
   - `sticky`: スクロール途中で上端（top: 0）に張り付く粘着配置

5. **Break & Fix Lab（レイアウト崩壊と修正デバッグ展示）**
   - **ケース1（カードの横はみ出し）**: `flex-wrap: nowrap`（崩壊） ➔ `flex-wrap: wrap`（修正）
   - **ケース2（長文・URLによるカード破壊）**: `overflow-wrap: normal`（崩壊） ➔ `overflow-wrap: anywhere`（修正）
   - **ケース3（absolute要素の想定外移動）**: 親の `position: static`（崩壊） ➔ 親に `position: relative` 付与（修正）
   - **ケース4（高さ固定コンテナからの溢れ）**: `overflow: visible / hidden / auto / scroll` の比較体験
   - 各ケースで「壊す」「直す」ボタン、原因（なぜ壊れたか）、解決策（どう直すか）、CSS差分ハイライトを完備

6. **レイアウト用語集モーダル（クイックリファレンス）**
   - 要求された15の重要用語（Flexbox, Grid, main axis, cross axis, fr, repeat(), minmax(), auto-fit, static, relative, absolute, fixed, sticky, overflow, wrap）を網羅
   - リアルタイム検索、カテゴリ絞り込み、詳しい解説とCSS構文例

---

## 2. 主な追加機能・設計の特徴

- **リアルタイムCSSコード生成 & コピー機能**: 操作した設定が即座にシンタックスハイライト付きコードに反映され、変更行がハイライトされます。
- **コンテナ幅リサイズシミュレーター**: 実機や狭小画面での折り返し（wrap / auto-fit）挙動を手元のスライダーで即座に検証可能。
- **視覚的ガイド線（主軸・交差軸・通常フローストック）**: 見えないCSSの計算基準を視覚的なオーバーレイで明示。
- **アクセシビリティ & キーボード対応**: 全ボタン、スライダー、モーダルに固有の `id` とセマンティックなマークアップを適用。

---

## 3. レイアウト学習上の意図

- **プロパティ名暗記からの脱却**: 「このプロパティを変えると、何が基準になってどこへ動くのか」という因果関係を体感できるように設計。
- **デバッグ思考の育成**: 実務で最も遭遇する「はみ出し」「折り返されない」「変な位置に飛ぶ」といったレイアウト崩れを意図的に再現し、原因の特定手順を学べるように配慮。
- **非断定的な解説**: FlexboxとGridを対立させるのではなく、それぞれの得意分野と組み合わせの利点を理解できるように構成。

---

## 4. 実施したテスト & テスト結果

- **TypeScript型チェック (`tsc --noEmit`)**: エラー 0 件（パス）
- **本番ビルド (`npm run build`)**: 正常完了（パス）
- **Flexbox操作テスト**: `flex-direction` の反転、`justify-content` の各配置、`gap`、`flex-wrap` の反映確認
- **Grid操作テスト**: 1〜4列固定、`minmax(auto-fit)` による自動折り返し、アイテム1の `span 2` 動作確認
- **Position操作テスト**: `relative` のオフセット、`absolute` の親 relative トグル、`fixed` / `sticky` のスクロール挙動確認
- **Break & Fix操作テスト**: 4ケースすべての「壊す」「直す」操作と差分ハイライト確認
- **レスポンシブ検証**: モバイル・タブレット・PC画面でのレイアウト崩れなし

---

## 5. 判明した制約や今後の展望

- **今後の展開アイデア**:
  - `align-self` や `order` などのアイテム個別プロパティのさらなるインタラクティブ調整
  - Subgrid（サブグリッド）や CSS Container Queries（コンテナクエリ）を扱った第2弾セクションの追加
