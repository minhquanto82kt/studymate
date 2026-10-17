/* StudyMate Slides — script dùng chung: header/footer, tìm kiếm, FAQ, đếm số, slider, form báo giá */
(function () {
  var S = window.SITE, I = window.ICONS || {};
  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var page = body.getAttribute('data-page') || '';
  var $ = function (id) { return document.getElementById(id); };
  var url = function (h) { return root + h; };
  var norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase(); };
  var cur = function (p) { return p === page ? ' aria-current="page"' : ''; };

  /* ---------- HEADER ---------- */
  function renderHeader() {
    var host = $('site-header'); if (!host) return;
    var desk = S.nav.map(function (it) {
      if (it.children) {
        var on = it.children.some(function (c) { return c.page === page; });
        return '<li class="has-dd"><button type="button" class="dd-toggle' + (on ? ' active' : '') + '" aria-expanded="false">' + it.label + ' ' + I.caret + '</button>' +
          '<ul class="dd">' + it.children.map(function (c) { return '<li><a href="' + url(c.href) + '"' + cur(c.page) + '>' + c.label + '</a></li>'; }).join('') + '</ul></li>';
      }
      return '<li><a href="' + url(it.href) + '"' + cur(it.page) + '>' + it.label + '</a></li>';
    }).join('');
    var mob = S.nav.map(function (it) {
      if (it.children) {
        return '<p class="m-group">' + it.label + '</p><div class="m-sub">' + it.children.map(function (c) { return '<a href="' + url(c.href) + '"' + cur(c.page) + '>' + c.label + '</a>'; }).join('') + '</div>';
      }
      return '<a href="' + url(it.href) + '"' + cur(it.page) + '>' + it.label + '</a>';
    }).join('');
    host.innerHTML =
      '<header class="nav" id="nav"><div class="wrap">' +
        '<a class="logo" href="' + url('index.html') + '" aria-label="StudyMate Slides — trang chủ"><span class="lg-slide">Study</span><span class="lg-ngon">Mate</span></a>' +
        '<nav class="nav-main" aria-label="Menu chính"><ul>' + desk + '</ul></nav>' +
        '<div class="nav-right">' +
          '<button class="icon-btn search-btn" id="searchBtn" type="button" aria-label="Tìm kiếm" aria-expanded="false">' + I.search + '</button>' +
          '<button class="icon-btn menu-btn" id="menuBtn" type="button" aria-label="Mở menu" aria-expanded="false">' + I.menu + '</button>' +
        '</div>' +
        '<div class="search-panel" id="searchPanel" role="search"><input id="searchInput" type="search" placeholder="Tìm trang: giá, quy trình, hỏi đáp..." autocomplete="off" aria-label="Tìm trong website"><div class="res" id="searchRes"></div></div>' +
      '</div><div class="mnav" id="mnav">' + mob + '</div></header>';

    var nav = $('nav');
    window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });

    /* dropdown (chạm trên điện thoại / bàn phím) */
    document.querySelectorAll('.dd-toggle').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var li = b.parentNode, open = !li.classList.contains('open');
        document.querySelectorAll('.has-dd.open').forEach(function (x) { x.classList.remove('open'); x.firstChild.setAttribute('aria-expanded', 'false'); });
        if (open) { li.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });

    /* menu điện thoại */
    var mb = $('menuBtn'), mn = $('mnav');
    mb.addEventListener('click', function () {
      var o = mn.classList.toggle('open');
      mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Đóng menu' : 'Mở menu'); mb.innerHTML = o ? I.close : I.menu;
    });

    /* tìm kiếm */
    var sb = $('searchBtn'), sp = $('searchPanel'), si = $('searchInput'), sr = $('searchRes');
    function results() {
      var q = norm(si.value.trim());
      var list = S.pages.filter(function (p) { return !q || norm(p.title + ' ' + p.desc + ' ' + (p.keywords || '')).indexOf(q) > -1; });
      sr.innerHTML = list.length ? list.map(function (p) { return '<a href="' + url(p.href) + '"><b>' + p.title + '</b><span>' + p.desc + '</span></a>'; }).join('') : '<p class="none">Không có trang nào khớp với “' + si.value.replace(/</g, '&lt;') + '”.</p>';
    }
    function toggleSearch(force) {
      var o = typeof force === 'boolean' ? force : !sp.classList.contains('open');
      sp.classList.toggle('open', o); sb.setAttribute('aria-expanded', o);
      if (o) { results(); si.focus(); }
    }
    sb.addEventListener('click', function (e) { e.stopPropagation(); toggleSearch(); });
    si.addEventListener('input', results);
    sp.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () {
      toggleSearch(false);
      document.querySelectorAll('.has-dd.open').forEach(function (x) { x.classList.remove('open'); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggleSearch(false); sb.focus(); } });
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    var host = $('site-footer'); if (!host) return;
    var links = function (arr) { return '<ul>' + arr.map(function (p) { return '<li><a href="' + url(p.href) + '">' + p.title + '</a></li>'; }).join('') + '</ul>'; };
    var by = function (slugs) { return slugs.map(function (s) { return S.pages.filter(function (p) { return p.slug === s; })[0]; }).filter(Boolean); };
    host.innerHTML =
      '<footer><div class="wrap">' +
        '<div class="foot-brand"><strong>' + S.name + '</strong><p>' + S.tagline + '</p></div>' +
        '<div class="foot-cols">' +
          '<div class="foot-links"><h4>Dịch vụ</h4>' + links(by(['gia', 'quy-trinh', 'nen-tang', 'cam-ket'])) + '</div>' +
          '<div class="foot-links"><h4>Khám phá</h4>' + links(by(['du-an', 'danh-gia', 'faq', 've-chung-toi'])) + '</div>' +
          '<div class="foot-links"><h4>Liên hệ</h4>' + links(by(['lien-he'])) +
            '<p style="font-size:.85rem">Zalo: ' + S.contact.zalo + '<br>Email: ' + S.contact.email + '</p></div>' +
        '</div>' +
        '<div class="copy">© 2026 ' + S.name + '</div>' +
      '</div></footer>';
  }

  renderHeader();
  renderFooter();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (b) {
    b.addEventListener('click', function () {
      b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  /* ---------- đếm số ---------- */
  var counters = document.querySelectorAll('.num[data-count]');
  if (counters.length) {
    var done = false;
    var run = function () {
      if (done) return; done = true;
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10) || 0, suf = el.getAttribute('data-suffix') || '', t0 = performance.now();
        (function tick(now) {
          var p = Math.min((now - t0) / 1200, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e).toLocaleString('vi-VN') + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    };
    var st = document.querySelector('.stats');
    if (st && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { run(); io.disconnect(); } }); }, { threshold: .3 });
      io.observe(st);
    } else run();
  }

  /* ---------- slider trước/sau ---------- */
  var slider = $('slider');
  if (slider) {
    var slides = slider.querySelectorAll('.slide-item'), dots = slider.querySelectorAll('#dots button'), n = 0;
    var go = function (i) {
      n = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('active', k === n); });
      dots.forEach(function (d, k) { d.classList.toggle('active', k === n); });
    };
    $('prevBtn').addEventListener('click', function () { go(n - 1); });
    $('nextBtn').addEventListener('click', function () { go(n + 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    var auto = setInterval(function () { go(n + 1); }, 6000);
    slider.addEventListener('mouseenter', function () { clearInterval(auto); });
    slider.addEventListener('mouseleave', function () { auto = setInterval(function () { go(n + 1); }, 6000); });
  }

  /* ---------- form báo giá ---------- */
  if ($('f')) {
    var CAP = { basic: 15, standard: 25, premium: Infinity };
    var BASE = { basic: 199000, standard: 299000, premium: 449000 };
    var NAME = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };
    var fmt = function (x) { return x.toLocaleString('vi-VN') + 'đ'; };
    var calc = function (plan, slidesN, notes) {
      var extra = 0;
      if (CAP[plan] !== Infinity && slidesN > CAP[plan]) extra = Math.ceil((slidesN - CAP[plan]) / 10) * 100000;
      var lo = BASE[plan] + extra, hi = lo;
      if (notes && plan !== 'premium') { lo += 50000; hi += 100000; }
      return { lo: lo, hi: hi, extra: extra };
    };
    var range = function (r, half) {
      var a = half ? r.lo / 2 : r.lo, b = half ? r.hi / 2 : r.hi;
      return a === b ? fmt(a) : fmt(a) + ' – ' + fmt(b);
    };
    var update = function () {
      var plan = $('plan').value, s = Math.max(1, parseInt($('slides').value, 10) || 1), nt = $('notes').checked, r = calc(plan, s, nt);
      $('tot').textContent = range(r, false);
      $('dep').textContent = 'Giá tạm tính. Đặt cọc 50%: ' + range(r, true);
      var h = [];
      if (r.extra) h.push('Đã gồm phụ phí thêm slide: ' + fmt(r.extra) + '.');
      if (nt && plan === 'premium') h.push('Premium đã gồm speaker notes cơ bản.');
      if (nt && plan !== 'premium') h.push('Speaker notes tính 50.000–100.000đ tùy số slide.');
      var best = null, bt = r.lo;
      ['basic', 'standard', 'premium'].forEach(function (p) { var c = calc(p, s, nt); if (c.hi < r.lo && c.hi < bt) { best = p; bt = c.hi; } });
      if (best) h.push('Gói ' + NAME[best] + ' rẻ hơn với ' + s + ' slide (' + fmt(bt) + ').');
      $('hint').textContent = h.join(' ');
    };
    try { var g = new URLSearchParams(location.search).get('goi'); if (g && NAME[g]) $('plan').value = g; } catch (e) {}
    ['plan', 'slides', 'notes'].forEach(function (id) { $(id).addEventListener('input', update); $(id).addEventListener('change', update); });
    update();

    $('f').addEventListener('submit', function (e) {
      e.preventDefault();
      var plan = $('plan').value, s = parseInt($('slides').value, 10) || 0, r = calc(plan, s, $('notes').checked);
      var d = $('deadline').value, dl = d ? new Date(d).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) : '(chưa nhập)';
      var v = function (id, x) { return $(id).value.trim() || x; };
      $('out').textContent = [
        'BRIEF STUDYMATE SLIDES',
        'Người gửi: ' + v('name', '(chưa nhập)'),
        'Liên hệ: ' + v('contact', '(chưa nhập)'),
        'Gói: ' + NAME[plan] + ' | Số slide dự kiến: ' + s,
        'Deadline: ' + dl,
        'Speaker notes: ' + ($('notes').checked ? 'Có' : 'Không'),
        'Giá tạm tính: ' + range(r, false),
        'Yêu cầu giảng viên/ghi chú: ' + v('msg', '(không có)')
      ].join('\n');
      $('brief').hidden = false;
      $('brief').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    $('copy').addEventListener('click', function () {
      var t = $('out').textContent, m = $('cmsg');
      var sel = function () {
        var rg = document.createRange(); rg.selectNodeContents($('out'));
        var sl = window.getSelection(); sl.removeAllRanges(); sl.addRange(rg);
        m.textContent = 'Hãy nhấn Ctrl+C (hoặc giữ và chọn Sao chép) để copy brief.';
      };
      try { navigator.clipboard.writeText(t).then(function () { m.textContent = 'Đã sao chép brief. Dán vào Zalo hoặc email của StudyMate.'; }, sel); } catch (e) { sel(); }
    });
  }
})();
