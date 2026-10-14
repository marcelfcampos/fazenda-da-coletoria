(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIGURAÇÃO DE CONTATO — preencher antes de publicar (VALIDAR)
     whatsapp: somente dígitos com DDI e DDD, ex.: "5548999999999"
     ------------------------------------------------------------------ */
  var CONTACT = { email: '', whatsapp: '' };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- menu responsivo ---------- */
  var btn = $('.top__btn');
  var menu = $('#menu');
  var mq = window.matchMedia('(max-width: 860px)');

  function setMenu(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.top__btn-label').textContent = open ? 'Fechar' : 'Menu';
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () { if (mq.matches) setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      btn.focus();
    }
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
    if (!mq.matches) setMenu(false);
  });

  /* ---------- revelação ao rolar ---------- */
  var targets = $$('.reveal, .dist');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- contadores (valor final já está no HTML) ---------- */
  function fmt(n, sep) { return sep ? n.toLocaleString('pt-BR') : String(n); }
  if (!reduce && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        co.unobserve(en.target);
        var el = en.target;
        var end = parseInt(el.dataset.count, 10);
        var pre = el.dataset.prefix || '';
        var sep = el.dataset.sep === '1';
        var t0 = null, dur = 1400;
        function step(t) {
          if (t0 === null) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + fmt(Math.round(end * e), sep);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { co.observe(el); });
  }

  /* ---------- paralaxe discreta na abertura ---------- */
  var heroMedia = $('.hero__media');
  if (heroMedia && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) heroMedia.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- formulário ---------- */
  var form = $('#form');
  var status = $('#form-status');

  function invalid(el, bad) { el.setAttribute('aria-invalid', bad ? 'true' : 'false'); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.nome, email = form.email, ok = form.consentimento;
    var errs = [];
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    invalid(nome, !nome.value.trim()); if (!nome.value.trim()) errs.push(nome);
    invalid(email, !emailOk); if (!emailOk) errs.push(email);
    if (!ok.checked) errs.push(ok);
    if (errs.length) {
      status.textContent = !ok.checked && errs.length === 1
        ? 'Para continuar, marque a autorização de uso dos dados.'
        : 'Verifique os campos destacados: nome e e-mail válidos são obrigatórios.';
      errs[0].focus();
      return;
    }

    var corpo = 'Olá! Gostaria de solicitar a apresentação da Fazenda da Coletoria.\n\n' +
      'Nome: ' + nome.value.trim() + '\n' +
      'E-mail: ' + email.value.trim() + '\n' +
      (form.telefone.value.trim() ? 'Telefone: ' + form.telefone.value.trim() + '\n' : '') +
      'Interesse: ' + form.interesse.value + '\n' +
      (form.mensagem.value.trim() ? '\n' + form.mensagem.value.trim() + '\n' : '');

    if (CONTACT.whatsapp) {
      status.textContent = 'Abrindo o WhatsApp com a sua mensagem.';
      window.open('https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(corpo), '_blank', 'noopener');
    } else if (CONTACT.email) {
      status.textContent = 'Abrindo o seu aplicativo de e-mail com a mensagem pronta.';
      window.location.href = 'mailto:' + CONTACT.email + '?subject=' +
        encodeURIComponent('Solicitação de apresentação · Fazenda da Coletoria') +
        '&body=' + encodeURIComponent(corpo);
    } else {
      status.textContent = 'O canal de envio ainda não foi configurado. Nenhum dado foi enviado.';
    }
  });

  $$('input,textarea', form).forEach(function (el) {
    el.addEventListener('input', function () { el.removeAttribute('aria-invalid'); });
  });

  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
