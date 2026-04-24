/**
 * Premium Academic Homepage — Interaction Layer
 * Scroll-aware navigation, reveal animations, and polished micro-interactions.
 */
(function () {
  'use strict';

  /* ================================================================
     Scroll-aware navigation
     ================================================================ */
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.nav-links a');
  var sections = [];

  function collectSections() {
    sections = [];
    document.querySelectorAll('section[id]').forEach(function (s) {
      sections.push({ id: s.id, el: s, top: 0 });
    });
  }
  collectSections();

  function onScroll() {
    var y = window.scrollY;

    // Nav border
    if (y > 8) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section
    var current = '';
    for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].el.getBoundingClientRect();
      if (rect.top <= 120) {
        current = sections[i].id;
        break;
      }
    }

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ================================================================
     Scroll-triggered reveals (Intersection Observer)
     ================================================================ */
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ================================================================
     Mobile navigation toggle
     ================================================================ */
  var toggle = document.getElementById('navToggle');
  var linksEl = document.getElementById('navLinks');

  if (toggle && linksEl) {
    toggle.addEventListener('click', function () {
      linksEl.classList.toggle('open');
    });

    linksEl.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        linksEl.classList.remove('open');
      });
    });
  }

  /* ================================================================
     Smooth scroll for anchor links (polyfill for Safari)
     ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ================================================================
     Re-collect section positions on resize
     ================================================================ */
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(collectSections, 200);
  });

  /* ================================================================
     Subtle header parallax on scroll
     ================================================================ */
  var heroName = document.querySelector('.hero-name');
  if (heroName) {
    window.addEventListener('scroll', function () {
      var scroll = window.scrollY;
      if (scroll < 400) {
        var opacity = 1 - scroll / 350;
        var translate = scroll * 0.15;
        heroName.style.opacity = Math.max(opacity, 0.15);
        heroName.style.transform = 'translateY(' + translate + 'px)';
      }
    }, { passive: true });
  }

})();
