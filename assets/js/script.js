(function () {
  'use strict';

  /* ---- Sticky header ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll('.trust__num[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var end = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.round(p * end) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---- Forms (demo handler) ---- */
  function handleForm(form, onDone) {
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Отправляем…';
      // NOTE: подключите реальную отправку (Telegram-бот / CRM / e-mail) на бэкенде.
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = label;
        onDone(form);
      }, 700);
    });
  }

  handleForm(document.getElementById('quickform'), function (form) {
    form.reset();
    alert('Спасибо! Заявка на бесплатную проверку отправлена. Мы свяжемся с вами в ближайшее время.');
  });

  handleForm(document.getElementById('mainform'), function (form) {
    form.reset();
    var ok = document.getElementById('formSuccess');
    if (ok) { ok.hidden = false; setTimeout(function () { ok.hidden = true; }, 6000); }
  });

  /* ---- Footer year ---- */
  var y = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
})();
