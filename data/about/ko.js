// About — Korean translation.
const F = (name) => '/factory/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const E = (name) => '/employees/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');
const P = (name) => '/folder/' + encodeURIComponent(name).replace(/\.(jpe?g|png)$/i, '.webp');

export const SHOWROOM_IMG = F('gemini-generated-image-nclf39nclf39nclf.jpg');

export const FACTORY_IMAGES = [
  { src: F('chic-factory.jpg'), caption: '차오현 공장 · 15,000 m²' },
  { src: F('material.jpg'),     caption: '원목 재고 · 오동나무, 소나무, 오크' },
  { src: F('1-1.jpg'),          caption: '목재 준비 작업장' },
  { src: F('painting.jpg'),     caption: '먼지 통제 스프레이 마감 라인' },
  { src: F('1-3.jpg'),          caption: '경첩 설치 · 하드웨어 QC' },
  { src: F('warehouse.jpg'),    caption: '완제품 창고 · 출하 준비 완료' },
];

export const TEAM_IMAGES = [
  { src: E('sales-office.jpg'),                     caption: '영업 사무소 · 샤먼, 푸젠성',         tag: '사무소' },
  { src: E('6c662ed6be84ad861ca777f348b94cfc.jpg'), caption: '고객 응대',                         tag: '고객' },
  { src: E('d19b7f79d2f9125e98a1ad72a78abb06.jpg'), caption: '해외 바이어 응대',                  tag: '고객' },
  { src: E('e7fd6e2eec09920a9345158e7bdfdbeb.jpg'), caption: '우리 팀',                           tag: '팀' },
];

export const PRODUCTION_STEPS = [
  { n: '01', src: P('1-cutting-to-size.jpg'), title: '치수 절단',
    desc: '원목과 합판은 패널 톱에서 치수 절단됩니다. ±0.5 mm 공차를 유지하여 모든 블랭크가 다음 공정에 완벽하게 맞도록 합니다.' },
  { n: '02', src: P('2-shape-cutting.jpg'),   title: '형상 절단',
    desc: 'CNC 라우터와 띠톱이 각 박스를 정의하는 곡선, 마이터, 리베이트를 절삭합니다. SKU별로 프로그램이 저장되어 반복 가능한 대량 생산이 가능합니다.' },
  { n: '03', src: P('3-mortise-cutting.jpg'), title: '장부홈 가공',
    desc: '경첩 장부홈, 자물쇠 포켓, 디바이더 홈을 라우팅하고 끌로 다듬습니다. 여기서의 결합 정확도가 뚜껑이 어떻게 자리할지를 결정합니다.' },
  { n: '04', src: P('4-pre-assemble.jpg'),    title: '예비 조립',
    desc: '접착 전에 패널을 가조립하고 게이지로 확인합니다. 하드웨어를 먼저 시험 설치 — 모든 결합을 확인한 후 최종 접착합니다.' },
  { n: '05', src: P('5-polishing.jpg'),       title: '광택 및 사포질',
    desc: '120 → 400까지의 다단계 사포질로 마감 팀이 필요로 하는 비단 같은 표면을 만듭니다. 모서리 부드럽게, 코너 둥글게, 먼지는 발생원에서 흡입.' },
  { n: '06', src: P('6-packaging.jpeg'),      title: '포장 및 QC',
    desc: '각 박스는 검사, 닦기, 모서리 보호재와 수축 필름으로 포장됩니다. 카톤은 사양에 맞게 라벨링됩니다 — FBA 대응 또는 마스터 카톤.' },
];

export const TIMELINE = [
  { year: '2021', title: '창립',
    text: 'Xiamen Chic Homeware Co.,Ltd. 샤먼에서 등록. 창립자가 차오현 파트너 작업장을 확보하고 최초 수출 팔레트 출하.' },
  { year: '2022', title: '첫 자체 공장',
    text: '푸리안지에 6,000 m² 전용 생산 부지 임대 계약. 첫 유럽 와인 박스 클라이언트 영입.' },
  { year: '2023', title: '아마존 부흥',
    text: '아마존 프라이빗 라벨 브랜드를 위한 소량 MOQ 전용 라인 구축. 한 해 100만 개 출하 돌파.' },
  { year: '2024', title: 'FSC 인증',
    text: 'FSC chain-of-custody 인증 획득. 공장을 15,000 m²로 확장하고 새로운 마감 및 QC 영역 마련.' },
  { year: '2025', title: '글로벌 진출',
    text: '40개국 이상의 활성 고객. OEM/ODM 성장을 지원하기 위해 사내 ID + 3D 목업 팀 출범.' },
];

