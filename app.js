// 外部の共通基盤の読み込みが遅い・失敗した場合も、教材一覧そのものは表示できるようにする。
// 共通基盤の応答を最大1.2秒だけ待ち、間に合わなければ互換形式（同じ保存キー・形式）の
// ローカル保存に切り替えて先に表示する。
class LocalStorageFallback {
  constructor(namespace) { this.prefix = `edu:${namespace}:`; }
  load(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? defaultValue : JSON.parse(raw);
    } catch { return defaultValue; }
  }
  save(key, value) {
    try { localStorage.setItem(this.prefix + key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
}
const StorageManager = await Promise.race([
  import('https://tt-sensei.github.io/edu-components/index.js')
    .then(module => module.StorageManager)
    .catch(() => null),
  new Promise(resolve => setTimeout(() => resolve(null), 1200)),
]).then(manager => manager || LocalStorageFallback);

const NAVI_LEARNING_SCENE_BASE = 'https://raw.githubusercontent.com/TT-sensei/navi-character-/main/assets/web/groups/learning/';
const HERO_LEARNING_SCENES = [
  'group-learning-japanese-reading.webp',
  'group-learning-japanese-discussion.webp',
  'group-learning-math-diagram.webp',
  'group-learning-math-shapes.webp',
  'group-learning-science-observation.webp',
  'group-learning-science-experiment.webp',
  'group-learning-social-map.webp',
  'group-learning-social-sources.webp',
  'group-learning-pair-consulting.webp',
  'group-learning-pair-exchange.webp'
];
let currentHeroLearningScene = '';

function setRandomHeroLearningScene() {
  const image = document.querySelector('.student-hero-art img');
  if (!image) return;

  const candidates = HERO_LEARNING_SCENES.filter(scene => scene !== currentHeroLearningScene);
  const nextScene = candidates[Math.floor(Math.random() * candidates.length)];
  currentHeroLearningScene = nextScene;
  image.src = NAVI_LEARNING_SCENE_BASE + nextScene;
}

const items = [
  { name: 'EDU KIT', repo: 'edu-kit', category: '素材', subject: 'その他', grade: '共通基盤', desc: 'AIと人が教材制作の共通素材を選ぶための統合ハブ。', foundation: true },
  { name: 'かなどっち？', repo: 'kanadocchi-', category: '教材', subject: '国語', grade: '年長〜1年生', desc: 'は・を・へ、小さいゃゅょ・っ、のばす音を2択で学ぶ教材。' },
  { name: 'こそあど！', repo: 'kosoado', category: '教材', subject: '国語', grade: '3〜4年生', desc: '場面にいる話し手・聞き手・ものや場所の関係から、「これ・それ・あれ・どれ」などの指示語を考える。' },
  { name: '熟語の組み立て', repo: 'jyukugo-sort', category: '教材', subject: '国語', grade: '6年生', desc: '熟語を見て、漢字や語の関係から成り立ちを考え、分類する学習ゲーム。' },
  { name: 'NAVIキャラクター素材サイト', repo: 'navi-character-', category: '素材', subject: 'その他', grade: '先生向け・共通素材', desc: '6人のナビキャラの通常・日常・学習・ファンタジー画像と、モンスター素材を確認できる素材サイト。', foundation: true, site: true },
  { name: 'ことばのつらなり', repo: 'bunnotsukuri', category: '教材', subject: '国語', grade: '3〜6年生中心', desc: '主語・述語・修飾語に目を向け、言葉を並べて文を組み立てる学習教材。10ステージ・111問で、ヒントや別解判定にも対応。' },
  { name: 'ことラボ', repo: 'kotorabo', category: '教材', subject: '国語', grade: '1〜6年生', desc: 'ことば→文→文と文→文章の4LABで、語彙・文づくり・つながり・文章表現を段階的に学ぶ。' },
  { name: 'ことのは ― 敬語のたしなみ ―', repo: 'keigo-kotonoha', category: '教材', subject: '国語', grade: '5〜6年生', desc: '学校生活の場面で、相手に応じた敬語を選び、敬語の使い方をジャッジしながら学ぶ。' },
  { name: 'じしょマスター', repo: 'kokugojiten', category: '教材', subject: '国語', grade: '3〜4年生中心', desc: 'つめ・行・はしらを手がかりに国語辞典を引き、五十音順や60秒チャレンジで言葉を調べる力を育てる。' },
  { name: '漢字マスター書取り練習', repo: 'kanjiapp', category: '教材', subject: '国語', grade: '1〜6年生', desc: '学年別の漢字を書いて覚え、書き取り練習と確認に取り組むWebアプリ。' },
  { name: '漢字読みファンタジー', repo: 'kanjirensyu', category: '教材', subject: '国語', grade: '1〜6年生', desc: 'ファンタジー世界を進みながら、漢字の読みを答えて楽しく練習する教材。' },
  { name: 'ローマ字ファンタジー', repo: 'typing', category: '教材', subject: '国語', grade: '3〜6年生（3年生中心）', desc: 'ローマ字を見てかなやことばを入力。NAVI Fantasyとモンスター・バトルで、ローマ字の読み書きとキーボード入力を練習する。' },
  { name: 'ひらがな・カタカナ', repo: 'hiraganakatakana', category: '教材', subject: '国語', grade: '1年生', desc: 'ひらがなとカタカナを楽しく練習するサイト。' },
  { name: 'ことばのしらべ', repo: 'kotobanosirabe', category: '教材', subject: '国語', grade: '3〜6年生中心', desc: 'ことわざ、慣用句、四字熟語、への興味を広げ理解を深める国語教材。' },
  { name: 'インタビュー学習', repo: 'interviews-', category: '教材', subject: '国語', grade: '3〜6年生（活動内容による）', desc: '質問づくりや記録に使えるデジタルワークシート。' },
  { name: 'ことばさがしメーカー', repo: 'wordpuzzles-', category: 'ツール', subject: '国語', grade: '小学生・先生向け（問題作成）', desc: '好きなことばを使って、小学生向けのことば探し問題を作成する。' },

  { name: 'すうじのぼうけん', repo: '1nensasuuworld', category: '教材', subject: '算数', grade: '1年生', desc: '1〜10の数、10の合成、数の分解、たし算、ひき算、文章問題を、ファンタジー世界の冒険とモンスター・バトルで学ぶ。' },
  { name: '掛け算のひっ算', repo: 'magical-kakezan', category: '教材', subject: '算数', grade: '3〜4年生中心', desc: '2桁×1桁、2桁×2桁、3桁×2桁の筆算を、繰り上がりを意識しながらレベル別に練習する。' },
  { name: 'たしひきファンタジーバトル', repo: 'tashi-hiki', category: '教材', subject: '算数', grade: '1年生中心', desc: 'たし算・ひき算を、問題→バトル→特訓→再挑戦の流れでくり返し練習するファンタジー教材。' },
  { name: '九九ファンタジーバトル', repo: 'kuku-battle-', category: '教材', subject: '算数', grade: '2年生中心', desc: '九九1〜9の段を、のぼり・くだり・ランダムで練習。誤答記録、九九マップ、特訓、モンスター図鑑で定着を目指す。' },
  { name: '割り算筆算バトル', repo: 'warizanbattle', category: '教材', subject: '算数', grade: '4年生中心（復習5〜6年生）', desc: 'ファンタジー世界でモンスターと戦いながら、割り算の筆算を「たてる・かける・ひく・おろす」の順番で練習する。' },
  { name: '割り算ファンタジーバトル', repo: 'warizanland', category: '教材', subject: '算数', grade: '3年生中心', desc: 'ファンタジー世界の冒険とバトルを楽しみながら、あまりのない割り算・あまりのある割り算を練習する。' },
  { name: '小数マスター', repo: 'syousuumaster', category: '教材', subject: '算数', grade: '2〜3年生中心', desc: '小数の表し方と、L↔dL・cm↔mmの単位換算を練習。' },
  { name: '約分クラッシュ', repo: 'yakubuncrash', category: '教材', subject: '算数', grade: '5年生中心', desc: '分数の約分をすばやく判断するゲーム。' },
  { name: '約分スラッシュ', repo: 'yakubunslash', category: '教材', subject: '算数', grade: '6年生（発展）', desc: '約分をゲーム形式で練習するバトル教材。' },
  { name: '分数のかけ算・わり算', repo: '-bunkakebunwari', category: '教材', subject: '算数', grade: '6年生', desc: '分数同士のかけ算とわり算を学ぶWeb教材。' },
  { name: '分数・小数計算', repo: 'bunsuuseisuukeisan', category: '教材', subject: '算数', grade: '6年生', desc: '分数と小数の計算を練習する算数教材。' },
  { name: '百マス計算', repo: 'hyakumasu', category: '教材', subject: '算数', grade: '1〜6年生', desc: 'たし算・ひき算・かけ算を、100・50・30マスで練習。タイム、正答率、ミス復習、プリント作成にも対応。' },
  { name: '時計べんきょう', repo: 'tokeibenkyo', category: '教材', subject: '算数', grade: '1〜2年生', desc: '時計の針を見て時刻を読み、「時刻と時間」の基礎を練習する。' },
  { name: 'ことばの森・立式の旅', repo: 'bunsyo-dai', category: '教材', subject: '算数', grade: '1〜3年生', desc: '文章を読んで数量の関係をつかみ、自分で式をたてる教材。1回7問、式をたてる→答えを出す二段階で立式を練習し、旅のお宝バッジも集める。' },
  { name: '数のしくみ', repo: 'kazunosikumi', category: '教材', subject: '算数', grade: '2・3年生', desc: '2・3年生向けに、数の見方や仕組みを考えながら学ぶ算数教材。' },
  { name: '文字と式マスター', repo: 'mojisiki', category: '教材', subject: '算数', grade: '6年生', desc: '文字を使った式の意味や考え方を練習。' },
  { name: 'おもさを はかろう', repo: 'omosa-hakari', category: '教材', subject: '算数', grade: '3年生中心', desc: 'はかりの目盛を見て、針が示す重さを読み取る算数教材。重さの単位と目盛の読み方を練習する。' },
  { name: '円の面積', repo: 'enmenseki', category: '教材', subject: '算数', grade: '6年生', desc: '円の面積を段階的に学ぶアドベンチャー。' },
  { name: 'めんせき・たいせきラボ', repo: 'taiseki', category: '教材', subject: '算数', grade: '5〜6年生', desc: '面積から体積へ、公式図鑑・底面×高さ・複合図形パズル・立体ドリルで学ぶ。' },
  { name: '単位研究所', repo: 'tanilabo', category: '教材', subject: '算数', grade: '3〜6年生', desc: '長さ・水のかさ・重さ・時間・面積・体積を、数と単位をセットで考えながら6つのラボで研究する。' },
  { name: '比のパーク', repo: 'ratiopark', category: '教材', subject: '算数', grade: '6年生', desc: '「比とその利用」を8つのゲームで練習。同じ比、比の値、穴あき比、比チェーンなどを学ぶ。' },
  { name: '立体のきほん', repo: 'rittaikihon', category: '教材', subject: '算数', grade: '4年生中心', desc: '立体の見方や特徴を学ぶWeb教材。' },
  { name: 'しわけくんEX', repo: 'sententaisyo', category: '教材', subject: '算数', grade: '6年生', desc: '線対称・点対称を見分け、対称の軸の本数など図形の性質をゲーム感覚で学ぶ。' },
  { name: 'ならべる？えらぶ？', repo: 'narabikumiawase', category: '教材', subject: '算数', grade: '6年生（発展的な考え方）', desc: '順列と組み合わせの考え方を、場面を比べながら学ぶ。' },
  { name: '町のデータ探偵団', repo: 'detakatuyou', category: '教材', subject: '算数', grade: '6年生', desc: '5つの事件を解決しながら、散らばり・平均値・中央値・最頻値・度数分布表・ヒストグラムを学ぶ。' },
  { name: 'P.E. kit', repo: 'P.E.-kit', category: '教材', subject: '体育', grade: '先生向け（体育授業）', desc: '得点板・対戦表・作戦ボード・記録・遅延カメラなど、体育授業で使う道具をまとめたキット。' },
  { name: '持久走チャレンジ', repo: 'jikyusou', category: '教材', subject: '体育', grade: '1〜6年生（学年・目標に応じて）', desc: '周回数と距離を記録し、個人の目標やクラスの累計を見える化する持久走記録アプリ。' },

  { name: '理科ラボ 3年', repo: 'rika3nen', category: '教材', subject: '理科', grade: '3年生', desc: '生き物・植物・昆虫・風とゴム・音・光・電気・磁石などを、くらべて気づき、予想してためす。' },
  { name: '理科ラボ 4年', repo: 'rika4nen', category: '教材', subject: '理科', grade: '4年生', desc: '季節・体の動き・天気・雨水・月と星・電気・空気と水・温度を、関係を見つけて考える。' },
  { name: '理科ラボ 5年', repo: 'rika5nen', category: '教材', subject: '理科', grade: '5年生', desc: '植物、メダカ・人、天気、流れる水、物のとけ方、電磁石、ふりこを、実験準備と考察まで学ぶ。' },
  { name: '理科ラボ 6年', repo: 'rika6nen', category: '教材', subject: '理科', grade: '6年生', desc: '燃え方、体のはたらき、生物と環境、月と太陽、大地、てこ、電気、水溶液を知識・準備・考察で学ぶ。' },
  { name: 'れきし探偵団', repo: 'rekisijinbutu', category: '教材', subject: '社会', grade: '6年生中心', desc: '歴史人物と、縄文から戦後までのくらし・文化・遺跡を4択クイズで学ぶ。' },
  { name: '歴史結び', repo: 'rekisijinbutu', path: 'history-match/', category: '教材', subject: '社会', grade: '6年生', desc: '歴史上の人物やできごとを結びつけて、関係や特徴を確かめながら学ぶ。', new: true },
  { name: '歴史順番', repo: 'rekisijinbutu', path: 'history-order/', category: '教材', subject: '社会', grade: '6年生', desc: '歴史上のできごとを順番に並べ、時代の流れや前後関係を学ぶ。', new: true },
  { name: '3年生 社会', repo: '3nensyakai', category: '教材', subject: '社会', grade: '3年生', desc: '身近な地域や社会の仕組みを学ぶWeb教材。', site: false },
  { name: '地図探検', repo: 'chizu-tanken', category: '教材', subject: '社会', grade: '3年生', desc: '地図を見ながら、地図記号や周りの施設を見つけ、場所・距離・方位を確かめて地域の様子を探る学習教材。' },
  { name: '都道府県マスター', repo: 'todoufuken', category: '教材', subject: '社会', grade: '4年生中心（復習・発展5〜6年生）', desc: '47都道府県の位置・県庁所在地・地域の特色を、地図パズルとクイズで学ぶ。' },
  { name: '公民くん', repo: 'kouminkun', category: '教材', subject: '社会', grade: '6年生', desc: '日本国憲法、基本的人権、三権分立、選挙、地方自治、税金を解説・問題・活用ゲームで学ぶ。' },
  { name: '三権分立・公民学習', repo: 'sankenbunritu', category: '教材', subject: '社会', grade: '6年生', desc: '現代社会や三権分立を調べ、マイノートに整理する学習サイト。' },
  { name: '日光 修学旅行事前学習', repo: 'jizen', category: '教材', subject: '社会', grade: '6年生', desc: '日光の歴史や文化を調べる修学旅行前の社会科教材。' },
  { name: '室町しらべ', repo: 'muromachi-shirabe', category: '教材', subject: '社会', grade: '6年生', desc: '室町時代に生まれたり広まったりした文化の中から、今に残るものを選んで調べ、ノートにまとめる社会科の調べ学習サイト。' },

  { name: '炒める調理', repo: 'itammeru', category: '教材', subject: '家庭科', grade: '5〜6年生', desc: '炒める調理の手順やポイントを学ぶWeb教材。' },
  { name: '英検5級チャレンジ', repo: 'eiken5', category: '教材', subject: '英語', grade: '小学生（英検5級相当）', desc: '語彙・会話・文のルール・短い英文を、短い問題と間違い復習で練習する。' },
  { name: 'くるまスタディ・サーキット', repo: 'kuruma', category: '教材', subject: 'その他', grade: '1〜4年生中心', desc: 'GTマシンでレースしながら、国語・算数・理科・社会の2択問題（全321問）に挑戦。ポイントをためてマシンをカスタムできる。' },
  { name: 'LIAR EYE（ライアーアイ）', repo: 'LIAR-EYE', category: '教材', subject: '国語', grade: '小学生（論理的思考・推理）', desc: '学校生活の小さな謎を、6人の発言から論理的に解き明かす推理パズル。全30問。', new: true },

  { name: '学習の振り返り', repo: 'furikaeri', category: 'ツール', subject: 'その他', grade: '小学生・先生向け', desc: '「わかる・できる・かかわる」の視点で、児童の学習の振り返りを記録する。' },
  { name: '学級活動の話し合い', repo: 'gakkatu', category: 'ツール', subject: 'その他', grade: '小学生・先生向け', desc: '学級活動の話し合いを、教員と児童が進めるためのWebツール。' },
  { name: 'チェック・確認ツール', repo: 'checker', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '宿題・プリント・作品などの提出状況を、日々の提出物と締め切り型に分けて管理する。' },
  { name: '週案作成', repo: 'jisukakuninkun', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '時間割・授業時数・お知らせなどをまとめて管理できる週案作成ツール。' },
  { name: 'わくわく指名メーカー', repo: 'wakuwaku-shimei', category: 'ツール', subject: 'その他', grade: '先生向け', desc: 'ルーレット・あみだくじ・カード・ビンゴ・グループ分けなど、教室で使える指名・抽選ツール。' },
  { name: 'プリントメーカー', repo: 'print-maker', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '授業や学習で使うプリントを作成するためのツール。' },
  { name: '自学サポート', repo: 'jigaku-supports', category: 'ツール', subject: 'その他', grade: '3〜6年生（自学支援）', desc: '教科・時間・目的から自学メニューを選び、紙のノートで進める家庭学習を支える。', student: true, featured: true },
  { name: '計算バトル・ファンタジー', repo: 'keisan-fantasy', category: 'ツール', subject: '算数', grade: '1〜6年生（収録教材による）', desc: 'たんじゅんな計算とひっ算バトルを、ひとつの入口から選べる計算学習ランチャー。', student: true, featured: true },
  { name: 'つないでアート', repo: 'tsunaide-art', category: '教材', subject: '図工', grade: '1〜6年生（表現活動）', desc: '点と点を線でつなぎ、お手本の再現やアレンジ、自由な形・模様づくりを楽しむ図工教材。' },
  { name: 'ピクセルアートメーカー', repo: 'pixel-art-maker', category: '教材', subject: '図工', grade: '1〜6年生（表現活動）', desc: 'マス目・色・構図を工夫し、ピクセルアートを制作・修正して作品にする図工ツール。' },
  { name: 'もよう工房', repo: 'moyo-maker', category: '教材', subject: '図工', grade: '1〜6年生（表現活動）', desc: '辺の長さがそろったパターンブロック5種（＋飾り3種）で、ドットにぴたっと吸着させながら模様をつくる図工ツール。30度回転、左右・回転コピー、タブレット最適化レイアウトつき。', new: true },

  { name: 'edu-components', repo: 'edu-components', category: '素材', subject: 'その他', grade: '共通基盤', desc: '画面遷移、出題、判定、得点、保存、進捗を担うロジック部品集。', foundation: true },
  { name: 'edu-effects', repo: 'edu-effects', category: '素材', subject: 'その他', grade: '共通基盤', desc: '教材UI、CSS、正誤・達成・バッジ演出のカタログ。', foundation: true },
  { name: '音のレシピ', repo: 'sounds-recipe-', category: '素材', subject: 'その他', grade: '共通基盤', desc: 'Web Audio APIで使える教材向けサウンドレシピ。', foundation: true },
  { name: 'edu-assets', repo: 'edu-assets', category: '素材', subject: 'その他', grade: '共通基盤', desc: '共通・教科別バッジ、エレメント、コレクション画像。', foundation: true },

{ name: 'たし算の筆算', repo: 'tashizan-hissan', category: '教材', subject: '算数', grade: '2〜3年生', desc: 'たし算の筆算を、くり上がりの判断とくらいごとの操作に分けて練習する算数教材。' },
{ name: 'ひき算の筆算', repo: 'hikizan-hissan', category: '教材', subject: '算数', grade: '2〜3年生', desc: 'ひき算の筆算を、くり下がりの判断とくらいごとの操作に分けて練習する算数教材。' },
{ name: '社会科ゲームブック', repo: 'shakai-gamebook', category: '教材', subject: '社会', grade: '5年生中心', desc: '読む・考える・選ぶ・結果を見る流れで、米づくりや自動車づくりを体験的に学ぶ社会科ゲームブック。' },
{ name: 'WORLD QUEST', repo: 'world-quest', category: '教材', subject: '社会', grade: '5〜6年生', desc: '国旗・地域・文化・食・自然など、いろいろな入口から世界の国を知る学習クイズ。' },
{ name: '角度ハンター ― ナビアンをつかまえろ', repo: 'kakudo-hunter', category: '教材', subject: '算数', grade: '4年生中心（復習5〜6年生）', desc: '0°の線との開きから角度を見つけるハンターモードと、分度器を使うモードで角度の大きさを身につける。' },
{ name: 'コアバトル', repo: 'core-numberbattle', category: '教材', subject: '算数', grade: '3〜6年生（計算力に応じて）', desc: '4つの数字から足し算・引き算をして、コアの数字にピッタリをねらうゲーム風の計算。' },
{ name: '読書レコード', repo: 'dokusho-record', category: '教材', subject: 'その他', grade: '1〜6年生（読書記録）', desc: '読んだ本を本棚に記録し、感想や読書目標、月・年ごとの積み重ねを振り返る。' },
{ name: 'キャリア探究ナビ', repo: 'careergakuahu', category: '教材', subject: 'その他', grade: '6年生', desc: '「自分らしく社会とかかわるために」を軸に、15時間のキャリア探究を進める学習ガイド。' },
{ name: '1問1答', repo: '1mon-1tou', category: '教材', subject: 'その他', grade: '1〜2年生（現収録問題）', desc: '現収録の国語・算数・生活の一問一答に取り組み、誤答記録・特訓・再挑戦をつなぐ学習アプリ。' },
{ name: '給食タイマー', repo: 'kyushoku-timer', category: 'ツール', subject: 'その他', grade: '学年共通（教室用）', desc: '給食準備・食事・時計・歯みがきの時間を切り替えて使える教室向けタイマー。' },
{ name: 'ファイル工房', repo: 'pdf-kit', category: 'ツール', subject: 'その他', grade: '先生向け', desc: 'PDF・画像の分割・結合・変換など、授業で使うファイル作業をまとめて行えるツール。' },
{ name: '公式の使い分け', repo: 'kousiki-siwake', category: '教材', subject: '算数', grade: '5〜6年生', desc: '図形の問題場面から、面積や体積など、どの公式を使えばよいかを考える力を育てる算数教材。' },
{ name: '倍・約数メイズ', repo: 'bai-yaku-maze', category: '教材', subject: '算数', grade: '5年生中心（復習6年生）', desc: '倍数・約数の見方を、迷路や選択問題で繰り返し練習する算数教材。' },
{ name: '看護目標メーカー', repo: 'kangomokuhyo', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '看護目標を作成・整理するための先生向けツール。' },
{ name: '音読スナップ', repo: 'ondoku', category: '教材', subject: '国語', grade: '1〜6年生（音読支援）', desc: '音読するページを端末に登録し、写真を見ながら録音・記録できる音読支援アプリ。' },
{ name: 'ものさしハンター', repo: 'nagasa-hunter', category: '教材', subject: '算数', grade: '2〜3年生中心', desc: 'ものさしを使わず、長さを目で見て当てながら、1cm・1mmの長さの感覚を身につける学習アプリ。' },
{ name: 'タングラム', repo: 'moyo-maker', path: 'tangram.html', category: '教材', subject: '算数', grade: '1〜6年生', desc: '7つのピースを回したり裏返したりして、お題の形をつくる図形パズル。お題19種類、ヒントと完成判定つき。', new: true },
{ name: '勤務管理', repo: 'kinmukanri', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '出勤・退勤、勤務時間、時間外、早出、月別集計などを端末内で管理する学校向けツール。' },
{ name: 'デジタル教科書ランチャー', repo: 'digital-textbook-launcher', category: 'ツール', subject: 'その他', grade: '先生向け', desc: '教科を入口に、登録したデジタル教科書の公式ログイン先をすぐ開けるランチャー。' }
];

const SUBJECT_ORDER = ['国語', '算数', '理科', '社会', '家庭科', '体育', '英語', '図工', 'その他'];
const CATEGORY_ORDER_FOR_TEACHERS = ['素材', 'ツール', '教材'];
const STUDENT_TITLE_RUBY = {
  '熟語の組み立て': { '熟語': 'じゅくご', '組み立て': 'くみたて' },
  'NAVIキャラクター素材サイト': { '素材': 'そざい' },
  'ローマ字ファンタジー': { '字': 'じ' },
  'ことのは ― 敬語のたしなみ ―': { '敬語': 'けいご' },
  '漢字マスター書取り練習': { '漢字': 'かんじ', '書取り': 'かきとり', '練習': 'れんしゅう' },
  '漢字読みファンタジー': { '漢字': 'かんじ', '読み': 'よみ' },
  'インタビュー学習': { '学習': 'がくしゅう' },
  '掛け算のひっ算': { '掛け算': 'かけざん' },
  '九九ファンタジーバトル': { '九九': 'くく' },
  '割り算筆算バトル': { '割り算': 'わりざん', '筆算': 'ひっさん' },
  '割り算ファンタジーバトル': { '割り算': 'わりざん' },
  '小数マスター': { '小数': 'しょうすう' },
  '約分クラッシュ': { '約分': 'やくぶん' },
  '約分スラッシュ': { '約分': 'やくぶん' },
  '分数のかけ算・わり算': { '分数': 'ぶんすう' },
  '分数・小数計算': { '分数': 'ぶんすう', '小数': 'しょうすう', '計算': 'けいさん' },
  '百マス計算': { '百': 'ひゃく', '計算': 'けいさん' },
  '時計べんきょう': { '時計': 'とけい' },
  'ことばの森・立式の旅': { '森': 'もり', '立式': 'りっしき', '旅': 'たび' },
  '数のしくみ': { '数': 'かず' },
  '文字と式マスター': { '文字': 'もじ', '式': 'しき' },
  '円の面積': { '円': 'えん', '面積': 'めんせき' },
  '単位研究所': { '単位': 'たんい', '研究所': 'けんきゅうじょ' },
  '比のパーク': { '比': 'ひ' },
  '立体のきほん': { '立体': 'りったい' },
  '町のデータ探偵団': { '町': 'まち', '探偵団': 'たんていだん' },
  '持久走チャレンジ': { '持久走': 'じきゅうそう' },
  '理科ラボ 3年': { '理科': 'りか', '年': 'ねん' },
  '理科ラボ 4年': { '理科': 'りか', '年': 'ねん' },
  '理科ラボ 5年': { '理科': 'りか', '年': 'ねん' },
  '理科ラボ 6年': { '理科': 'りか', '年': 'ねん' },
  'れきし探偵団': { '探偵団': 'たんていだん' },
  '歴史結び': { '歴史': 'れきし', '結び': 'むすび' },
  '歴史順番': { '歴史': 'れきし', '順番': 'じゅんばん' },
  '3年生 社会': { '年生': 'ねんせい', '社会': 'しゃかい' },
  '都道府県マスター': { '都道府県': 'とどうふけん' },
  '地図探検': { '地図': 'ちず', '探検': 'たんけん' },
  '公民くん': { '公民': 'こうみん' },
  '三権分立・公民学習': { '三権分立': 'さんけんぶんりつ', '公民': 'こうみん', '学習': 'がくしゅう' },
  '日光 修学旅行事前学習': { '日光': 'にっこう', '修学旅行': 'しゅうがくりょこう', '事前学習': 'じぜんがくしゅう' },
  '室町しらべ': { '室町': 'むろまち', '調べ': 'しらべ' },
  '炒める調理': { '炒める': 'いためる', '調理': 'ちょうり' },
  '英検5級チャレンジ': { '英検': 'えいけん', '級': 'きゅう' },
  '学習の振り返り': { '学習': 'がくしゅう', '振り返り': 'ふりかえり' },
  '学級活動の話し合い': { '学級活動': 'がっきゅうかつどう', '話し合い': 'はなしあい' },
  'チェック・確認ツール': { '確認': 'かくにん' },
  '週案作成': { '週案': 'しゅうあん', '作成': 'さくせい' },
  'わくわく指名メーカー': { '指名': 'しめい' },
  '自学サポート': { '自学': 'じがく' },
  '計算バトル・ファンタジー': { '計算': 'けいさん' },
  '音のレシピ': { '音': 'おと' },
  'たし算の筆算': { '筆算': 'ひっさん' },
  'ひき算の筆算': { '筆算': 'ひっさん' },
  '社会科ゲームブック': { '社会科': 'しゃかいか' },
  '角度ハンター ― ナビアンをつかまえろ': { '角度': 'かくど' },
  '読書レコード': { '読書': 'どくしょ' },
  'キャリア探究ナビ': { '探究': 'たんきゅう' },
  '1問1答': { '1問1答': 'いちもんいっとう' },
  '給食タイマー': { '給食': 'きゅうしょく' },
  'ファイル工房': { '工房': 'こうぼう' },
  'もよう工房': { '工房': 'こうぼう' },
  '公式の使い分け': { '公式': 'こうしき' },
  '倍・約数メイズ': { '倍': 'ばい', '約数': 'やくすう' },
  '看護目標メーカー': { '看護': 'かんご', '目標': 'もくひょう' },
  '音読スナップ': { '音読': 'おんどく' },
  '勤務管理': { '勤務': 'きんむ', '管理': 'かんり' },
  'デジタル教科書ランチャー': { '教科書': 'きょうかしょ' }
};

function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function addRuby(text, readings) {
  let output = escapeText(text);
  for (const [word, reading] of Object.entries(readings || {})) {
    const escapedWord = escapeText(word);
    output = output.replaceAll(escapedWord, `<ruby>${escapedWord}<rt>${escapeText(reading)}</rt></ruby>`);
  }
  return output;
}

function studentTitle(item) {
  if (mode !== 'student') return escapeText(item.name);
  return addRuby(item.name, STUDENT_TITLE_RUBY[item.name]);
}

function orderIndex(order, value) {
  const index = order.indexOf(value);
  return index === -1 ? order.length : index;
}

function gradeRank(grade) {
  if (grade.includes('年長')) return 0;
  const firstNumber = grade.match(/\d+/);
  return firstNumber ? Number(firstNumber[0]) : 99;
}

function compareItems(a, b) {
  if (mode === 'student') {
    const featuredDifference = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDifference !== 0) return featuredDifference;
  }

  if (mode === 'teacher') {
    const categoryDifference =
      orderIndex(CATEGORY_ORDER_FOR_TEACHERS, a.category) -
      orderIndex(CATEGORY_ORDER_FOR_TEACHERS, b.category);
    if (categoryDifference !== 0) return categoryDifference;

    // 素材の中では、共通基盤・NAVI素材を先にまとめる。
    const foundationDifference = Number(Boolean(b.foundation)) - Number(Boolean(a.foundation));
    if (foundationDifference !== 0) return foundationDifference;
  }

  const subjectDifference =
    orderIndex(SUBJECT_ORDER, a.subject) -
    orderIndex(SUBJECT_ORDER, b.subject);
  if (subjectDifference !== 0) return subjectDifference;

  const gradeDifference = gradeRank(a.grade) - gradeRank(b.grade);
  if (gradeDifference !== 0) return gradeDifference;

  const gradeTextDifference = a.grade.localeCompare(b.grade, 'ja');
  if (gradeTextDifference !== 0) return gradeTextDifference;

  return a.name.localeCompare(b.name, 'ja');
}

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
let grade = saved.grade || 'all';
let purpose = saved.purpose || 'all';
let newOnly = saved.newOnly === true;
let favoritesOnly = saved.favoritesOnly === true;

search.value = saved.query || '';
count.textContent = items.filter(item => item.site !== false).length;
document.querySelector('#siteCount').textContent = items.filter(item => item.site !== false).length;

function siteUrl(item) {
  const base = `https://tt-sensei.github.io/${item.repo}/`;
  return item.path ? base + item.path : base;
}

const CARD_IMAGES = {
  'LIAR-EYE': {
    src: './assets/LIAR-EYE.png',
    alt: 'LIAR EYEの推理パズル画面'
  },
  'moyo-maker': {
    src: './assets/IMG_4145.png',
    alt: 'もよう工房の教材画面'
  },
  'moyo-maker:tangram.html': {
    src: './assets/IMG_4144.jpeg',
    alt: 'タングラムの教材画面'
  },
  'keisan-fantasy': {
    src: './assets/keisan-fantasy.jpg',
    alt: '計算バトル・ファンタジーの教材画面'
  },
  typing: {
    src: './assets/typing.jpg',
    alt: 'ローマ字タイピングバトルの教材画面'
  },
  jisukakuninkun: {
    src: './assets/jisukakuninkun.jpg',
    alt: '週案メーカーの教材画面'
  },
  'rekisijinbutu:history-match/': {
    src: './assets/IMG_4137.jpeg',
    alt: '歴史結びの教材画面'
  },
  'rekisijinbutu:history-order/': {
    src: './assets/IMG_4138.jpeg',
    alt: '歴史順番の教材画面'
  },
  kuruma: {
    src: './assets/IMG_4140.jpeg',
    alt: 'くるまスタディ・サーキットの教材画面'
  }
};

const KOKUGO_CARD_REPOS = new Set([
  'kanadocchi-', 'kosoado', 'jyukugo-sort', 'bunnotsukuri', 'kotorabo',
  'keigo-kotonoha', 'kokugojiten', 'kanjiapp', 'kanjirensyu', 'typing',
  'hiraganakatakana', 'kotobanosirabe', 'interviews-', 'wordpuzzles-', 'ondoku'
]);

const MATH_CARD_REPOS = new Set([
  '1nensasuuworld', 'magical-kakezan', 'tashi-hiki', 'kuku-battle-', 'warizanbattle',
  'warizanland', 'syousuumaster', 'yakubuncrash', 'yakubunslash', '-bunkakebunwari',
  'bunsuuseisuukeisan', 'hyakumasu', 'tokeibenkyo', 'bunsyo-dai', 'kazunosikumi',
  'mojisiki', 'omosa-hakari', 'enmenseki', 'taiseki', 'tanilabo', 'ratiopark',
  'rittaikihon', 'sententaisyo', 'narabikumiawase', 'detakatuyou', 'keisan-fantasy',
  'tashizan-hissan', 'hikizan-hissan', 'kakudo-hunter', 'core-numberbattle',
  'kousiki-siwake', 'bai-yaku-maze', 'nagasa-hunter'
]);

const SCIENCE_CARD_REPOS = new Set(['rika3nen', 'rika4nen', 'rika5nen', 'rika6nen']);
const SCREENSHOT_CARD_REPOS = new Set(items.map(item => item.repo));

const FAVORITES_KEY = 'tt-sensei-learning-portal-favorites-v2';

function getFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return new Set(Array.isArray(value) ? value.filter(Boolean) : []);
  } catch (error) {
    return new Set();
  }
}

