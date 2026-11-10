(function () {
  var hdr = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var bar = document.getElementById('bar');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var subLinks = [].slice.call(document.querySelectorAll('.subnav a'));
  var subSecs = subLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (hdr) hdr.classList.toggle('solid', y > 40);
    if (bar) bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
    var cur = -1;
    subSecs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    subLinks.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
