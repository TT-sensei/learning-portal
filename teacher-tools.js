// 先生向けツール・追加学習サイトを、既存の一覧UIに登録する拡張。
// app.js の items 配列を直接書き換えず、安全に追加できるようにしています。
// 学習サイト側にも表示できるよう、studentOnly / teacherOnly をここで制御します。

const ADDITIONAL_ITEMS = [
  {
    name: '角度ハンター ― ナビアンをつかまえろ',
    repo: 'kakudo-hunter',
    category: '教材',
    subject: '算数',
    grade: '4〜6年生',
    desc: '0°の線との開きから角度を見つける「ハンターモード」と、分度器を使って角度を確かめるモードで、角度の大きさを身につける。'
  },
  {
    name: '読書レコード',
    repo: 'dokusho-record',
    category: 'ツール',
    subject: 'その他',
    grade: '小学生・先生向け',
    desc: '本を記録して、月・年ごとの読書冊数や目標、読書の積み重ねを見える化する読書記録ツール。'
  },
  {
    name: 'キャリア探究ナビ',
    repo: 'careergakuahu',
    category: '教材',
    subject: 'その他',
    grade: '6年生',
    desc: '「自分らしく社会とかかわるために」を軸に、15時間のキャリア探究を進める学習ガイド。'
  },
  {
    name: '1問1答',
    repo: '1mon-1tou',
    category: '教材',
    subject: 'その他',
    grade: '小学生',
    desc: 'NAVIとナビアンの世界観で、1問1答の学習と誤答記録・特訓・再挑戦をつなぐ学習アプリ。'
  },
  {
    name: '給食タイマー',
    repo: 'kyushoku-timer',
    category: 'ツール',
    subject: 'その他',
    grade: '小学生',
    desc: '準備のカウントアップ、もぐもぐ5分、時計、歯みがき3分をまとめた学校生活向けタイマー。'
  },
  {
    name: '自学サポート',
    repo: 'jigaku-supports',
    category: 'ツール',
    subject: 'その他',
    grade: '小学生・先生向け',
    desc: '毎日の自学を「何のために、何を、どうやるか」から考えやすくする学習サポート。'
  },
  {
    name: 'プリント工房',
    repo: 'print-maker',
    category: 'ツール',
    subject: 'その他',
    grade: '先生向け',
    desc: '授業や家庭学習で使うプリントづくりを支える、先生向けのプリント作成ツール。'
  },
  {
    name: '体育キット',
    repo: 'P.E.-kit',
    category: '教材',
    subject: 'その他',
    grade: '小学生',
    desc: '体育の学習で使える教材や活動をまとめたキット。'
  },
  {
    name: 'ファイル工房',
    repo: 'pdf-kit',
    category: 'ツール',
    subject: 'その他',
    grade: '先生向け',
    desc: 'PDF・画像の分割・結合・変換など、授業で使うファイル作業をまとめて行える先生向けツール。'
  },
  {
    name: '公式の使い分け',
    repo: 'kousiki-siwake',
    category: '教材',
    subject: '算数',
    grade: '5〜6年生',
    desc: '問題場面から、どの公式を使えばよいかを考える力を育てる算数教材。'
  },
  {
    name: '倍・約数メイズ',
    repo: 'bai-yaku-maze',
    category: '教材',
    subject: '算数',
    grade: '4〜6年生',
    desc: '倍数・約数の見方を、迷路や選択問題で繰り返し練習する算数教材。'
  },
  {
    name: '都道府県マスター',
    repo: 'todoufuken',
    category: '教材',
    subject: '社会',
    grade: '4〜6年生',
    desc: '都道府県の名前や位置などを確かめながら、社会科の基礎知識を身につける教材。'
  },
  {
    name: '漢語・語句の目標',
    repo: 'kangomokuhyo',
    category: '教材',
    subject: '国語',
    grade: '小学生',
    desc: '国語で扱う語句や漢語を意識しながら学ぶための教材。'
  }
];

function extraMatches(item) {
  const mode = document.body.dataset.mode;
  const categoryButton = document.querySelector('.filter.active');
  const subjectButton = document.querySelector('.subject.active');
  const query = (document.querySelector('#search')?.value || '').trim().toLowerCase();
  const category = categoryButton?.dataset.category || 'all';
  const subject = subjectButton?.dataset.subject || 'all';

  // 子ども向けでは教材だけを表示。先生向けでは全追加項目を表示。
  if (mode === 'student' && item.category !== '教材') return false;
  if (category !== 'all' && item.category !== category) return false;
  if (subject !== 'all' && item.subject !== subject) return false;
  if (query && ![item.name, item.repo, item.desc, item.subject, item.grade, item.category]
    .join(' ').toLowerCase().includes(query)) return false;
  return true;
}