function toggleFavorite(repo) {
  const favorites = getFavorites();
  if (favorites.has(repo)) favorites.delete(repo);
  else favorites.add(repo);
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  } catch (error) {}
  updateFavoriteButtons(repo, favorites.has(repo));
  if (favoritesOnly) render();
  else sortFavorites();
}

function updateFavoriteButtons(repo, active) {
  document.querySelectorAll('.portal-favorite').forEach(button => {
    if (button.dataset.repo !== repo) return;
    button.textContent = active ? '★' : '☆';
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', active ? 'お気に入りから外す' : 'お気に入りに登録');
    button.title = active ? 'お気に入りから外す' : 'お気に入りに登録';
    button.classList.toggle('is-favorite', active);
  });
}

function sortFavorites() {
  const favorites = getFavorites();
  const cards = [...grid.querySelectorAll('.card')];
  cards.sort((a, b) => (favorites.has(b.dataset.repo) ? 1 : 0) - (favorites.has(a.dataset.repo) ? 1 : 0));
  cards.forEach(card => grid.appendChild(card));
}

function card(item) {
  const isFavorite = getFavorites().has(item.repo);
  const favoriteLabel = isFavorite ? 'お気に入りから外す' : 'お気に入りに登録';
  const categoryLabel = mode === 'student' ? '学習サイト' : item.category;
  const cardImage = item.noScreenshot ? null : (CARD_IMAGES[`${item.repo}:${item.path || ''}`] || CARD_IMAGES[item.repo] || (SCREENSHOT_CARD_REPOS.has(item.repo) ? {
    src: `./assets/${item.repo}.jpg`,
    alt: `${item.name}の教材画面`
  } : null));
  const siteAction = `<a class="edu-btn edu-btn-primary card-link" href="${siteUrl(item)}" target="_blank" rel="noopener">サイトを開く <span aria-hidden="true">↗</span></a>`;
  const repoAction = `<a class="edu-btn edu-btn-secondary card-link" href="https://github.com/TT-sensei/${encodeURIComponent(item.repo)}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>`;
  return `<article class="card edu-card edu-card-hover" data-subject="${item.subject}" data-repo="${item.repo}">
    <div class="card-top">
      <span class="edu-badge category-badge category-${item.category}">${categoryLabel}</span>
      <span class="card-labels"><span class="subject-label">${item.subject}</span>${item.new ? '<span class="new-label">NEW</span>' : ''}<button class="portal-favorite${isFavorite ? ' is-favorite' : ''}" type="button" data-repo="${item.repo}" aria-pressed="${isFavorite}" aria-label="${favoriteLabel}" title="${favoriteLabel}">${isFavorite ? '★' : '☆'}</button></span>
    </div>
    ${cardImage ? `<div class="card-thumb"><img src="${cardImage.src}" alt="${cardImage.alt}"></div>` : ''}
    <h3>${studentTitle(item)}</h3>
    <p>${item.desc}</p>
    <div class="card-meta"><span class="grade">対象：${item.grade}</span></div>
    <div class="card-actions${mode === 'student' ? ' card-actions-student' : ''}">
      ${siteAction}
      ${mode === 'teacher' ? repoAction : ''}
    </div>
  </article>`;
}

