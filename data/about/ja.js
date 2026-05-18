// About — Japanese translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: '曹県工場 · 15,000 m²' },
  { src: F('material.jpg'),     caption: '無垢材在庫 · 桐、松、オーク' },
  { src: F('1-1.jpg'),          caption: '木材準備工房' },
  { src: F('painting.jpg'),     caption: '防塵管理スプレー塗装ライン' },
  { src: F('1-3.jpg'),          caption: '蝶番取付 · 金具QC' },
  { src: F('warehouse.jpg'),    caption: '完成品倉庫 · 出荷準備完了' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: '営業オフィス · 厦門、福建省',     tag: 'オフィス' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: 'お客様をお迎えして',             tag: 'お客様' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: '海外バイヤーをお迎えして',       tag: 'お客様' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: '私たちのチーム',                 tag: 'チーム' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: '寸法切断',
    desc: '無垢材と合板はパネルソーで寸法切断されます。±0.5 mmの公差を保ち、各ブランクが次工程に完璧に適合するようにしています。' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: '形状切断',
    desc: 'CNCルーターとバンドソーが、各ボックスを定義する曲線、留め継ぎ、欠き込みを切削します。SKUごとにプログラムを保存し、再現性の高い量産に対応しています。' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: 'ホゾ切り',
    desc: '蝶番のホゾ、錠の収まり、仕切り溝をルーティングし、ノミで仕上げます。ここでの接合精度が蓋の納まりを決めます。' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: '仮組み',
    desc: '接着前にパネルを仮組みしてゲージで確認します。金具も先に試装着し、すべての適合を確認してから本組みに入ります。' },
  { n: '05', src: P('5-polishing.jpg'),       title: '研磨・サンディング',
    desc: '120 → 400までの段階的研磨で、仕上げチームが必要とする絹のような表面を作ります。エッジを面取り、コーナーをR取り、粉塵は発生源で吸引します。' },
  { n: '06', src: P('6-packaging.jpeg'),      title: '梱包・QC',
    desc: '各ボックスは検査・拭き上げ・コーナー保護材とシュリンクラップで梱包されます。カートンはご指定通りに表示 — FBA対応またはマスターカートン対応。' },
];

export const TIMELINE = [
  { year: '2021', title: '創業',
    text: 'Xiamen Chic Homeware Co.,Ltd. を厦門で登記。創業者が曹県のパートナー工房を確保し、最初の輸出パレットを発送。' },
  { year: '2022', title: '初の自社工場',
    text: '蒲蓮集鎮にて専用6,000 m²生産拠点の賃貸契約を締結。最初の欧州ワインボックスクライアントを受注。' },
  { year: '2023', title: 'Amazonブーム',
    text: 'Amazonプライベートブランド向け小ロット専用ラインを構築。年間100万個を超える出荷を達成。' },
  { year: '2024', title: 'FSC認証取得',
    text: 'FSC chain-of-custody認証を取得。工場を15,000 m²に拡張し、新たな仕上げ・QCエリアを設置。' },
  { year: '2025', title: 'グローバル展開',
    text: '40カ国以上にアクティブな顧客。OEM/ODM成長を支援するため、社内ID + 3Dモックアップチームを発足。' },
];

export const LOCATIONS = [
  {
    eyebrow: '営業オフィス',
    name: '厦門、福建省',
    role: '営業 · デザイン · 輸出書類',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, 集美区, 厦門, 福建省, 中国',
    details: [
      'アカウント管理と英語対応の営業チーム',
      '3Dレンダリング、サンプル調整、輸送予約',
      '厦門高崎国際空港から10分',
      '厦門港経由のコンテナ輸送 — 130以上の直行ルート',
    ],
  },
  {
    eyebrow: '生産工場',
    name: '曹県、山東省',
    role: '製造 · 仕上げ · QC · 梱包',
    addr: '市場監督管理局事務所北側、蒲蓮集村、蒲蓮集鎮、曹県、菏沢市、山東省、中国',
    details: [
      'CNC、レーザー、仕上げ、組立ラインを備えた15,000 m²の工場',
      '120名以上の熟練工が2交替制で勤務',
      '桐、松、竹、ウォールナット、オークへのローカルアクセス',
      '青島港・連雲港への直通鉄道コンテナサービス',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: 'ヨーロッパ',
    text: 'イギリス、ドイツ、フランス、オランダ、イタリア、スペイン — REACH準拠の仕上げ、EU植物検疫証明書を標準で発行。' },
  { flag: '🇺🇸', name: '北米',
    text: '米国とカナダ — CARB P2仕上げ、FBA対応梱包あり、毎週のLCL混載便。' },
  { flag: '🇯🇵', name: '日本',
    text: '東京、大阪、名古屋 — JIS等級の公差基準、JAS準拠ラベリングは要請に応じて対応。' },
  { flag: '🇰🇷', name: '韓国',
    text: 'ソウル、釜山 — KCマークラベリング対応、厦門から仁川・釜山港への高速航路。' },
];

export const VALUES = [
  { num: '01', title: '本物の工場、トレーダーではありません',
    text: '当社の15,000 m²の曹県工場は、Chic Homewareが直接所有・運営しています — 中間業者なし、マークアップチェーンなし、お客様と生産現場の間に伝言ゲームはありません。' },
  { num: '02', title: '小〜中規模ロット向けに設計',
    text: '多くの工場は5,000個単位の注文を希望します。当社は200〜5,000個のロットを中心に設計されており — Amazonブランド、Etsy販売者、ギフト小売、ブランドローンチに重要な数量です。' },
  { num: '03', title: '英語対応の営業',
    text: '当社の厦門オフィスは、見積もりからアートワーク、出荷書類まで、流暢な英語でプロジェクトを最後まで対応します。EU・US朝の時間帯と重なる時差で対応可能です。' },
];

export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: '認証取得済み',         pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: '2026ロードマップ',     pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: '2026ロードマップ',     pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: '進行中',               pending: true  },
];