function makeExtraCard(item) {
  const mode = document.body.dataset.mode;
  const card = document.createElement('article');
  card.className = 'card edu-card edu-card-hover';
  card.dataset.subject = item.subject;
  card.dataset.repo = item.repo;
  const siteUrl = `https://tt-sensei.github.io/${item.repo}/`;
  const repoUrl = `https://github.com/TT-sensei/${item.repo}`;

  card.innerHTML = `
    <div class="card-top">
      <span class="edu-badge category-badge category-${item.category}">${item.category}</span>
      <span class="card-labels"><span class="subject-label">${item.subject}</span></span>
    </div>
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <div class="card-meta"><span class="grade">対象：${item.grade}</span>${mode === 'teacher' ? `<code>${item.repo}</code>` : ''}</div>
    <div class="card-actions${mode === 'student' ? ' card-actions-student' : ''}">
      <a class="edu-btn edu-btn-primary card-link" href="${siteUrl}" target="_blank" rel="noopener">サイトを開く <span aria-hidden="true">↗</span></a>
      ${mode === 'teacher' ? `<a class="edu-btn edu-btn-secondary card-link" href="${repoUrl}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>` : ''}
    </div>`;
  return card;
}

function baseRepoCount() {
  const count = Number(document.querySelector('#count')?.textContent || 0);
  return Number.isFinite(count) ? count : 0;
}

function updateExtraCounts(matchedExtraItems) {
  const total = baseRepoCount() + ADDITIONAL_ITEMS.length;
  const repoCount = document.querySelector('#repoCount');
  const footerCount = document.querySelector('#count');
  if (repoCount) repoCount.textContent = total;
  if (footerCount) footerCount.textContent = total;

  const siteCount = document.querySelector('#siteCount');
  if (siteCount) {
    const current = Number(siteCount.textContent || 0);
    if (Number.isFinite(current)) siteCount.textContent = current + ADDITIONAL_ITEMS.length;
  }
}

let updating = false;
function addAdditionalCards() {
  if (updating) return;
  const grid = document.querySelector('#grid');
  if (!grid) return;

  updating = true;
  try {
    ADDITIONAL_ITEMS.forEach(item => {
      if (!extraMatches(item)) return;
      if (grid.querySelector(`[data-repo="${CSS.escape(item.repo)}"]`)) return;
      grid.appendChild(makeExtraCard(item));
    });
  } finally {
    updating = false;
  }
}

function adjustResultText() {
  const mode = document.body.dataset.mode;
  const resultText = document.querySelector('#resultText');
  if (!resultText) return;

  const query = (document.querySelector('#search')?.value || '').trim().toLowerCase();
  const category = document.querySelector('.filter.active')?.dataset.category || 'all';
  const subject = document.querySelector('.subject.active')?.dataset.subject || 'all';
  const extraCount = ADDITIONAL_ITEMS.filter(item => extraMatches(item)).length;

  if (mode === 'student') {
    const match = resultText.textContent.match(/(\d+)つの学びのサイト/);
    const base = match ? Number(match[1]) : document.querySelectorAll('#grid .card:not([data-extra])').length;
    resultText.textContent = `${base + extraCount}つの学びのサイト`;
  } else {
    const match = resultText.textContent.match(/(\d+)件 \/ 全(\d+)件/);
    if (match) resultText.textContent = `${Number(match[1]) + extraCount}件 / 全${baseRepoCount() + ADDITIONAL_ITEMS.length}件`;
  }
}

function syncPortalExtras() {
  addAdditionalCards();
  // 既存app.jsの再描画で消えた場合を想定し、次のフレームでも同期。
  requestAnimationFrame(() => {
    addAdditionalCards();
    adjustResultText();
  });
}

const portalExtrasObserver = new MutationObserver(() => {
  if (!updating) syncPortalExtras();
});
portalExtrasObserver.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', syncPortalExtras);
setTimeout(syncPortalExtras, 0);
setTimeout(syncPortalExtras, 250);
