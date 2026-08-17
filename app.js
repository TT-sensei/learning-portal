const items = [
 {name:'ことラボ',repo:'kotorabo',category:'教材',subject:'国語',grade:'小学生',desc:'ことば・文づくり・つながり・文章を研究する国語ラボ。',color:'blue'},
 {name:'漢字練習',repo:'kanjirensyu',category:'教材',subject:'国語',grade:'小学生',desc:'書き込み式と文中空欄式で漢字を練習できます。',color:'purple'},
 {name:'ひらがな・カタカナ',repo:'hiraganakatakana',category:'教材',subject:'国語',grade:'1年生',desc:'ひらがなとカタカナを楽しく練習するサイト。',color:'pink'},
 {name:'歴史人物クイズ',repo:'rekisijinbutu',category:'教材',subject:'社会',grade:'小学生',desc:'歴史人物の知識をクイズと時代モードで確認。',color:'orange'},
 {name:'3年生 社会',repo:'3nensyakai',category:'教材',subject:'社会',grade:'3年生',desc:'身近な地域や社会の仕組みを学ぶWeb教材。',color:'green'},
 {name:'理科ラボ 3年',repo:'rika3nen',category:'教材',subject:'理科',grade:'3年生',desc:'観察・実験・発見を通して理科を学ぶラボ。',color:'green'},
 {name:'理科ラボ 4年',repo:'rika4nen',category:'教材',subject:'理科',grade:'4年生',desc:'季節・天気・電気などを学ぶ理科ラボ。',color:'green'},
 {name:'理科ラボ 5年',repo:'rika5nen',category:'教材',subject:'理科',grade:'5年生',desc:'植物・天気・振り子・電磁石などを学ぶ教材。',color:'green'},
 {name:'理科ラボ 6年',repo:'rika6nen',category:'教材',subject:'理科',grade:'6年生',desc:'発芽と成長を、知識・実験・考察で学ぶ教材。',color:'green'},
 {name:'日光 修学旅行事前学習',repo:'jizen',category:'教材',subject:'社会',grade:'6年生',desc:'日光の歴史や文化を調べる事前学習教材。',color:'orange'},
 {name:'円の面積',repo:'enmenseki',category:'教材',subject:'算数',grade:'6年生',desc:'円の面積を段階的に学ぶアドベンチャー。',color:'blue'},
 {name:'体積',repo:'taiseki',category:'教材',subject:'算数',grade:'6年生',desc:'体積の考え方を色分けやコンボで身につける。',color:'blue'},
 {name:'比のパーク',repo:'ratiopark',category:'教材',subject:'算数',grade:'6年生',desc:'比を使った4つのゲームで楽しく学習。',color:'blue'},
 {name:'九九マジカル',repo:'magical-kakezan',category:'ツール',subject:'算数',grade:'小学生',desc:'九九の学習をゲーム感覚でくり返し練習。',color:'blue'},
 {name:'わり算バトル',repo:'warizanbattle',category:'ツール',subject:'算数',grade:'小学生',desc:'筆算の手順を確認しながら取り組める計算ツール。',color:'blue'},
 {name:'約分クラッシュ',repo:'yakubuncrash',category:'ツール',subject:'算数',grade:'小学生',desc:'分数の約分をすばやく判断するゲーム。',color:'blue'},
 {name:'約分スラッシュ',repo:'yakubunslash',category:'ツール',subject:'算数',grade:'小学生',desc:'約分をゲーム形式で練習するバトルツール。',color:'blue'},
 {name:'百マス計算',repo:'hyakumasu',category:'ツール',subject:'算数',grade:'小学生',desc:'計算の正確さと速さを記録しながら挑戦。',color:'blue'},
 {name:'データ活用',repo:'detakatuyou',category:'ツール',subject:'算数',grade:'小学生',desc:'表やグラフを読み取り、データから考えるツール。',color:'blue'},
 {name:'時計べんきょう',repo:'tokeibenkyo',category:'ツール',subject:'算数',grade:'小学生',desc:'時計の読み方を動かしながら身につける教材。',color:'blue'},
 {name:'文字と式マスター',repo:'mojisiki',category:'ツール',subject:'算数',grade:'6年生',desc:'文字を使った式の意味や考え方を練習。',color:'blue'},
 {name:'学習の振り返り',repo:'furikaeri',category:'ツール',subject:'その他',grade:'小学生',desc:'わかる・できる・かかわるの視点で学びを振り返る。',color:'purple'},
 {name:'学級活動の話し合い',repo:'gakkatu',category:'ツール',subject:'その他',grade:'小学生',desc:'学級活動の話し合いを支援するWebツール。',color:'purple'},
 {name:'音のレシピ',repo:'sounds-recipe-',category:'ツール',subject:'その他',grade:'小学生',desc:'授業や活動で使える音の素材を探せるサイト。',color:'pink'},
 {name:'くるま図鑑',repo:'kuruma',category:'教材',subject:'その他',grade:'小学生',desc:'くるまをきっかけに調べたり考えたりする教材。',color:'orange'},
 {name:'立体のきほん',repo:'rittaikihon',category:'教材',subject:'算数',grade:'小学生',desc:'立体の見方や特徴を学ぶWeb教材。',color:'blue'},
 {name:'edu-assets バッジ・素材',repo:'edu-assets',category:'素材',subject:'その他',grade:'共通素材',desc:'共通・教科別バッジ、エレメント、コレクション素材。',color:'yellow'},
 {name:'漢字・言葉の素材',repo:'sententaisyo',category:'素材',subject:'国語',grade:'小学生',desc:'国語学習に活用できる言葉や文章の素材。',color:'purple'},
 {name:'発表・面接サポート',repo:'interview-',category:'ツール',subject:'その他',grade:'小学生',desc:'考えを整理して伝えるためのサポートツール。',color:'purple'},
 {name:'しらべ学習ポータル',repo:'sankenbunritu',category:'教材',subject:'社会',grade:'6年生',desc:'憲法や三権分立について整理して学ぶ教材。',color:'orange'}
 {name:'1年生 さんすうワールド',repo:'1nensasuuworld',category:'教材',subject:'算数',grade:'1年生',desc:'まちづくりを楽しみながら、1年生の算数を学ぶワールド。',color:'blue'},
 {name:'文章題アドベンチャー',repo:'bunsyo-dai',category:'教材',subject:'算数',grade:'小学生',desc:'文章題の場面を読み取り、式や答えを考える教材。',color:'blue'},
 {name:'分数・小数計算',repo:'bunsuuseisuukeisan',category:'ツール',subject:'算数',grade:'小学生',desc:'分数や小数の計算をくり返し練習できるツール。',color:'blue'},
 {name:'数のしくみ',repo:'kazunosikumi',category:'教材',subject:'算数',grade:'小学生',desc:'数の見方や仕組みを考える算数教材。',color:'blue'},
 {name:'英検5級チャレンジ',repo:'eiken5',category:'教材',subject:'その他',grade:'小学生',desc:'英検5級レベルの英語をクイズ形式で学ぶ教材。',color:'green'},
 {name:'わり算ランド',repo:'warizanland',category:'ツール',subject:'算数',grade:'小学生',desc:'わり算に親しみながら練習できる学習ゲーム。',color:'blue'},
 {name:'チェック・確認ツール',repo:'checker',category:'ツール',subject:'その他',grade:'小学生',desc:'学習や活動の確認に使えるシンプルなチェックツール。',color:'purple'},

];
const grid=document.querySelector('#grid'), search=document.querySelector('#search'), count=document.querySelector('#count'), resultText=document.querySelector('#resultText'), empty=document.querySelector('#empty');
let category='all', subject='all';
function render(){const q=search.value.trim().toLowerCase();const filtered=items.filter(x=>(category==='all'||x.category===category)&&(subject==='all'||x.subject===subject)&&(!q||[x.name,x.repo,x.desc,x.subject,x.grade].join(' ').toLowerCase().includes(q)));count.textContent=items.length;resultText.textContent=filtered.length+'件';grid.innerHTML=filtered.map(x=>`<article class="card"><div class="card-top"><span class="badge ${x.category}">${x.category}</span><span class="subject-label">${x.subject}</span></div><h3>${x.name}</h3><p>${x.desc}</p><div class="card-foot"><span class="grade">${x.grade}</span><a class="open" href="https://tt-sensei.github.io/${x.repo}/" target="_blank" rel="noopener">サイトを開く ↗</a></div></article>`).join('');empty.hidden=filtered.length!==0}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');category=b.dataset.category;render()}));
document.querySelectorAll('.subject').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.subject').forEach(x=>x.classList.remove('active'));b.classList.add('active');subject=b.dataset.subject;render()}));
search.addEventListener('input',render);render();
