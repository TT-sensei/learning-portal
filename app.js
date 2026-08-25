import { StorageManager } from 'https://tt-sensei.github.io/edu-components/index.js';

const items = [
  { name: 'EDU KIT', repo: 'edu-kit', category: '素材', subject: 'その他', grade: '共通基盤', desc: 'AIと人が教材制作の共通素材を選ぶための統合ハブ。', foundation: true },
  { name: 'かなどっち？', repo: 'kanadocchi-', category: '教材', subject: '国語', grade: '年長〜1年生', desc: 'は・を・へ、小さいゃゅょ・っ、のばす音を2択で学ぶ教材。' },
  { name: 'ナビキャラクター', repo: 'navi-character-', category: '素材', subject: 'その他', grade: '共通素材', desc: '6人のナビキャラクター画像とポーズ・表情素材。', foundation: true, site: true },
  { name: 'ことラボ', repo: 'kotorabo', category: '教材', subject: '国語', grade: '1〜6年生', desc: 'ことば→文→文と文→文章の4LABで、語彙・文づくり・つながり・文章表現を段階的に学ぶ。' },
  { name: 'じしょマスター', repo: 'kokugojiten', category: '教材', subject: '国語', grade: '3〜4年生中心', desc: 'つめ・行・はしらを手がかりに国語辞典を引き、五十音順や60秒チャレンジで言葉を調べる力を育てる。' },
  { name: '漢字練習・確認', repo: 'kanjiapp', category: '教材', subject: '国語', grade: '小学生', desc: '学年別の漢字を練習し、確認テストに取り組めるWebアプリ。' },
  { name: '漢字練習', repo: 'kanjirensyu', category: '教材', subject: '国語', grade: '小学生', desc: '書き込み式と文中空欄式で漢字を練習できます。' },
  { name: 'ひらがな・カタカナ', repo: 'hiraganakatakana', category: '教材', subject: '国語', grade: '1年生', desc: 'ひらがなとカタカナを楽しく練習するサイト。' },
  { name: 'インタビュー学習', repo: 'interviews-', category: '教材', subject: '国語', grade: '小学生', desc: '質問づくりや記録に使えるデジタルワークシート。' },
  { name: 'ことばさがしメーカー', repo: 'wordpuzzles-', category: 'ツール', subject: '国語', grade: '教員・小学生', desc: '好きなことばを使って、ことば探し問題を作成。' },

  { name: '1年生 さんすうワールド', repo: '1nensasuuworld', category: '教材', subject: '算数', grade: '1年生', desc: 'まちづくりを楽しみながら、1年生の算数を学ぶワールド。' },
  { name: '掛け算のひっ算', repo: 'magical-kakezan', category: '教材', subject: '算数', grade: '3〜4年生中心', desc: '2桁×1桁、2桁×2桁、3桁×2桁の筆算を、繰り上がりを意識しながらレベル別に練習する。' },
  { name: '九九ファンタジーバトル', repo: 'kuku-battle-', category: '教材', subject: '算数', grade: '2年生中心', desc: '九九1〜9の段を、のぼり・くだり・ランダムで練習。誤答記録、九九マップ、特訓、モンスター図鑑で定着を目指す。' },
  { name: 'わり算バトル', repo: 'warizanbattle', category: '教材', subject: '算数', grade: '4〜6年生', desc: 'わり算の筆算を「たてる・かける・ひく・おろす」の順番で進め、手順と計算を身につける。' },
  { name: 'わりわりアイランド', repo: 'warizanland', category: '教材', subject: '算数', grade: '4年生中心', desc: 'あまりのないわり算・あまりのあるわり算・わる数とあまりの関係を、時間チャレンジで練習する。' },
  { name: '小数マスター', repo: 'syousuumaster', category: '教材', subject: '算数', grade: '小学生', desc: '小数のしくみや計算をくり返し練習。' },
  { name: '約分クラッシュ', repo: 'yakubuncrash', category: '教材', subject: '算数', grade: '小学生', desc: '分数の約分をすばやく判断するゲーム。' },
  { name: '約分スラッシュ', repo: 'yakubunslash', category: '教材', subject: '算数', grade: '小学生', desc: '約分をゲーム形式で練習するバトル教材。' },
  { name: '分数のかけ算・わり算', repo: '-bunkakebunwari', category: '教材', subject: '算数', grade: '6年生', desc: '分数同士のかけ算とわり算を学ぶWeb教材。' },
  { name: '分数・小数計算', repo: 'bunsuuseisuukeisan', category: '教材', subject: '算数', grade: '小学生', desc: '分数や小数の計算をくり返し練習。' },
  { name: '百マス計算', repo: 'hyakumasu', category: '教材', subject: '算数', grade: '1〜6年生', desc: 'たし算・ひき算・かけ算を、100・50・30マスで練習。タイム、正答率、ミス復習、プリント作成にも対応。' },
  { name: '時計べんきょう', repo: 'tokeibenkyo', category: '教材', subject: '算数', grade: '1〜2年生', desc: '時計の針を見て時刻を読み、「時刻と時間」の基礎を練習する。' },
  { name: '文章題アドベンチャー', repo: 'bunsyo-dai', category: '教材', subject: '算数', grade: '小学生', desc: '文章題の場面を読み取り、式や答えを考える教材。' },
  { name: '数のしくみ', repo: 'kazunosikumi', category: '教材', subject: '算数', grade: '小学生', desc: '大きな数の見方や仕組みを考える算数教材。' },
  { name: '文字と式マスター', repo: 'mojisiki', category: '教材', subject: '算数', grade: '6年生', desc: '文字を使った式の意味や考え方を練習。' },
  { name: '円の面積', repo: 'enmenseki', category: '教材', subject: '算数', grade: '6年生', desc: '円の面積を段階的に学ぶアドベンチャー。' },
  { name: 'めんせき・たいせきラボ', repo: 'taiseki', category: '教材', subject: '算数', grade: '5〜6年生', desc: '面積から体積へ、公式図鑑・底面×高さ・複合図形パズル・立体ドリルで学ぶ。' },
  { name: '比のパーク', repo: 'ratiopark', category: '教材', subject: '算数', grade: '6年生', desc: '「比とその利用」を8つのゲームで練習。同じ比、比の値、穴あき比、比チェーンなどを学ぶ。' },
  { name: '立体のきほん', repo: 'rittaikihon', category: '教材', subject: '算数', grade: '小学生', desc: '立体の見方や特徴を学ぶWeb教材。' },
  { name: 'しわけくんEX', repo: 'sententaisyo', category: '教材', subject: '算数', grade: '6年生', desc: '線対称・点対称を見分け、対称の軸の本数など図形の性質をゲーム感覚で学ぶ。' },
  { name: 'ならべる？えらぶ？', repo: 'narabikumiawase', category: '教材', subject: '算数', grade: '小学生', desc: '順列と組み合わせの考え方を、場面を比べながら学ぶ。' },
  { name: '町のデータ探偵団', repo: 'detakatuyou', category: '教材', subject: '算数', grade: '6年生', desc: '5つの事件を解決しながら、散らばり・平均値・中央値・最頻値・度数分布表・ヒストグラムを学ぶ。' },

  { name: '理科ラボ 3年', repo: 'rika3nen', category: '教材', subject: '理科', grade: '3年生', desc: '生き物・植物・昆虫・風とゴム・音・光・電気・磁石などを、くらべて気づき、予想してためす。' },
  { name: '理科ラボ 4年', repo: 'rika4nen', category: '教材', subject: '理科', grade: '4年生', desc: '季節・体の動き・天気・雨水・月と星・電気・空気と水・温度を、関係を見つけて考える。' },
  { name: '理科ラボ 5年', repo: 'rika5nen', category: '教材', subject: '理科', grade: '5年生', desc: '植物、メダカ・人、天気、流れる水、物のとけ方、電磁石、ふりこを、実験準備と考察まで学ぶ。' },
  { name: '理科ラボ 6年', repo: 'rika6nen', category: '教材', subject: '理科', grade: '6年生', desc: '燃え方、体のはたらき、生物と環境、月と太陽、大地、てこ、電気、水溶液を知識・準備・考察で学ぶ。' },
  { name: '顕微鏡メモ', repo: 'kenbikyo', category: '素材', subject: '理科', grade: 'GitHubのみ', desc: '顕微鏡に関する制作準備用リポジトリ。', site: false },

  { name: 'れきし探偵団', repo: 'rekisijinbutu', category: '教材', subject: '社会', grade: '6年生中心', desc: '歴史人物と、縄文から戦後までのくらし・文化・遺跡を4択クイズで学ぶ。' },
  { name: '3年生 社会', repo: '3nensyakai', category: '教材', subject: '社会', grade: '3年生', desc: '身近な地域や社会の仕組みを学ぶWeb教材。' },
  { name: '公民くん', repo: 'kouminkun', category: '教材', subject: '社会', grade: '6年生', desc: '日本国憲法、基本的人権、三権分立、選挙、地方自治、税金を解説・問題・活用ゲームで学ぶ。' },
  { name: '三権分立・公民学習', repo: 'sankenbunritu', category: '教材', subject: '社会', grade: '6年生', desc: '現代社会や三権分立を調べ、マイノートに整理する学習サイト。' },
  { name: '日光 修学旅行事前学習', repo: 'jizen', category: '教材', subject: '社会', grade: '6年生', desc: '日光の歴史や文化を調べる修学旅行前の社会科教材。' },

  { name: '炒める調理', repo: 'itammeru', category: '教材', subject: '家庭科', grade: '小学生', desc: '炒める調理の手順やポイントを学ぶWeb教材。' },
  { name: '英検5級チャレンジ', repo: 'eiken5', category: '教材', subject: '英語', grade: '小学生', desc: '英検5級レベルの英語をクイズ形式で学ぶ教材。' },
  { name: 'くるま図鑑', repo: 'kuruma', category: '教材', subject: 'その他', grade: '小学生', desc: 'くるまをきっかけに調べたり考えたりする教材。' },

  { name: '学習の振り返り', repo: 'furikaeri', category: 'ツール', subject: 'その他', grade: '小学生', desc: '「わかる・できる・かかわる」の視点で、学習を振り返って記録する。' },
  { name: '学級活動の話し合い', repo: 'gakkatu', category: 'ツール', subject: 'その他', grade: '小学生', desc: '学級活動の話し合いを支援するWebツール。' },
  { name: 'チェック・確認ツール', repo: 'checker', category: 'ツール', subject: 'その他', grade: '小学生', desc: '学習や活動の確認に使えるシンプルなチェックツール。' },
  { name: '時数確認くん', repo: 'jisukakuninkun', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '学校の週案などの授業時数を集計・確認する教員向けツール。' },
  { name: 'わくわく指名メーカー', repo: 'wakuwaku-shimei', category: 'ツール', subject: 'その他', grade: '先生向け', desc: 'ルーレット・あみだくじ・カード・ビンゴ・グループ分けなど、教室で使える指名・抽選ツール。' },

  { name: 'edu-components', repo: 'edu-components', category: '素材', subject: 'その他', grade: '共通基盤', desc: '画面遷移、出題、判定、得点、保存、進捗を担うロジック部品集。', foundation: true },
  { name: 'edu-effects', repo: 'edu-effects', category: '素材', subject: 'その他', grade: '共通基盤', desc: '教材UI、CSS、正誤・達成・バッジ演出のカタログ。', foundation: true },
  { name: '音のレシピ', repo: 'sounds-recipe-', category: '素材', subject: 'その他', grade: '共通基盤', desc: 'Web Audio APIで使える教材向けサウンドレシピ。', foundation: true },
  { name: 'edu-assets', repo: 'edu-assets', category: '素材', subject: 'その他', grade: '共通基盤', desc: '共通・教科別バッジ、エレメント、コレクション画像。', foundation: true }
];