export const LOCATIONS = [
  {
    eyebrow: '영업 사무소',
    name: '샤먼, 푸젠성',
    role: '영업 · 디자인 · 수출 서류',
    addr: '101, No. 8 Houweizhaiding Road, Maluan, Xinglin, 지메이구, 샤먼, 푸젠성, 중국',
    details: [
      '계정 관리 및 영어 사용 영업팀',
      '3D 렌더링, 샘플 조정, 운임 예약',
      '샤먼 가오치 국제공항에서 10분',
      '샤먼 항을 통한 컨테이너 운송 — 130개 이상의 직항 글로벌 노선',
    ],
  },
  {
    eyebrow: '생산 공장',
    name: '차오현, 산둥성',
    role: '제조 · 마감 · QC · 포장',
    addr: '시장 규제 행정 사무소 북쪽, 푸리안지 마을, 차오현, 헤쩌시, 산둥성, 중국',
    details: [
      'CNC, 레이저, 마감, 조립 라인이 있는 15,000 m² 공장',
      '2교대 생산에 120명 이상의 숙련 작업자',
      '오동나무, 소나무, 대나무, 호두나무, 오크에 대한 현지 접근',
      '칭다오 및 롄윈강 항구로의 직통 철도 컨테이너 서비스',
    ],
  },
];

export const MARKETS = [
  { flag: '🇪🇺', name: '유럽',
    text: '영국, 독일, 프랑스, 네덜란드, 이탈리아, 스페인 — REACH 준수 마감, EU 식물 검역 증명서 표준 발급.' },
  { flag: '🇺🇸', name: '북미',
    text: '미국 및 캐나다 — CARB P2 마감, FBA 준비 포장 제공, 주간 LCL 통합 운송.' },
  { flag: '🇯🇵', name: '일본',
    text: '도쿄, 오사카, 나고야 — JIS 등급 공차 표준, 요청 시 JAS 준수 라벨링.' },
  { flag: '🇰🇷', name: '한국',
    text: '서울, 부산 — KC 마크 라벨링 지원, 샤먼에서 인천 및 부산 항으로의 빠른 항만 항로.' },
];

export const VALUES = [
  { num: '01', title: '진짜 공장, 트레이더가 아닙니다',
    text: '차오현의 15,000 m² 공장은 Chic Homeware가 직접 소유하고 운영합니다 — 중간상인 없음, 마진 체인 없음, 귀하와 생산 현장 사이에 전화 게임 없음.' },
  { num: '02', title: '소·중규모 볼륨 전용 설계',
    text: '대부분의 공장은 5,000개 주문을 원합니다. 우리는 200~5,000개 사이의 생산을 중심으로 설계되었습니다 — 아마존 브랜드, Etsy 판매자, 선물 소매업체 및 브랜드 출시에 중요한 볼륨입니다.' },
  { num: '03', title: '영어 사용 영업',
    text: '샤먼 사무소가 견적부터 아트워크, 출하 서류까지 유창한 영어로 프로젝트를 처음부터 끝까지 처리합니다. EU 및 미국 오전 시간대와 시차 중첩.' },
];

export const CERTS = [
  { slug: 'fsc',      name: 'FSC',       status: '인증 완료',         pending: false },
  { slug: 'eu-reach', name: 'EU REACH',  status: '2026 로드맵',       pending: true  },
  { slug: 'carb',     name: 'CARB P2',   status: '2026 로드맵',       pending: true  },
  { slug: 'iso-9001', name: 'ISO 9001',  status: '진행 중',           pending: true  },
];

