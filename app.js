import { StorageManager } from 'https://tt-sensei.github.io/edu-components/index.js';

const items = [
  { name: 'ことラボ', repo: 'kotorabo', category: '教材', subject: '国語', grade: '小学生', desc: 'ことば・文づくり・つながり・文章を研究する国語ラボ。' },
  { name: 'じしょマスター', repo: 'kokugojiten', category: '教材', subject: '国語', grade: '中学年', desc: 'つめ・はしら・五十音順と、国語辞典のひき方を楽しく練習。' },
  { name: '漢字練習・確認', repo: 'kanjiapp', category: '教材', subject: '国語', grade: '小学生', desc: '学年別の漢字を練習し、確認テストに取り組めるWebアプリ。' },
  { name: '漢字練習', repo: 'kanjirensyu', category: '教材', subject: '国語', grade: '小学生', desc: '書き込み式と文中空欄式で漢字を練習できます。' },
  { name: 'ひらがな・カタカナ', repo: 'hiraganakatakana', category: '教材', subject: '国語', grade: '1年生', desc: 'ひらがなとカタカナを楽しく練習するサイト。' },
  { name: '発表・面接サポート', repo: 'interview-', category: '教材', subject: '国語', grade: '小学生', desc: '考えを整理して、相手に伝える準備を支える教材。' },
  { name: 'インタビュー学習', repo: 'interviews-', category: '教材', subject: '国語', grade: '小学生', desc: '質問づくりや記録に使えるデジタルワークシート。' },
  { name: 'ことばさがしメーカー', repo: 'wordpuzzles-', category: 'ツール', subject: '国語', grade: '教員・小学生', desc: '好きなことばを使って、ことば探し問題を作成。' },

  { name: '1年生 さんすうワールド', repo: '1nensasuuworld', category: '教材', subject: '算数', grade: '1年生', desc: 'まちづくりを楽しみながら、1年生の算数を学ぶワールド。' },
  { name: '掛け算のひっ算', repo: 'magical-kakezan', category: '教材', subject: '算数', grade: '小学生', desc: '掛け算のひっ算の手順を、ゲーム感覚でくり返し練習。' },
  { name: 'わり算バトル', repo: 'warizanbattle', category: '教材', subject: '算数', grade: '小学生', desc: 'わり算の筆算手順を確認しながら取り組む学習ゲーム。' },
  { name: 'わり算ランド', repo: 'warizanland', category: '教材', subject: '算数', grade: '小学生', desc: 'わり算に親しみながら練習できる学習ゲーム。' },
  { name: '小数マスター', repo: 'syousuumaster', category: '教材', subject: '算数', grade: '小学生', desc: '小数のしくみや計算をくり返し練習。' },
  { name: '約分クラッシュ', repo: 'yakubuncrash', category: '教材', subject: '算数', grade: '小学生', desc: '分数の約分をすばやく判断するゲーム。' },
  { name: '約分スラッシュ', repo: 'yakubunslash', category: '教材', subject: '算数', grade: '小学生', desc: '約分をゲーム形式で練習するバトル教材。' },
  { name: '分数のかけ算・わり算', repo: '-bunkakebunwari', category: '教材', subject: '算数', grade: '6年生', desc: '分数同士のかけ算とわり算を学ぶWeb教材。' },
  { name: '分数・小数計算', repo: 'bunsuuseisuukeisan', category: '教材', subject: '算数', grade: '小学生', desc: '分数や小数の計算をくり返し練習。' },
  { name: '百マス計算', repo: 'hyakumasu', category: '教材', subject: '算数', grade: '小学生', desc: '計算の正確さと速さを記録しながら挑戦。' },
  { name: '時計べんきょう', repo: 'tokeibenkyo', category: '教材', subject: '算数', grade: '小学生', desc: '時計の読み方を動かしながら身につける教材。' },
  { name: '文章題アドベンチャー', repo: 'bunsyo-dai', category: '教材', subject: '算数', grade: '小学生', desc: '文章題の場面を読み取り、式や答えを考える教材。' },
  { name: '数のしくみ', repo: 'kazunosikumi', category: '教材', subject: '算数', grade: '小学生', desc: '大きな数の見方や仕組みを考える算数教材。' },
  { name: '文字と式マスター', repo: 'mojisiki', category: '教材', subject: '算数', grade: '6年生', desc: '文字を使った式の意味や考え方を練習。' },
  { name: '円の面積', repo: 'enmenseki', category: '教材', subject: '算数', grade: '6年生', desc: '円の面積を段階的に学ぶアドベンチャー。' },
  { name: '体積', repo: 'taiseki', category: '教材', subject: '算数', grade: '6年生', desc: '体積の考え方を色分けやコンボで身につける。' },
  { name: '比のパーク', repo: 'ratiopark', category: '教材', subject: '算数', grade: '6年生', desc: '比を使った4つのゲームで楽しく学習。' },
  { name: '立体のきほん', repo: 'rittaikihon', category: '教材', subject: '算数', grade: '小学生', desc: '立体の見方や特徴を学ぶWeb教材。' },
  { name: 'しわけくんEX', repo: 'sententaisyo', category: '教材', subject: '算数', grade: '6年生', desc: '線対称・点対称など、図形の性質を学ぶWeb教材。' },
  { name: 'ならべる？えらぶ？', repo: 'narabikumiawase', category: '教材', subject: '算数', grade: '小学生', desc: '順列と組み合わせの考え方を、場面を比べながら学ぶ。' },
  { name: 'データ活用', repo: 'detakatuyou', category: '教材', subject: '算数', grade: '小学生', desc: '表やグラフを読み取り、データから考える教材。' },

  { name: '理科ラボ 3年', repo: 'rika3nen', category: '教材', subject: '理科', grade: '3年生', desc: '観察・実験・発見を通して理科を学ぶラボ。' },
  { name: '理科ラボ 4年', repo: 'rika4nen', category: '教材', subject: '理科', grade: '4年生', desc: '季節・天気・電気などを学ぶ理科ラボ。' },
  { name: '理科ラボ 5年', repo: 'rika5nen', category: '教材', subject: '理科', grade: '5年生', desc: '植物・天気・振り子・電磁石などを学ぶ教材。' },
  { name: '理科ラボ 6年', repo: 'rika6nen', category: '教材', subject: '理科', grade: '6年生', desc: '知識・実験準備・予想・考察をつなげて学ぶ理科ラボ。' },
  { name: '顕微鏡メモ', repo: 'kenbikyo', category: '素材', subject: '理科', grade: 'GitHubのみ', desc: '顕微鏡に関する制作準備用リポジトリ。', site: false },

  { name: '歴史人物クイズ', repo: 'rekisijinbutu', category: '教材', subject: '社会', grade: '小学生', desc: '歴史人物の知識をクイズと時代モードで確認。' },
  { name: '3年生 社会', repo: '3nensyakai', category: '教材', subject: '社会', grade: '3年生', desc: '身近な地域や社会の仕組みを学ぶWeb教材。' },
  { name: '公民くん', repo: 'kouminkun', category: '教材', subject: '社会', grade: '6年生', desc: '憲法・政治・地方自治を解説、問題、活用ゲームで学ぶ。' },
  { name: '三権分立・公民学習', repo: 'sankenbunritu', category: '教材', subject: '社会', grade: '6年生', desc: '日本国憲法や三権分立について整理して学ぶ教材。' },
  { name: '日光 修学旅行事前学習', repo: 'jizen', category: '教材', subject: '社会', grade: '6年生', desc: '日光の歴史や文化を調べる事前学習教材。' },

  { name: '炒める調理', repo: 'itammeru', category: '教材', subject: '家庭科', grade: '小学生', desc: '炒める調理の手順やポイントを学ぶWeb教材。' },
  { name: '英検5級チャレンジ', repo: 'eiken5', category: '教材', subject: '英語', grade: '小学生', desc: '英検5級レベルの英語をクイズ形式で学ぶ教材。' },
  { name: 'くるま図鑑', repo: 'kuruma', category: '教材', subject: 'その他', grade: '小学生', desc: 'くるまをきっかけに調べたり考えたりする教材。' },

  { name: '学習の振り返り', repo: 'furikaeri', category: 'ツール', subject: 'その他', grade: '小学生', desc: 'わかる・できる・かかわるの視点で学びを振り返る。' },
  { name: '学級活動の話し合い', repo: 'gakkatu', category: 'ツール', subject: 'その他', grade: '小学生', desc: '学級活動の話し合いを支援するWebツール。' },
  { name: 'チェック・確認ツール', repo: 'checker', category: 'ツール', subject: 'その他', grade: '小学生', desc: '学習や活動の確認に使えるシンプルなチェックツール。' },
  { name: '時数確認くん', repo: 'jisukakuninkun', category: 'ツール', subject: 'その他', grade: '教員向け', desc: '週案などの授業時数の集計・確認を支援。' },
  { name: 'わくわく指名メーカー', repo: 'wakuwaku-shimei', category: 'ツール', subject: 'その他', grade: '教員向け', desc: '指名、抽選、グループ分けを教室ですぐ使えるツール。' },

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
    <div class="card-meta"><span class="grade">${item.grade}</span><code>${item.repo}</code></div>
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
  const filtered = items.filter(item =>
    (category === 'all' || item.category === category) &&
    (subject === 'all' || item.subject === subject) &&
    (!query || [item.name, item.repo, item.desc, item.subject, item.grade, item.category].join(' ').toLowerCase().includes(query))
  );

  grid.innerHTML = filtered.map(card).join('');
  resultText.textContent = `${filtered.length}件 / 全${items.length}件`;
  empty.hidden = filtered.length !== 0;
  resetButton.hidden = category === 'all' && subject === 'all' && !query;
  saveFilters();
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

render();