function saveFilters() {
  storage.save('filters', { category, subject, grade, purpose, newOnly, favoritesOnly, query: search.value.trim() });
}

function gradeMatches(item, selectedGrade) {
  if (selectedGrade === 'all') return true;
  const label = String(item.grade || '');
  if (selectedGrade === 'teacher') return /先生|教員/.test(label);
  if (selectedGrade === 'common') return /小学生/.test(label) || /1\s*[〜～-]\s*6年生/.test(label);
  if (/小学生/.test(label) && !/先生向け・共通素材/.test(label)) return true;
  const range = label.match(/(\d+)\s*[〜～-]\s*(\d+)\s*年生/);
  if (range) return Number(selectedGrade) >= Number(range[1]) && Number(selectedGrade) <= Number(range[2]);
  const listedGrades = label.match(/((?:\d+\s*[・,、]\s*)*\d+)\s*年生/);
  if (listedGrades) return listedGrades[1].split(/[・,、]/).some(value => Number(value.trim()) === Number(selectedGrade));
  return label.includes(String(selectedGrade) + '年生');
}
function purposeMatches(item, selectedPurpose) {
  if (selectedPurpose === 'all') return true;
  if (selectedPurpose === 'lesson') return item.category === '教材' && !item.foundation;
  if (selectedPurpose === 'classroom') {
    return item.category === 'ツール' && !/(作成|メーカー|生成|プリント|問題づくり|ことば探し)/.test(item.name + item.desc);
  }
  if (selectedPurpose === 'create') {
    return item.category === 'ツール' && /(作成|メーカー|生成|プリント|問題づくり|ことば探し|作る|つくる)/.test(item.name + item.desc);
  }
  if (selectedPurpose === 'assets') return item.category === '素材' || Boolean(item.foundation);
  return true;
}

