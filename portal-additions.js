// 新しく追加した学習サイト・先生向けツールを既存一覧へ表示する拡張
const ADDITIONAL_ITEMS = [
  {name:'角度ハンター ― ナビアンをつかまえろ',repo:'kakudo-hunter',category:'教材',subject:'算数',grade:'4〜6年生',desc:'0°の線との開きから角度を見つけるハンターモードと、分度器を使うモードで角度の大きさを身につける。'},
  {name:'読書レコード',repo:'dokusho-record',category:'ツール',subject:'その他',grade:'小学生・先生向け',desc:'本を記録し、月・年ごとの読書冊数や目標などを見える化する読書記録ツール。'},
  {name:'キャリア探究ナビ',repo:'careergakuahu',category:'教材',subject:'その他',grade:'6年生',desc:'「自分らしく社会とかかわるために」を軸に、15時間のキャリア探究を進める学習ガイド。'},
  {name:'1問1答',repo:'1mon-1tou',category:'教材',subject:'その他',grade:'小学生',desc:'NAVIとナビアンの世界観で、1問1答の学習と誤答記録・特訓・再挑戦をつなぐ学習アプリ。'},
  {name:'給食タイマー',repo:'kyushoku-timer',category:'ツール',subject:'その他',grade:'小学生',desc:'準備、もぐもぐ5分、時計、歯みがき3分をまとめた学校生活向けタイマー。'},
  {name:'自学サポート',repo:'jigaku-supports',category:'ツール',subject:'その他',grade:'小学生・先生向け',desc:'毎日の自学を、目的・内容・方法から考えやすくする学習サポート。'},
  {name:'プリント工房',repo:'print-maker',category:'ツール',subject:'その他',grade:'先生向け',desc:'授業や家庭学習で使うプリントづくりを支える先生向けツール。'},
  {name:'体育キット',repo:'P.E.-kit',category:'教材',subject:'その他',grade:'小学生',desc:'体育の学習で使える教材や活動をまとめたキット。'},
  {name:'ファイル工房',repo:'pdf-kit',category:'ツール',subject:'その他',grade:'先生向け',desc:'PDF・画像の分割・結合・変換など、授業で使うファイル作業をまとめて行えるツール。'},
  {name:'公式の使い分け',repo:'kousiki-siwake',category:'教材',subject:'算数',grade:'5〜6年生',desc:'問題場面から、どの公式を使えばよいかを考える力を育てる算数教材。'},
  {name:'倍・約数メイズ',repo:'bai-yaku-maze',category:'教材',subject:'算数',grade:'4〜6年生',desc:'倍数・約数の見方を、迷路や選択問題で繰り返し練習する算数教材。'},
  {name:'都道府県マスター',repo:'todoufuken',category:'教材',subject:'社会',grade:'4〜6年生',desc:'都道府県の名前や位置などを確かめながら、社会科の基礎知識を身につける教材。'},
  {name:'漢語・語句の目標',repo:'kangomokuhyo',category:'教材',subject:'国語',grade:'小学生',desc:'国語で扱う語句や漢語を意識しながら学ぶための教材。'}
];

function extraMatches(item){
  const mode=document.body.dataset.mode;
  const category=document.querySelector('.filter.active')?.dataset.category||'all';
  const subject=document.querySelector('.subject.active')?.dataset.subject||'all';
  const query=(document.querySelector('#search')?.value||'').trim().toLowerCase();
  if(mode==='student'&&item.category!=='教材') return false;
  if(category!=='all'&&item.category!==category) return false;
  if(subject!=='all'&&item.subject!==subject) return false;
  if(query&&![item.name,item.repo,item.desc,item.subject,item.grade,item.category].join(' ').toLowerCase().includes(query)) return false;
  return true;
}

function makeExtraCard(item){
  const mode=document.body.dataset.mode;
  const card=document.createElement('article');
  card.className='card edu-card edu-card-hover';
  card.dataset.subject=item.subject;
  card.dataset.repo=item.repo;
  card.dataset.extra='true';
  card.innerHTML=`
    <div class="card-top"><span class="edu-badge category-badge category-${item.category}">${item.category}</span><span class="card-labels"><span class="subject-label">${item.subject}</span></span></div>
    <h3>${item.name}</h3><p>${item.desc}</p>
    <div class="card-meta"><span class="grade">対象：${item.grade}</span>${mode==='teacher'?`<code>${item.repo}</code>`:''}</div>
    <div class="card-actions${mode==='student'?' card-actions-student':''}">
      <a class="edu-btn edu-btn-primary card-link" href="https://tt-sensei.github.io/${item.repo}/" target="_blank" rel="noopener">サイトを開く <span aria-hidden="true">↗</span></a>
      ${mode==='teacher'?`<a class="edu-btn edu-btn-secondary card-link" href="https://github.com/TT-sensei/${item.repo}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>`:''}
    </div>`;
  return card;
}

function syncPortalExtras(){
  const grid=document.querySelector('#grid');
  const resultText=document.querySelector('#resultText');
  if(!grid||!resultText) return;
  ADDITIONAL_ITEMS.forEach(item=>{
    if(extraMatches(item)&&!grid.querySelector(`[data-repo="${CSS.escape(item.repo)}"]`)) grid.appendChild(makeExtraCard(item));
  });
  const baseVisible=grid.querySelectorAll('.card:not([data-extra="true"])').length;
  const extraVisible=grid.querySelectorAll('.card[data-extra="true"]').length;
  const mode=document.body.dataset.mode;
  if(mode==='student') resultText.textContent=`${baseVisible+extraVisible}つの学びのサイト`;
  else { const total=Number(document.querySelector('#count')?.textContent||0); if(Number.isFinite(total)) resultText.textContent=`${baseVisible+extraVisible}件 / 全${total+ADDITIONAL_ITEMS.length}件`; }
}

const grid=document.querySelector('#grid');
if(grid){
  const portalExtrasObserver=new MutationObserver(()=>{ clearTimeout(window.__portalExtrasTimer); window.__portalExtrasTimer=setTimeout(syncPortalExtras,0); });
  portalExtrasObserver.observe(grid,{childList:true});
}
window.addEventListener('load',syncPortalExtras);
setTimeout(syncPortalExtras,0);
setTimeout(syncPortalExtras,250);
