// 先生向けの追加ツールを、既存の一覧UIに登録する拡張。
// app.js の大きな items 配列を直接書き換えず、安全に追加できるようにしています。
const PDF_KIT = {
  name: 'ファイル工房',
  repo: 'pdf-kit',
  category: 'ツール',
  subject: 'その他',
  grade: '先生向け',
  desc: 'PDF・画像の分割・結合・変換など、授業で使うファイル作業をまとめて行える先生向けツール。'
};

function pdfKitMatches() {
  const mode = document.body.dataset.mode;
  if (mode !== 'teacher') return false;

  const categoryButton = document.querySelector('.filter.active');
  const subjectButton = document.querySelector('.subject.active');
  const query = (document.querySelector('#search')?.value || '').trim().toLowerCase();
  const category = categoryButton?.dataset.category || 'all';
  const subject = subjectButton?.dataset.subject || 'all';

  if (category !== 'all' && category !== PDF_KIT.category) return false;
  if (subject !== 'all' && subject !== PDF_KIT.subject) return false;
  if (query && ![PDF_KIT.name, PDF_KIT.repo, PDF_KIT.desc, PDF_KIT.subject, PDF_KIT.grade, PDF_KIT.category]
    .join(' ').toLowerCase().includes(query)) return false;
  return true;
}

function addPdfKitCard() {
  const grid = document.querySelector('#grid');
  if (!grid || !pdfKitMatches() || grid.querySelector('[data-repo="pdf-kit"]')) return;

  const card = document.createElement('article');
  card.className = 'card edu-card edu-card-hover';
  card.dataset.subject = PDF_KIT.subject;
  card.dataset.repo = PDF_KIT.repo;
  card.innerHTML = `
    <div class="card-top">
      <span class="edu-badge category-badge category-ツール">ツール</span>
      <span class="card-labels"><span class="subject-label">その他</span></span>
    </div>
    <h3>${PDF_KIT.name}</h3>
    <p>${PDF_KIT.desc}</p>
    <div class="card-meta"><span class="grade">対象：${PDF_KIT.grade}</span><code>${PDF_KIT.repo}</code></div>
    <div class="card-actions">
      <a class="edu-btn edu-btn-primary card-link" href="https://tt-sensei.github.io/pdf-kit/" target="_blank" rel="noopener">サイトを開く <span aria-hidden="true">↗</span></a>
      <a class="edu-btn edu-btn-secondary card-link" href="https://github.com/TT-sensei/pdf-kit" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
    </div>`;

  grid.appendChild(card);
}

const pdfKitObserver = new MutationObserver(() => addPdfKitCard());
pdfKitObserver.observe(document.body, { childList: true, subtree: true });
window.addEventListener('load', addPdfKitCard);
setTimeout(addPdfKitCard, 0);