function updateSceneCounts(visibleItems) {
  document.querySelectorAll('.scene-filter').forEach(button => {
    const subjectName = button.dataset.sceneSubject;
    const countElement = button.querySelector('.scene-count');
    if (!countElement) return;
    const count = visibleItems.filter(item => item.subject === subjectName && gradeMatches(item, grade)).length;
    countElement.textContent = `${count}つ`;
  });
}

function render() {
  const query = search.value.trim().toLowerCase();
  const visibleItems = mode === 'student'
    ? items.filter(item => (item.category === '教材' || item.student) && !item.foundation && item.site !== false)
    : items.filter(item => item.site !== false);
  const orderedItems = [...visibleItems].sort(compareItems);
  const filtered = orderedItems.filter(item =>
    (mode === 'student' || category === 'all' || item.category === category) &&
    (mode === 'student' || purposeMatches(item, purpose)) &&
    (subject === 'all' || item.subject === subject) &&
    gradeMatches(item, grade) &&
    (!newOnly || Boolean(item.new)) &&
    (!favoritesOnly || getFavorites().has(item.repo)) &&
    (!query || [item.name, item.desc, item.subject, item.grade, item.category].join(' ').toLowerCase().includes(query))
  );

  grid.innerHTML = filtered.map(card).join('');
  sortFavorites();
  updateSceneCounts(visibleItems);
  resultText.textContent = mode === 'student' ? `${filtered.length}つの学びのサイト` : `${filtered.length}件 / 全${visibleItems.length}件`;
  empty.hidden = filtered.length !== 0;
  resetButton.hidden = category === 'all' && subject === 'all' && grade === 'all' && (mode === 'student' || purpose === 'all') && !newOnly && !favoritesOnly && !query;
  activateSceneFilters();
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
  document.querySelector('#catalogEyebrow').textContent = mode === 'student' ? 'LEARNING SITES' : 'PUBLISHED SITES';
  document.querySelector('#catalogTitle').innerHTML = mode === 'student' ? '<ruby>学習<rt>がくしゅう</rt></ruby>サイトをえらぶ' : '教材・ツール・素材';
  renderSubjectLabels();
  if (mode === 'student') {
    setRandomHeroLearningScene();
    category = 'all';
    purpose = 'all';
    activateButtons('.filter', 'category', category);
    activateButtons('.purpose-filter, .teacher-purpose-card', 'purpose', purpose);
    if (grade === 'teacher') {
      grade = 'all';
      activateButtons('.grade-filter', 'grade', grade);
    }
  }
  render();
}