export const COPY = {
  meta: {
    title: '회사 소개 — Xiamen Chic Homeware Co.,Ltd.',
    description:
      'Xiamen Chic Homeware Co.,Ltd. — 5년 된 맞춤형 목재 박스 제조사. 샤먼에 영업 사무소, 산둥성 차오현에 15,000 m² 공장 운영. 유럽, 미국, 일본, 한국의 아마존 브랜드와 수입업체에 서비스 제공.',
    ogDescription:
      '5년 된 맞춤형 목재 박스 제조사. 산둥성 차오현에 15,000 m² 공장. 전 세계 아마존 브랜드와 수입업체에 서비스 제공.',
  },
  hero: {
    eyebrow: 'Xiamen Chic Homeware 소개',
    titleA: '5년의',
    titleEm: '목공예.',
    titleB: '두 곳. 하나의 약속.',
    sub: 'Xiamen Chic Homeware Co.,Ltd.는 현대 수입 시장에 봉사하기 위해 설계된 맞춤형 목재 홈웨어 제조사입니다 — 아마존 브랜드 소유자와 유럽 소매업체부터 일본과 한국 도매업체까지. 깊은 산업 뿌리를 가진 젊은 공장: 창립자 주도, 공장 직거래, 수출 준비 완료.',
  },
  stats: {
    years: '사업 연수',
    floor: '공장 면적',
    workers: '숙련 작업자',
    markets: '수출 시장',
  },
  story: {
    label: '우리 이야기',
    titleA: '목재인들이,',
    titleEm: '브랜드인들을 위해.',
    p1html:
      '<strong>Xiamen Chic Homeware Co.,Ltd.는 2021년에 창립되었습니다</strong>. 중국 목제품 산업 베테랑들의 팀이 설립한 회사입니다. 창립자는 차오현의 목재 야적장을 걸어 다니고, 헤쩌에서 CNC 프로그램을 운영하고, 샤먼에서 수출 주문을 관리하며 20년 이상 목재 무역에 몸담은 후 — 다른 방식으로 일하기 위해 Chic을 시작했습니다.',
    p2html:
      '전제는 단순했습니다: <strong>산둥성 차오현</strong>(중국 목재 박스 산업의 역사적 중심)의 진짜 공장과, <strong>푸젠성 샤먼</strong>(국가의 주요 수출 관문 중 하나)의 현대적인 영업 사무소를 결합하는 것. 한쪽은 목재를, 다른 쪽은 세계를 다룹니다.',
    p3html:
      '5년이 지난 지금, 우리는 유럽, 북미, 일본, 한국의 수백 개 브랜드에 서비스를 제공하고 있습니다 — 우리의 빠른 처리와 일관된 마감을 신뢰하는 다수의 아마존 프라이빗 라벨 판매자를 포함합니다.',
    features: [
      '창립자 주도, 트레이딩 회사 마진 없음',
      '공장 + 영업 사무소가 하나의 회사 아래',
      '최고 자리에 20년 이상의 목재 산업 경험',
      '수출 전용으로 설계 — 국내 재판매가 아님',
    ],
    showroomTag: '쇼룸 · 샤먼',
    quote: '"차오현은 세계의 목재 박스가 만들어지는 곳입니다. 우리는 여기 출신임을 자랑스러워합니다."',
    showroomAlt: 'Xiamen Chic Homeware 쇼룸 — 완성된 목제품',
  },
  timeline: {
    label: '5년의 여정',
    titleA: '작업장에서',
    titleEm: '전 세계로',
  },
  locations: {
    label: '두 곳',
    titleA: '샤먼 +',
    titleEm: '차오현',
  },
  team: {
    label: '우리 사람들',
    titleA: '팀 — 그리고 우리를 방문하는',
    titleEm: '고객',
    titleB: '들',
    intro: '우리는 샤먼에 있는 작은 창립자 주도 팀이며, 자신의 박스가 어떻게 만들어지는지 보러 오는 바이어, 브랜드 소유자, 아마존 판매자를 환영하는 것을 좋아합니다.',
  },
  gallery: {
    label: '공장 내부',
    titleA: '우리',
    titleEm: '차오현 부지',
    intro: '목재 야적장에서 완성된 크레이트까지 — 모든 단계가 한 지붕 아래, 우리 사람들의 눈 아래에서 일어납니다.',
  },
  production: {
    label: '박스가 만들어지는 과정',
    titleA: '목재에서 현관까지의',
    titleEm: '6단계',
    intro: '우리 차오현 공장에서 출하되는 모든 목재 박스는 동일한 6개 생산 스테이션을 거칩니다. 아래 사진은 모두 우리 작업장에서 촬영 — 스톡 이미지 없음, 제3자 소싱 없음, 모든 컷이 우리 작업장에서 찍혔습니다.',
  },
  markets: {
    label: '우리 박스가 가는 곳',
    titleA: '수출 대상:',
    titleEm: '선진국 시장',
    intro: '우리는 선진국 시장 수출에만 집중합니다 — 일관된 품질, 정확한 문서, 정시 배송을 기대하는 국가들. 우리 팀은 영어를 구사하고, 사양에 맞게 수출 서류를 준비하며, 귀하의 시간대에 맞춰 일합니다. 통관에서의 놀라움이 없습니다.',
    amazonHtml:
      '<strong>우리는 아마존 친화적인 제조사입니다.</strong> 200개 이상의 활성 고객 중 큰 비중이 미국, 영국, 독일 마켓플레이스의 아마존 프라이빗 라벨 브랜드입니다. FNSKU 라벨이 부착된 FBA 대응 카톤을 출하하고, UPC 바코드를 제공하며, 아마존의 포장 및 부피 무게 규칙을 기본으로 충족합니다.',
  },
  values: {
    label: '우리의 일하는 방식',
    titleA: '우리를',
    titleEm: '돋보이게 하는 것',
  },
  certs: {
    label: '표준 및 규정 준수',
    title: '인증',
    paragraph:
      '우리 목재는 FSC 인증 임업 채널에서 조달되며, 통나무에서 카톤까지 감사 추적을 깨끗이 유지하기 위해 chain-of-custody 프로그램을 운영합니다. 아래 나열된 추가 표준은 고객 수요 증가에 따라 2026 로드맵에 있습니다.',
  },
  cta: {
    label: '문의하기',
    titleA: '함께 무언가를',
    titleB: '만들어 봅시다',
    sub: '프로젝트에 대해 알려주세요 — 목재 종류, 크기, 수량, 브랜딩 요구사항. 24시간 이내에 답변드립니다.',
    btnWhatsapp: '💬 WhatsApp / WeChat',
  },
};