const storage = new StorageManager('learning-portal');
const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const resultText = document.querySelector('#resultText');
const empty = document.querySelector('#empty');
const resetButton = document.querySelector('#resetFilters');
const saved = storage.load('filters', {});
let mode = storage.load('mode', 'student');
let category = saved.category || 'all';
let subject = saved.subject || 'all';

search.value = saved.query || '';
count.textContent = items.length;
document.querySelector('#siteCount').textContent = items.filter(item => item.site !== false).length;
document.querySelector('#repoCount').textContent = items.length;

function siteUrl(item) {
  return `https://tt-sensei.github.io/${item.repo}/`;
}

function repoUrl(item) {
  return `https://github.com/TT-sensei/${item.repo}`;
}

function card(item) {
  const siteAction = item.site === false
    ? '<span class="repo-only">公開サイト準備中</span>'
    : `<a class="edu-btn edu-btn-primary card-link" href="${siteUrl(item)}" target="_blank" rel="noopener">サイトを開く <span aria-hidden="true">↗</span></a>`;
  return `<article class="card edu-card edu-card-hover">
    <div class="card-top">
      <span class="edu-badge category-badge category-${item.category}">${item.category}</span>
      <span class="subject-label">${item.subject}</span>
    </div>
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <div class="card-meta"><span class="grade">対象：${item.grade}</span><code>${item.repo}</code></div>
    <div class="card-actions">
      ${siteAction}
      <a class="edu-btn edu-btn-secondary card-link" href="${repoUrl(item)}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
}

function saveFilters() {
  storage.save('filters', { category, subject, query: search.value.trim() });
}

function render() {
  const query = search.value.trim().toLowerCase();
  const visibleItems = mode === 'student'
    ? items.filter(item => item.category === '教材' && !item.foundation)
    : items;
  const filtered = visibleItems.filter(item =>
    (mode === 'student' || category === 'all' || item.category === category) &&
    (subject === 'all' || item.subject === subject) &&
    (!query || [item.name, item.repo, item.desc, item.subject, item.grade, item.category].join(' ').toLowerCase().includes(query))
  );

  grid.innerHTML = filtered.map(card).join('');
  resultText.textContent = mode === 'student' ? `${filtered.length}つの教材` : `${filtered.length}件 / 全${items.length}件`;
  empty.hidden = filtered.length !== 0;
  resetButton.hidden = category === 'all' && subject === 'all' && !query;
  saveFilters();
}

function setMode(nextMode) {
  mode = nextMode;
  storage.save('mode', mode);
  document.body.dataset.mode = mode;
  document.querySelectorAll('.mode-tab').forEach(button => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.hero-copy').forEach(copy => { copy.hidden = !copy.classList.contains(`hero-copy-${mode}`); });
  document.querySelectorAll('.student-only').forEach(el => { el.hidden = mode !== 'student'; });
  document.querySelectorAll('.teacher-only').forEach(el => { el.hidden = mode !== 'teacher'; });
  document.querySelector('#catalogEyebrow').textContent = mode === 'student' ? 'LEARNING SITES' : 'ALL REPOSITORIES';
  document.querySelector('#catalogTitle').textContent = mode === 'student' ? '学習サイトをえらぶ' : '教材・ツール・素材';
  if (mode === 'student') {
    category = 'all';
    activateButtons('.filter', 'category', category);
  }
  render();
}

function activateButtons(selector, dataName, value) {
  document.querySelectorAll(selector).forEach(button => {
    const active = button.dataset[dataName] === value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

activateButtons('.filter', 'category', category);
activateButtons('.subject', 'subject', subject);

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  activateButtons('.filter', 'category', category);
  render();
}));

document.querySelectorAll('.subject').forEach(button => button.addEventListener('click', () => {
  subject = button.dataset.subject;
  activateButtons('.subject', 'subject', subject);
  render();
}));

document.querySelectorAll('.mode-tab').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));

search.addEventListener('input', render);
resetButton.addEventListener('click', () => {
  category = 'all';
  subject = 'all';
  search.value = '';
  activateButtons('.filter', 'category', category);
  activateButtons('.subject', 'subject', subject);
  search.focus();
  render();
});

setMode(mode === 'teacher' ? 'teacher' : 'student');