function scrollToCatalog() {
  const catalog = document.querySelector('#catalog');
  if (!catalog) return;
  catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function studentSubjectLabel(subjectName) {
  if (mode !== 'student') return escapeText(subjectName);
  const readings = {
    '国語': 'こくご',
    '算数': 'さんすう',
    '理科': 'りか',
    '社会': 'しゃかい',
    '家庭科': 'かていか',
    '体育': 'たいいく',
    '英語': 'えいご',
    '図工': 'ずこう',
    'その他': 'そのほか'
  };
  return readings[subjectName]
    ? `<ruby>${escapeText(subjectName)}<rt>${readings[subjectName]}</rt></ruby>`
    : escapeText(subjectName);
}

function renderSubjectLabels() {
  document.querySelectorAll('#subjectFilters .subject').forEach(button => {
    const value = button.dataset.subject;
    button.innerHTML = value === 'all' ? 'すべて' : studentSubjectLabel(value);
  });
  document.querySelectorAll('.scene-filter').forEach(button => {
    const value = button.dataset.sceneSubject;
    const label = button.querySelector('span b');
    if (label) label.innerHTML = studentSubjectLabel(value);
  });
  document.querySelectorAll('.filter-label').forEach(label => {
    if (label.closest('.toolbar')) {
      label.innerHTML = mode === 'student' ? '<ruby>教科<rt>きょうか</rt></ruby>' : '教科';
    }
  });
}

function activateSceneFilters() {
  document.querySelectorAll('.scene-filter').forEach(button => {
    const active = subject === button.dataset.sceneSubject;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
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
activateButtons('.grade-filter', 'grade', grade);
activateButtons('.purpose-filter, .teacher-purpose-card', 'purpose', purpose);
syncQuickFilterButtons();

function syncQuickFilterButtons() {
  document.querySelectorAll('.quick-filter').forEach(button => {
    const active = button.dataset.quickFilter === 'new' ? newOnly : favoritesOnly;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

grid.addEventListener('click', event => {
  const button = event.target.closest('.portal-favorite');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  toggleFavorite(button.dataset.repo);
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.category;
  activateButtons('.filter', 'category', category);
  render();
}));

document.querySelectorAll('.grade-filter').forEach(button => button.addEventListener('click', () => {
  grade = button.dataset.grade;
  activateButtons('.grade-filter', 'grade', grade);
  render();
}));

document.querySelectorAll('.quick-filter').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.quickFilter === 'new') newOnly = !newOnly;
  if (button.dataset.quickFilter === 'favorites') favoritesOnly = !favoritesOnly;
  syncQuickFilterButtons();
  render();
}));

document.querySelectorAll('.purpose-filter, .teacher-purpose-card').forEach(button => button.addEventListener('click', () => {
  purpose = button.dataset.purpose;
  activateButtons('.purpose-filter, .teacher-purpose-card', 'purpose', purpose);
  render();
  if (button.classList.contains('teacher-purpose-card')) scrollToCatalog();
}));

document.querySelectorAll('.subject').forEach(button => button.addEventListener('click', () => {
  subject = button.dataset.subject;
  activateButtons('.subject', 'subject', subject);
  render();
  scrollToCatalog();
}));

document.querySelectorAll('.scene-filter').forEach(button => button.addEventListener('click', () => {
  subject = button.dataset.sceneSubject;
  activateButtons('.subject', 'subject', subject);
  render();
  scrollToCatalog();
}));

document.querySelectorAll('.mode-tab').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));

search.addEventListener('input', render);
resetButton.addEventListener('click', () => {
  category = 'all';
  subject = 'all';
  grade = 'all';
  purpose = 'all';
  newOnly = false;
  favoritesOnly = false;
  search.value = '';
  activateButtons('.filter', 'category', category);
  activateButtons('.subject', 'subject', subject);
  activateButtons('.grade-filter', 'grade', grade);
  activateButtons('.purpose-filter, .teacher-purpose-card', 'purpose', purpose);
  syncQuickFilterButtons();
  search.focus();
  render();
});

setMode(mode === 'teacher' ? 'teacher' : 'student');