export const COPY = {
  meta: {
    title: '会社概要 — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — 創業5年のカスタム木箱メーカー。厦門に営業オフィス、山東省曹県に15,000 m²の工場を構え、Amazonブランドや欧州・米国・日本・韓国の輸入業者にサービスを提供しています。',
    ogDescription:
      '創業5年のカスタム木箱メーカー。山東省曹県に15,000 m²工場、世界中のAmazonブランドと輸入業者にサービス提供。',
  },
  hero: {
    eyebrow: 'Xiamen Chic Homeware について',
    titleA: '5年の',
    titleEm: '木の職人技。',
    titleB: '2拠点。1つの約束。',
    sub: 'Xiamen Chic Homeware Co.,Ltd. は、現代の輸入市場に応えるカスタム木製ホームウェアメーカーです — Amazonブランド・欧州小売業者から日本・韓国の卸売業者まで対応します。深い業界ルーツを持つ若い工場：創業者主導、工場直販、輸出対応。',
  },
  stats: {
    years: '事業年数',
    floor: '工場面積',
    workers: '熟練工',
    markets: '輸出市場',
  },
  story: {
    label: '私たちのストーリー',
    titleA: '木の人々が、',
    titleEm: 'ブランドの人々のために。',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd. は2021年に創業されました</strong>。中国の木製品業界のベテランチームによる設立です。創業者は20年以上にわたり木材業界に身を置き — 曹県の木材ヤードを歩き回り、菏沢でCNCプログラムを動かし、厦門から輸出オーダーを管理した後 — 異なるやり方をするためにChicを立ち上げました。',
    p2html:
      '前提はシンプル：<strong>山東省曹県</strong>（中国木箱産業の歴史的中心地）の本物の工場と、<strong>福建省厦門</strong>（同国を代表する輸出ゲートウェイのひとつ）のモダンな営業オフィスを組み合わせる。一方は木材を、もう一方は世界を担当します。',
    p3html:
      '5年経った今、欧州・北米・日本・韓国で数百のブランドにサービスを提供しています — その中には、当社の迅速な対応と一貫した仕上がりを頼りにする多数のAmazonプライベートブランドの販売者が含まれます。',
    features: [
      '創業者主導、トレーディング会社のマージンなし',
      '工場 + 営業オフィスをひとつの会社で運営',
      'トップに20年以上の木材業界経験',
      '輸出専用に構築 — 国内転売向けではありません',
    ],
    showroomTag: 'ショールーム · 厦門',
    quote: '「曹県は世界の木箱が作られる場所です。ここから来たことを誇りに思います。」',
    showroomAlt: 'Xiamen Chic Homewareショールーム — 完成した木製品',
  },
  timeline: {
    label: '5年の歩み',
    titleA: '工房から',
    titleEm: '世界へ',
  },
  locations: {
    label: '2つの拠点',
    titleA: '厦門 +',
    titleEm: '曹県',
  },
  team: {
    label: '私たちの仲間',
    titleA: 'チーム — そして来訪する',
    titleEm: 'お客様',
    titleB: 'たち',
    intro: '私たちは厦門の創業者主導の小さなチームで、自分のボックスの作られ方を見に来るバイヤー、ブランドオーナー、Amazon販売者をお迎えするのが大好きです。',
  },
  gallery: {
    label: '工場の中',
    titleA: '私たちの',
    titleEm: '曹県拠点',
    intro: '木材ヤードから完成したクレートまで — すべての工程が一つ屋根の下、私たち自身の人間の目の届く範囲で行われます。',
  },
  production: {
    label: 'ボックスができるまで',
    titleA: '木材から玄関先までの',
    titleEm: '6つのステップ',
    intro: '当社の曹県工場から出荷されるすべての木箱は、同じ6つの生産工程を経ます。下記写真はすべて当社の工房で撮影 — ストック画像なし、第三者調達なし、すべてのカットが当社の現場で撮影されています。',
  },
  markets: {
    label: '私たちのボックスが届く場所',
    titleA: '輸出先：',
    titleEm: '先進国市場',
    intro: '当社は先進国市場への輸出に特化しています — 一貫した品質、正確な書類、定時納品が期待される国々。当社チームは英語を話し、輸出書類を仕様通りに準備し、お客様のタイムゾーンで対応します。通関での意外な事態はありません。',
    amazonHtml:
      '<strong>当社はAmazonフレンドリーなメーカーです。</strong>当社の200社以上のアクティブな顧客の大部分は、米国・英国・ドイツマーケットプレイスのAmazonプライベートブランドです。FNSKUラベル付きFBA対応カートンで出荷し、UPCバーコーディングを提供し、Amazonの梱包・容積重量規則を標準で満たします。',
  },
  values: {
    label: '私たちの働き方',
    titleA: '私たちが',
    titleEm: '違うところ',
  },
  certs: {
    label: '基準とコンプライアンス',
    title: '認証',
    paragraph:
      '当社の木材はFSC認証林業ルートから調達され、丸太からカートンまで監査記録をクリーンに保つチェーン・オブ・カスタディプログラムを運用しています。下記の追加基準は、顧客需要の拡大に応じた2026年のロードマップに含まれています。',
  },
  cta: {
    label: 'お問い合わせ',
    titleA: '一緒に',
    titleB: '作りましょう',
    sub: 'プロジェクトについて教えてください — 木材種類、サイズ、数量、ブランディング要件など。24時間以内に返信します。',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
