import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Flexbox',
    japanese: 'フレキシブルボックス レイアウト',
    category: 'flexbox',
    shortDesc: '主に1方向（行または列）に要素を柔軟に整列・分配するレイアウトモデル。',
    detailedDesc: 'コンポーネント内のボタン並び、ナビゲーションバー、カードの横並びなど、1次元の配置や要素同士の均等配分に最も適しています。',
    exampleCode: 'display: flex;\njustify-content: space-between;\nalign-items: center;'
  },
  {
    term: 'Grid',
    japanese: 'CSSグリッド レイアウト',
    category: 'grid',
    shortDesc: '行（縦）と列（横）の2方向（2次元）を同時にマス目状に設計するレイアウトモデル。',
    detailedDesc: 'ページ全体のレイアウト枠組みや、均一なカード一覧、ダッシュボードなど、縦横両方の揃えが必要な場面で威力を発揮します。',
    exampleCode: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 16px;'
  },
  {
    term: 'Main Axis (主軸)',
    japanese: '主軸（メインアクシス）',
    category: 'flexbox',
    shortDesc: 'Flexboxで要素が並んでいく基準の方向。flex-directionで決まります。',
    detailedDesc: 'flex-direction: rowの時は「横方向（左→右）」、columnの時は「縦方向（上→下）」が主軸になります。justify-contentはこの主軸に沿って配置を調整します。',
    exampleCode: '/* 主軸を横にする */\nflex-direction: row;\njustify-content: center;'
  },
  {
    term: 'Cross Axis (交差軸)',
    japanese: '交差軸（クロスアクシス）',
    category: 'flexbox',
    shortDesc: '主軸と垂直に交わる方向。',
    detailedDesc: 'flex-direction: rowの時は「縦方向（上→下）」、columnの時は「横方向（左→右）」が交差軸になります。align-itemsはこの交差軸に沿って配置を調整します。',
    exampleCode: '/* 交差軸での揃え */\nalign-items: center;'
  },
  {
    term: 'fr (fraction)',
    japanese: 'フラクション（比率単位）',
    category: 'grid',
    shortDesc: 'Gridで利用可能な余白を分け合う「比率」を表す専用単位。',
    detailedDesc: '例えば「1fr 2fr 1fr」と指定すると、全体の幅から固定サイズやgapを引いた残りのスペースを「1 : 2 : 1」の割合で分け合います。計算の手間を省けます。',
    exampleCode: 'grid-template-columns: 1fr 2fr 1fr;'
  },
  {
    term: 'repeat()',
    japanese: '繰り返し関数',
    category: 'grid',
    shortDesc: '同じパターンのグリッド列や行を簡潔にまとめて定義するCSS関数。',
    detailedDesc: '「1fr 1fr 1fr」と書く代わりに「repeat(3, 1fr)」と短縮できます。第一引数に繰り返し回数（またはauto-fill/auto-fit）、第二引数にサイズを指定します。',
    exampleCode: 'grid-template-columns: repeat(4, 1fr);'
  },
  {
    term: 'minmax()',
    japanese: '最小値・最大値指定関数',
    category: 'grid',
    shortDesc: '要素や列の「最小サイズ」と「最大サイズ」の範囲を指定する関数。',
    detailedDesc: '「minmax(200px, 1fr)」と書くと、画面が狭いときは最低200pxを維持し、余白があるときは1frとして柔軟に伸び広がります。メディアクエリなしのレスポンシブに重宝されます。',
    exampleCode: 'grid-template-columns: repeat(3, minmax(180px, 1fr));'
  },
  {
    term: 'auto-fit',
    japanese: '自動フィット',
    category: 'grid',
    shortDesc: '親の幅に応じて、入るだけの列を自動計算して埋め尽くすキーワード。',
    detailedDesc: 'minmax()と組み合わせることで「画面幅が広ければ4列、狭くなれば3列、2列、1列」と自動的に折り返す高機能なレスポンシブグリッドが1行で完成します。',
    exampleCode: 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));'
  },
  {
    term: 'static',
    japanese: '静的配置（初期値）',
    category: 'position',
    shortDesc: 'HTMLの記述順（通常のドキュメントフロー）通りに配置されるデフォルト状態。',
    detailedDesc: 'top, left, right, bottom, z-indexなどの指定は無視されます。通常の文章やブロックと同じように自然に積み重なります。',
    exampleCode: 'position: static;'
  },
  {
    term: 'relative',
    japanese: '相対配置',
    category: 'position',
    shortDesc: '通常フローでの「本来あるはずの場所」を基準に、位置をずらす指定。',
    detailedDesc: '自分自身が元々占めていたスペースはそのまま残るため、周囲の要素は押し出されません。また、子要素の「position: absolute」の基準親（Containing Block）としても非常によく使われます。',
    exampleCode: 'position: relative;\ntop: -10px;\nleft: 15px;'
  },
  {
    term: 'absolute',
    japanese: '絶対配置',
    category: 'position',
    shortDesc: '通常のドキュメントフローから完全に外れ、基準となる先祖要素に対して固定配置。',
    detailedDesc: '元々あったスペースは消滅し、前後の要素は隙間を詰めます。基準は「positionがstatic以外（relativeなど）になっている最も近い親要素」になります。親にrelativeがないと画面全体（html/body）が基準になってしまいます。',
    exampleCode: '/* 親要素 */\nposition: relative;\n\n/* 子要素（アイコンやバッジ） */\nposition: absolute;\ntop: 8px;\nright: 8px;'
  },
  {
    term: 'fixed',
    japanese: '固定配置',
    category: 'position',
    shortDesc: '通常のドキュメントフローから外れ、ブラウザの表示領域（ビューポート）に固定。',
    detailedDesc: 'ページを上下左右にスクロールしても常に画面上の同じ位置に留まり続けます。ヘッダー固定ナビ、ページ先頭へ戻るボタン、モーダル背景などに利用されます。',
    exampleCode: 'position: fixed;\nbottom: 24px;\nright: 24px;\nz-index: 50;'
  },
  {
    term: 'sticky',
    japanese: '粘着配置',
    category: 'position',
    shortDesc: '通常はフローに従ってスクロールし、指定位置（top等）に達すると固定される。',
    detailedDesc: 'relativeとfixedの中間のような挙動です。見出しがスクロール中に画面上部に張り付き、その親コンテナの終端まで行くと一緒に押し出されて流れていきます。',
    exampleCode: 'position: sticky;\ntop: 0;\nz-index: 10;'
  },
  {
    term: 'overflow',
    japanese: 'はみ出しの制御',
    category: 'box-model',
    shortDesc: '要素の内容（テキストや画像）が指定した幅や高さを超えた時の表示方法を指定。',
    detailedDesc: '「visible（そのままはみ出す）」「hidden（隠す）」「auto（はみ出したらスクロールバーを出す）」「scroll（常にスクロール枠を表示）」があります。',
    exampleCode: 'overflow: auto;\nmax-height: 300px;'
  },
  {
    term: 'wrap (flex-wrap)',
    japanese: '折り返し制御',
    category: 'flexbox',
    shortDesc: 'Flexアイテムが親の幅を超えた時に、次の行へ折り返すかを指定するプロパティ。',
    detailedDesc: '初期値は「nowrap」ではみ出したり縮んだりします。「wrap」を指定すると、幅が足りなくなった要素が自然に改行されて複数行に並びます。',
    exampleCode: 'flex-wrap: wrap;\ngap: 16px;'
  }
];
