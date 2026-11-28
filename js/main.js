/* ============================================================
   UNISON EMBODIMENT — SOTD motion layer
   GSAP · ScrollTrigger · Lenis · Barba
   Degrades to a fully readable site without JS.
   ============================================================ */

(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.remove('no-js');
  docEl.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  var hasGSAP = typeof gsap !== 'undefined';

  if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ==========================================================
     LENIS — smooth scroll
     ========================================================== */
  var lenis = null;

  function initLenis() {
    if (reduceMotion || isTouch || typeof Lenis === 'undefined') return;

    try {
      lenis = new Lenis({
        lerp: 0.085,
        duration: 1.4,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.95
      });

      if (hasGSAP) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        requestAnimationFrame(function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        });
      }
    } catch (e) {
      lenis = null;
    }
  }

  /* ==========================================================
     PRELOADER
     ========================================================== */
  function runPreloader() {
    var pre = document.querySelector('.preloader');
    if (!pre) return;
    var lotusMarkup = '<path d="M60 73 C45 59 42 43 60 12 C78 43 75 59 60 73Z" fill="currentColor" fill-opacity="0"/><path d="M57 72 C37 63 25 49 25 31 C43 37 55 51 57 72Z" fill="currentColor" fill-opacity="0"/><path d="M63 72 C83 63 95 49 95 31 C77 37 65 51 63 72Z" fill="currentColor" fill-opacity="0"/><path d="M55 73 C35 72 18 64 10 50 C31 48 47 57 55 73Z" fill="currentColor" fill-opacity="0"/><path d="M65 73 C85 72 102 64 110 50 C89 48 73 57 65 73Z" fill="currentColor" fill-opacity="0"/><path d="M60 70 C57 77 56 82 60 88 C64 82 63 77 60 70Z" fill="currentColor" fill-opacity="0"/><path d="M60 73 C49 79 39 82 27 82 M60 73 C71 79 81 82 93 82 M27 82 C42 87 78 87 93 82"/>';
    var preMark = pre.querySelector('.preloader__mark');
    if (preMark) {
      preMark.setAttribute('viewBox', '0 0 120 92');
      preMark.innerHTML = lotusMarkup;
    }
    document.querySelectorAll('.brand__mark').forEach(function (brandMark) {
      brandMark.setAttribute('viewBox', '0 0 120 92');
      brandMark.innerHTML = lotusMarkup;
    });
    var transitionMark = document.querySelector('.transition__mark');
    if (transitionMark) {
      transitionMark.setAttribute('viewBox', '0 0 120 92');
      transitionMark.innerHTML = lotusMarkup;
    }
    if (reduceMotion || !hasGSAP) { pre.remove(); docEl.classList.add('is-loaded'); return; }

    var mark = pre.querySelector('.preloader__mark');
    var petals = mark ? Array.prototype.slice.call(mark.querySelectorAll('path')) : [];
    var word = pre.querySelector('.preloader__word');
    var sub = pre.querySelector('.preloader__sub');
    var count = pre.querySelector('.preloader__count');
    var fill = pre.querySelector('.preloader__bar i');
    var state = { n: 0 };

    docEl.classList.add('is-loading');
    document.body.classList.add('is-locked');

    var tl = gsap.timeline({
      onComplete: function () {
        document.body.classList.remove('is-locked');
        pre.remove();
        docEl.classList.add('is-loaded');
        ScrollTrigger.refresh();
        heroIntro();
      }
    });

    petals.forEach(function (path) {
      if (!path.getTotalLength) return;
      var length = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });
    tl.to(petals, { strokeDashoffset: 0, duration: 1.35, stagger: 0.12, ease: 'power2.inOut' }, 0.1)
      .to(petals, { attr: { 'fill-opacity': 0.12 }, strokeOpacity: 0.82, duration: 0.7, stagger: 0.035, ease: 'power2.out' }, 1.25)
      .to(word, { opacity: 1, letterSpacing: '0.34em', duration: 1.5, ease: 'power3.out' }, 0.35)
      .to(sub, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.75)
      .to(state, {
        n: 100, duration: 1.9, ease: 'power2.inOut',
        onUpdate: function () {
          if (count) count.textContent = String(Math.round(state.n)).padStart(3, '0');
          if (fill) fill.style.transform = 'scaleX(' + (state.n / 100) + ')';
        }
      }, 0.1)
      .to(pre, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, 2.35);
  }

  /* ==========================================================
     HERO INTRO
     ========================================================== */
  function heroIntro() {
    if (reduceMotion || !hasGSAP) return;

    var hero = document.querySelector('.hero');
    if (!hero) return;

    var lines = hero.querySelectorAll('.hero h1 .line > span');
    var eyebrow = hero.querySelector('.hero__eyebrow');
    var sub = hero.querySelector('.hero__sub');
    var actions = hero.querySelector('.hero__actions');
    var foot = hero.querySelector('.hero__foot');
    var fig = hero.querySelector('.hero__figure');
    var img = fig ? fig.querySelector('img') : null;

    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 1.2 }, 0.05);

    if (lines.length) {
      tl.fromTo(lines,
        { yPercent: 115 },
        { yPercent: 0, duration: 1.5, stagger: 0.13 }, 0.15);
    }

    if (sub) tl.fromTo(sub, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2 }, 0.75);
    if (actions) tl.fromTo(actions, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1 }, 0.95);

    if (fig) {
      tl.add(function () { fig.classList.add('is-in'); }, 0.55);
      if (img) tl.fromTo(img, { scale: 1.28 }, { scale: 1.06, duration: 2.2, ease: 'power3.out' }, 0.55);
    }

    if (foot) tl.fromTo(foot, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.05);
  }

  /* ==========================================================
     SCROLL REVEALS
     ========================================================== */
  function initReveals() {
    var items = document.querySelectorAll('.reveal, .reveal-img, .step');

    if (!items.length) return;

    if (!hasGSAP || reduceMotion) {
      items.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('is-in');
      });
      return;
    }

    items.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          el.classList.add('is-in');
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'power3.out',
            overwrite: true,
            onComplete: function () { el.style.transform = ''; }
          });
        }
      });
    });
  }

  /* ==========================================================
     IMAGE REVEALS (scroll)
     ========================================================== */
  function initImageReveals() {
    var frames = document.querySelectorAll('.reveal-img, .split__media, .mosaic > *, .founder-head img');
    if (!frames.length || !hasGSAP || reduceMotion) return;

    document.querySelectorAll('.reveal-img img, .split__media img, .mosaic img, .founder-head img').forEach(function (img) {
      gsap.fromTo(img,
        { scale: 1.16 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('figure, .split__media, .mosaic, .founder-head') || img,
            start: 'top 92%',
            end: 'top 35%',
            scrub: 1.4
          }
        });
    });

    document.querySelectorAll('.reveal-img').forEach(function (box) {
      var curtain = document.createElement('div');
      curtain.style.cssText = 'position:absolute;inset:0;background:var(--porcelain);transform-origin:top;pointer-events:none;z-index:2;';
      box.appendChild(curtain);

      gsap.set(box, { overflow: 'hidden' });

      ScrollTrigger.create({
        trigger: box,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(curtain, {
            scaleY: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            delay: 0.1,
            onComplete: function () { curtain.remove(); }
          });
        }
      });
    });
  }

  /* ==========================================================
     PARALLAX
     ========================================================== */
  function initParallax() {
    if (!hasGSAP || reduceMotion) return;

    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var depth = parseFloat(el.getAttribute('data-parallax')) || 10;

      gsap.fromTo(el,
        { yPercent: -depth },
        {
          yPercent: depth,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
    });
  }

  /* ==========================================================
     MANIFESTO — word-by-word scrub
     ========================================================== */
  function initManifesto() {
    var blocks = document.querySelectorAll('.manifesto p');
    if (!blocks.length) return;

    blocks.forEach(function (p) {
      if (p.dataset.split) return;
      p.dataset.split = '1';

      var nodes = [];
      p.childNodes.forEach(function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (chunk) {
            if (!chunk) return;
            if (/^\s+$/.test(chunk)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              var span = document.createElement('span');
              span.className = 'w';
              span.textContent = chunk;
              frag.appendChild(span);
              nodes.push(span);
            }
          });
          p.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          node.classList.add('w');
          nodes.push(node);
        }
      });

      if (!nodes.length || !hasGSAP || reduceMotion) {
        nodes.forEach(function (n) { n.classList.add('is-on'); });
        return;
      }

      gsap.to(nodes, {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: p,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.6
        }
      });
    });
  }

  /* ==========================================================
     HORIZONTAL PINNED GALLERY
     ========================================================== */
  function initHorizontal() {
    var pin = document.querySelector('.hscroll__pin');
    if (!pin || !hasGSAP || reduceMotion) return;
    if (window.matchMedia('(max-width: 700px)').matches) return;

    var track = pin.querySelector('.hscroll__track');
    var bar = document.querySelector('.hscroll__progress i');
    if (!track) return;

    var getDistance = function () {
      return Math.max(0, track.scrollWidth - pin.clientWidth);
    };

    var tween = gsap.to(track, {
      x: function () { return -getDistance(); },
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: function () { return '+=' + (getDistance() + window.innerHeight * 0.4); },
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (bar) bar.style.transform = 'scaleX(' + self.progress + ')';
        }
      }
    });

    return tween;
  }

  /* ==========================================================
     MARQUEE
     ========================================================== */
  function initMarquee() {
    if (!hasGSAP || reduceMotion) return;

    document.querySelectorAll('.marquee').forEach(function (mq) {
      var track = mq.querySelector('.marquee__track');
      if (!track) return;

      var content = track.innerHTML;
      track.innerHTML = content + content + content;

      var width = track.scrollWidth / 3;
      if (!width) return;

      gsap.to(track, {
        x: -width,
        ease: 'none',
        duration: 40,
        repeat: -1
      });
    });
  }

  /* ==========================================================
     MAGNETIC ELEMENTS
     ========================================================== */
  function initMagnetic() {
    if (!hasGSAP || reduceMotion || isTouch) return;

    document.querySelectorAll('.btn, .nav__cta').forEach(function (el) {
      if (el.dataset.magnetic) return;
      el.dataset.magnetic = '1';

      var xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.28);
        yTo((e.clientY - r.top - r.height / 2) * 0.34);
      });

      el.addEventListener('mouseleave', function () {
        xTo(0);
        yTo(0);
      });
    });
  }

  /* ==========================================================
     CUSTOM CURSOR
     ========================================================== */
  function initCursor() {
    if (!hasGSAP || isTouch || reduceMotion) return;

    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    var label = ring ? ring.querySelector('span') : null;
    if (!dot || !ring) return;

    document.body.classList.add('has-cursor');

    var xDot = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3' });
    var yDot = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3' });
    var xRing = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    var yRing = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

    var shown = false;

    window.addEventListener('mousemove', function (e) {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', function () {
      if (shown) gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    });

    /* hover states */
    document.querySelectorAll('a, button, [data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        var text = el.getAttribute('data-cursor');
        if (text) {
          document.body.classList.add('is-label');
          if (label) label.textContent = text;
        } else {
          document.body.classList.add('is-hover');
        }
      });

      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('is-hover', 'is-label');
      });
    });
  }

  /* ==========================================================
     NAV — hide on scroll down, show on scroll up
     ========================================================== */
  function initNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav__toggle');
    var links = document.querySelector('.nav__links');

    if (nav) {
      var lastY = 0;
      var ticking = false;

      var onScroll = function () {
        var y = window.scrollY;
        nav.classList.toggle('is-scrolled', y > 30);

        if (y > 400 && y > lastY + 6) nav.classList.add('is-hidden');
        else if (y < lastY - 6 || y < 400) nav.classList.remove('is-hidden');

        lastY = y;
        ticking = false;
      };

      window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
      }, { passive: true });

      onScroll();
    }

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.documentElement.style.overflow = open ? 'hidden' : '';
      });

      links.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.documentElement.style.overflow = '';
        }
      });
    }

    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('is-active');
      } else {
        a.classList.remove('is-active');
      }
    });
  }

  /* ==========================================================
     SCROLL PROGRESS
     ========================================================== */
  function initProgress() {
    if (!hasGSAP || reduceMotion) return;
    var bar = document.querySelector('.progress i');
    if (!bar) return;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        bar.style.transform = 'scaleX(' + self.progress + ')';
      }
    });
  }

  /* ==========================================================
     FORM
     ========================================================== */
  function initForm() {
    var form = document.querySelector('.enquiry-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';

    var success = document.querySelector('.form-success');

    function validate(field) {
      var input = field.querySelector('input, textarea');
      if (!input) return true;

      var type = input.getAttribute('type');
      var value = input.value.trim();
      var ok = true;

      if (input.hasAttribute('required')) {
        if (type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        else if (type === 'checkbox') ok = input.checked;
        else ok = value.length > 0;
      }

      field.classList.toggle('is-invalid', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }

    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, textarea');
      if (!input) return;
      input.addEventListener('blur', function () { validate(field); });
      input.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validate(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var allOk = true;
      form.querySelectorAll('.field').forEach(function (field) {
        if (!validate(field)) allOk = false;
      });

      if (!allOk) {
        var first = form.querySelector('.field.is-invalid input, .field.is-invalid textarea');
        if (first) first.focus();
        return;
      }

      /* ---------------------------------------------------------
         DELIVERY
         This is a static site with no backend. Until a real
         endpoint is configured, the form hands the message to the
         visitor's own email client with everything pre-filled.

         To wire a real endpoint (Formspree, Netlify Forms, or your
         own API), replace the buildMailto() call with a fetch()
         POST to that endpoint and keep the success state below.
         --------------------------------------------------------- */
      var payload = {
        name:     (form.querySelector('[name="name"]')     || {}).value || '',
        email:    (form.querySelector('[name="email"]')    || {}).value || '',
        place:    (form.querySelector('[name="place"]')    || {}).value || '',
        seeking:  (form.querySelector('[name="seeking"]')  || {}).value || '',
        mode:     (form.querySelector('[name="mode"]:checked') || {}).value || ''
      };

      var lines = [
        'Name: ' + payload.name,
        'Email: ' + payload.email,
        'Where: ' + (payload.place || '—'),
        'Meets: ' + payload.mode,
        '',
        'What they are seeking:',
        (payload.seeking || '—'),
        '',
        '—',
        'Sent from unisonembodiment.com'
      ];

      var href = 'mailto:info@unisonembodiment.com'
        + '?subject=' + encodeURIComponent('Session enquiry — ' + payload.name)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      /* Open the mail client. Wrapped in try/catch because some
         in-app browsers block window.location changes mid-event. */
      try { window.location.href = href; } catch (e) { /* noop */ }

      form.style.display = 'none';
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  }

  /* ==========================================================
     PAGE TRANSITIONS (Barba)
     ========================================================== */
  function initBarba() {
    if (!hasGSAP || typeof barba === 'undefined' || reduceMotion) return;
    if (barba.wrapper) return; // already initialised

    var panel = document.querySelector('.transition__panel');
    var panel2 = document.querySelector('.transition__panel--paper');
    var mark = document.querySelector('.transition__mark');

    barba.init({
      schema: {
        prefix: 'data-barba',
        wrapper: 'wrapper'
      },
      timeout: 6000,
      prevent: function ({ el }) {
        return el.getAttribute('target') === '_blank' || el.hasAttribute('download');
      },
      transitions: [{
        sync: false,
        leave: function (data) {
          var tl = gsap.timeline();
          if (panel2) tl.fromTo(panel2, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.62, ease: 'power4.inOut' }, 0);
          if (panel) tl.fromTo(panel, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.72, ease: 'power4.inOut' }, 0.06);
          if (mark) tl.fromTo(mark, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, 0.35);
          return tl;
        },
        enter: function (data) {
          var tl = gsap.timeline();
          if (mark) tl.to(mark, { opacity: 0, duration: 0.25 }, 0);
          if (panel) tl.to(panel, { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'power4.inOut' }, 0.12);
          if (panel2) tl.to(panel2, { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, ease: 'power4.inOut' }, 0.2);
          return tl;
        },
        afterEnter: function () {
          ScrollTrigger.refresh();
        }
      }]
    });

    barba.hooks.beforeEnter(function () {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });

    barba.hooks.after(function () {
      bootPage();
    });
  }

  /* ==========================================================
     BOOT
     ========================================================== */
  function bootPage() {
    if (hasGSAP) {
      ScrollTrigger.getAll().forEach(function (st) {
        if (!st.vars || st.vars.id !== 'persistent') st.kill();
      });
    }

    initReveals();
    initImageReveals();
    initParallax();
    initManifesto();
    initHorizontal();
    initMarquee();
    initMagnetic();
    initNav();
    initProgress();
    initForm();
  }

  function boot() {
    initLenis();
    initCursor();
    initBarba();
    bootPage();
    runPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('load', function () {
    if (hasGSAP) setTimeout(function () { ScrollTrigger.refresh(); }, 300);
  });
})();
