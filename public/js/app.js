(function () {
  'use strict';

  const state = {
    content: null,
    view: 'home',
    sectionId: null,
    slideIndex: 0,
    notesVisible: false,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const views = {
    home: $('#view-home'),
    presenter: $('#view-presenter'),
  };

  async function loadContent() {
    const base = document.querySelector('base')?.href
      || new URL('./', window.location.href).href;
    const sources = [
      new URL('data/content.json', base).href,
      '/api/content',
    ];
    for (const url of sources) {
      try {
        const res = await fetch(url);
        if (res.ok) return res.json();
      } catch (_) {
        /* try next source */
      }
    }
    throw new Error('Failed to load training content');
  }

  async function init() {
    state.content = await loadContent();
    if (state.content.meta?.logo) {
      $('#header-logo').src = state.content.meta.logo;
    }
    if (state.content.meta?.favicon) {
      document.querySelector('link[rel="icon"]').href = state.content.meta.favicon;
    }
    renderHome();
    bindEvents();
    updateNav();
  }

  function bindEvents() {
    $('#header-brand').addEventListener('click', goHome);
    $('#btn-prev').addEventListener('click', prevSlide);
    $('#btn-next').addEventListener('click', nextSlide);
    $('#btn-fullscreen').addEventListener('click', toggleFullscreen);
    $('#btn-notes').addEventListener('click', toggleNotes);

    document.addEventListener('keydown', (e) => {
      if (state.view === 'presenter') {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        if (e.key === 'n' || e.key === 'N') toggleNotes();
      }
      if (e.key === 'Escape') {
        if (document.body.classList.contains('fullscreen')) {
          document.body.classList.remove('fullscreen');
        } else if (state.view === 'presenter') {
          goHome();
        }
      }
    });
  }

  function showView(name) {
    state.view = name;
    Object.values(views).forEach((v) => v.classList.remove('active'));
    views[name].classList.add('active');
    updateNav();
  }

  function updateNav() {
    const nav = $('#header-nav');
    const crumbs = [`<button onclick="window.__app.goHome()">Home</button>`];

    if (state.sectionId) {
      const sec = getSection(state.sectionId);
      crumbs.push('<span class="sep">›</span>');
      crumbs.push(`<span class="current">${esc(sec.title)}</span>`);
    }

    nav.innerHTML = `<div class="breadcrumb">${crumbs.join('')}</div>`;
  }

  function renderHome() {
    const grid = $('#section-grid');
    grid.innerHTML = state.content.sections
      .map((s, i) => `
        <div class="section-card" style="--card-accent: ${s.color}" data-section="${s.id}">
          <div class="section-number" style="background: linear-gradient(135deg, ${s.color}, ${s.color}99)">${i + 1}</div>
          <img class="section-card-icon" src="${s.icon}" alt="" onerror="this.style.display='none'" />
          <div class="section-card-body">
            <h3>${esc(s.title)}</h3>
            <p>${s.slides.length} slides</p>
          </div>
          <span class="section-arrow">→</span>
        </div>`)
      .join('');

    grid.querySelectorAll('.section-card').forEach((card) => {
      card.addEventListener('click', () => goPresenter(card.dataset.section));
    });
  }

  function goHome() {
    state.sectionId = null;
    state.slideIndex = 0;
    showView('home');
  }

  function goPresenter(sectionId, slideIndex = 0) {
    state.sectionId = sectionId;
    state.slideIndex = slideIndex;
    renderPresenter();
    showView('presenter');
  }

  function renderPresenter() {
    const sec = getSection(state.sectionId);
    const slides = sec.slides;

    $('#sidebar-section-title').textContent = sec.title;
    $('#sidebar-slide-count').textContent = `${slides.length} slides`;

    const thumbs = $('#slide-thumbs');
    thumbs.innerHTML = slides
      .map((s, i) => `
        <li class="${i === state.slideIndex ? 'active' : ''}" data-index="${i}">
          <span class="thumb-num">${i + 1}</span>
          <span>${esc(s.title || s.type)}</span>
        </li>`)
      .join('');

    thumbs.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => {
        state.slideIndex = parseInt(li.dataset.index, 10);
        renderSlide();
        updateThumbs();
      });
    });

    renderSlide();
  }

  function renderSlide() {
    const sec = getSection(state.sectionId);
    const slide = sec.slides[state.slideIndex];
    $('#slide-stage').innerHTML = buildSlideHTML(slide);
    $('#slide-counter').textContent = `${state.slideIndex + 1} / ${sec.slides.length}`;
    $('#notes-text').textContent = slide.notes || 'No speaker notes for this slide.';
    updateThumbs();
    $('#btn-prev').disabled = state.slideIndex === 0;
    $('#btn-next').disabled = state.slideIndex === sec.slides.length - 1;
  }

  function buildSlideHTML(slide) {
    const mediaTag = (url) => {
      if (!url) return '';
      if (url.endsWith('.mp4')) {
        return `<video src="${url}" autoplay loop muted playsinline></video>`;
      }
      return `<img src="${url}" alt="" onerror="this.parentElement.style.display='none'" />`;
    };

    if (slide.type === 'title') {
      return `
        <div class="slide slide-title-layout">
          <div class="slide-accent"></div>
          <div class="slide-title-body">
            <div class="slide-title-text">
              <h2>${esc(slide.title)}</h2>
              ${slide.subtitle ? `<p class="subtitle">${esc(slide.subtitle)}</p>` : ''}
            </div>
            ${slide.image ? `<div class="slide-title-image">${mediaTag(slide.image)}</div>` : ''}
          </div>
        </div>`;
    }

    if (slide.type === 'grid') {
      const items = (slide.items || [])
        .map(
          (item) => `
          <div class="grid-item">
            ${mediaTag(item.icon)}
            <h4>${esc(item.label)}</h4>
            <p>${esc(item.desc)}</p>
          </div>`
        )
        .join('');

      return `
        <div class="slide slide-grid-layout">
          <h2>${esc(slide.title)}</h2>
          <div class="slide-grid">${items}</div>
        </div>`;
    }

    const bullets = (slide.bullets || []).map((b) => `<li>${esc(b)}</li>`).join('');

    return `
      <div class="slide slide-content-layout">
        <div class="slide-content-left">
          <h2>${esc(slide.title)}</h2>
          ${bullets ? `<ul class="slide-bullets">${bullets}</ul>` : ''}
        </div>
        ${slide.image ? `<div class="slide-content-right">${mediaTag(slide.image)}</div>` : ''}
      </div>`;
  }

  function updateThumbs() {
    $$('#slide-thumbs li').forEach((li, i) => {
      li.classList.toggle('active', i === state.slideIndex);
    });
  }

  function prevSlide() {
    if (state.slideIndex > 0) {
      state.slideIndex--;
      renderSlide();
    }
  }

  function nextSlide() {
    const sec = getSection(state.sectionId);
    if (state.slideIndex < sec.slides.length - 1) {
      state.slideIndex++;
      renderSlide();
    }
  }

  function toggleFullscreen() {
    document.body.classList.toggle('fullscreen');
  }

  function toggleNotes() {
    state.notesVisible = !state.notesVisible;
    $('#speaker-notes').classList.toggle('visible', state.notesVisible);
  }

  function getSection(id) {
    return state.content.sections.find((s) => s.id === id);
  }

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  window.__app = { goHome, goPresenter };

  init();
})();
