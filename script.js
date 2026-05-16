/**
 * script.js — Portfólio Misael Serafim
 * JS encapsulado via IIFE. Sem dependências externas.
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. ANO NO FOOTER
  ───────────────────────────────────────── */
  const FooterYear = {
    init() {
      const el = document.getElementById('footer-year');
      if (el) el.textContent = new Date().getFullYear();
    },
  };

  /* ─────────────────────────────────────────
     2. REVEAL ON SCROLL (Intersection Observer)
  ───────────────────────────────────────── */
  const ScrollReveal = {
    SELECTOR: '[data-reveal]',
    VISIBLE_CLASS: 'js-reveal--visible',

    init() {
      const targets = document.querySelectorAll(this.SELECTOR);
      if (!targets.length) return;

      targets.forEach((el) => el.classList.add('js-reveal'));

      // Respeita prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach((el) => el.classList.add(this.VISIBLE_CLASS));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(this.VISIBLE_CLASS);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach((el) => observer.observe(el));
    },
  };

  /* ─────────────────────────────────────────
     3. ACESSIBILIDADE: overlay via teclado
     Garante que o overlay apareça ao focar o card via Tab
  ───────────────────────────────────────── */
  const CardA11y = {
    init() {
      // Nada adicional necessário — o CSS já usa :focus-visible no link
      // Este módulo está aqui para extensões futuras
    },
  };

  /* ─────────────────────────────────────────
     4. DARK MODE
  ───────────────────────────────────────── */
  const ThemeToggle = {
    STORAGE_KEY: 'portfolio-theme',
    TOGGLE_ID: 'theme-toggle',

    init() {
      const button = document.getElementById(this.TOGGLE_ID);
      if (!button) return;

      const storedTheme = localStorage.getItem(this.STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light';

      this.applyTheme(theme);

      button.addEventListener('click', () => {
        const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
        localStorage.setItem(this.STORAGE_KEY, nextTheme);
      });
    },

    applyTheme(theme) {
      const isDark = theme === 'dark';
      document.body.dataset.theme = theme;
      const button = document.getElementById(this.TOGGLE_ID);
      if (!button) return;
      const icon = button.querySelector('span[aria-hidden="true"]');
      const labelText = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', labelText);
      if (icon) icon.textContent = isDark ? '☀' : '☾';
    },
  };

  /* ─────────────────────────────────────────
     5. INIT
  ───────────────────────────────────────── */
  function init() {
    FooterYear.init();
    ScrollReveal.init();
    CardA11y.init();
    ThemeToggle.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
