// 追加の学習サイト・先生向けツールは portal-additions.js で一覧へ登録します。
(function loadPortalAdditions(){
  if (document.querySelector('script[data-portal-additions]')) return;
  const script = document.createElement('script');
  script.src = './portal-additions.js';
  script.dataset.portalAdditions = 'true';
  document.body.appendChild(script);
})();
