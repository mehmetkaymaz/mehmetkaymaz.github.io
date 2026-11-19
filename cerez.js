/* ------------------------------------------------------------
   Çerez ve Gizlilik bildirimi (KVKK m. 10 — aydınlatma yükümlülüğü)
   - Tüm sayfalara tek satırla eklenir: <script src="cerez.js" defer></script>
   - Sayfanın diline (lang="tr" / "en") göre Türkçe veya İngilizce gösterilir.
   - Ziyaretçi "Anladım" deyince bir daha gösterilmez (tarayıcıda saklanır).
   - Site takip/reklam çerezi kullanmaz; bu yüzden yalnızca bilgilendirme yapılır.
   ------------------------------------------------------------ */
(function () {
  var KEY = 'mk-kvkk-bildirim-v1';
  var script = document.currentScript;
  var base = script ? script.src : location.href;
  var en = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;

  var T = en ? {
    title: 'Cookie and Privacy Notice (KVKK Art. 10)',
    text: 'This site does not use advertising or tracking cookies. Fonts are loaded from Google Fonts, so your IP address may be shared with Google. For details, see the',
    link: 'Privacy and Cookie Notice',
    after: '.',
    ok: 'Got it',
    href: new URL('en/gizlilik.html', base).href
  } : {
    title: 'Çerez ve Gizlilik Tercihleriniz (KVKK m. 10)',
    text: 'Bu site reklam veya takip çerezi kullanmaz. Yazı tipleri Google Fonts üzerinden yüklendiği için IP adresiniz Google ile paylaşılabilir. Ayrıntılar için',
    link: 'KVKK Aydınlatma Metni ve Çerez Politikası',
    after: '’nı inceleyebilirsiniz.',
    ok: 'Anladım',
    href: new URL('gizlilik.html', base).href
  };

  function seen() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function remember() {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
  }

  var css =
    '.kvkk{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;' +
    'display:grid;grid-template-columns:auto 1fr auto;gap:16px 18px;align-items:center;padding:18px 20px;' +
    'background:#11243d;color:#eef3fa;border:1px solid rgba(238,243,250,.14);border-radius:16px;' +
    'box-shadow:0 24px 60px -16px rgba(0,0,0,.55);font:400 14px/1.55 "Geist","Segoe UI",Arial,sans-serif;' +
    'opacity:0;transform:translateY(16px);transition:opacity .35s ease,transform .35s cubic-bezier(.2,.8,.2,1)}' +
    '.kvkk.on{opacity:1;transform:none}' +
    '.kvkk-ico{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgba(61,126,255,.16);color:#7ea8ff}' +
    '.kvkk-ico svg{width:22px;height:22px}' +
    '.kvkk b{display:block;margin-bottom:2px;font-weight:600;font-size:14.5px}' +
    '.kvkk p{margin:0;color:#93a6c0}' +
    '.kvkk p a{color:#eef3fa;text-decoration:underline;text-underline-offset:2px}' +
    '.kvkk p a:hover{color:#7ea8ff}' +
    '.kvkk button{height:42px;padding:0 20px;border:0;border-radius:99px;background:#3d7eff;color:#fff;' +
    'font:500 14.5px "Geist","Segoe UI",Arial,sans-serif;cursor:pointer;white-space:nowrap;transition:background .2s}' +
    '.kvkk button:hover{background:#1f5bd6}' +
    '.kvkk button:focus-visible,.kvkk a:focus-visible{outline:2px solid #3d7eff;outline-offset:3px}' +
    '@media (max-width:640px){.kvkk{grid-template-columns:auto 1fr;padding:16px}.kvkk button{grid-column:1/-1;width:100%}}' +
    '@media (prefers-reduced-motion:reduce){.kvkk{transition:none}}' +
    '@media print{.kvkk{display:none!important}}';

  function show() {
    if (document.querySelector('.kvkk')) return;
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var box = document.createElement('section');
    box.className = 'kvkk';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', T.title);
    box.innerHTML =
      '<span class="kvkk-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-5-5 4 4 0 0 1-4-4z"/><circle cx="8.5" cy="11.5" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="15.5" cy="13" r="1"/></svg></span>' +
      '<div><b></b><p><span class="t"></span> <a></a><span class="a"></span></p></div>' +
      '<button type="button"></button>';
    box.querySelector('b').textContent = T.title;
    box.querySelector('.t').textContent = T.text;
    var a = box.querySelector('p a');
    a.textContent = T.link;
    a.href = T.href;
    box.querySelector('.a').textContent = T.after;
    var btn = box.querySelector('button');
    btn.textContent = T.ok;
    btn.addEventListener('click', function () {
      remember();
      box.classList.remove('on');
      setTimeout(function () { box.remove(); }, 400);
    });

    document.body.appendChild(box);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('on'); }); });
  }

  // Gizlilik sayfasındaki "bildirimi tekrar göster" butonu için
  window.kvkkGoster = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    show();
  };

  if (!seen()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
    else show();
  }
})();
