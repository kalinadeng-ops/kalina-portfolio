(() => {
  const params = new URLSearchParams(location.search);
  if (document.body.dataset.project !== 'voyager-coffee') return;
  const gallery = document.querySelector('.curated-gallery');
  const sourceButtons = [...(gallery?.querySelectorAll('.curated-overview .curated-open') || [])];
  const sources = sourceButtons.map(button => button.querySelector('img'));
  const reader = document.querySelector('.art-reader');
  if (!gallery || !sources.length || !reader) return;

  const compact = matchMedia('(max-width:1023px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const pad = index => String(index + 1).padStart(2, '0');
  const requested = Number(params.get('image') || 1) - 1;
  let active = Number.isFinite(requested) ? Math.max(0, Math.min(sources.length - 1, requested)) : 0;
  let noticeTimer, readerOpened = false, suppressClickUntil = 0, gesture;

  const album = document.createElement('section');
  album.className = 'mobile-album';
  album.id = 'mobile-album-gallery';
  album.setAttribute('aria-label', '掌上展册');
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg>';
  const magnifier = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.2"/><path d="m12.4 12.4 4.3 4.3M6 8.5h5M8.5 6v5"/></svg>';
  album.innerHTML = '<div class="album-stage"><div class="album-stage-meta" aria-hidden="true"><span>EXHIBIT <b class="album-stage-number">01</b></span><span>轻点细看' + magnifier + '</span></div><div class="album-art-area" role="group" aria-label="展册作品，可左右滑动切换"></div><div class="album-notice" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><div class="album-controls"><button type="button" class="reader-arrow reader-prev album-prev" aria-label="上一件展册作品">' + arrow + '</button><span class="album-count" aria-live="polite" aria-atomic="true"><strong>01</strong><span aria-hidden="true">/</span><span>' + pad(sources.length - 1) + '</span></span><button type="button" class="reader-arrow album-next" aria-label="下一件展册作品">' + arrow + '</button></div><p class="album-hint">左右滑动翻展册 · 轻点主图细看</p><div class="album-thumbs" role="group" aria-label="完整展册导航"></div>';
  gallery.append(album);
  const stage = album.querySelector('.album-stage');
  const light = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  light.classList.add('album-stage-light');
  light.setAttribute('viewBox', '0 0 360 360');
  light.setAttribute('preserveAspectRatio', 'none');
  light.setAttribute('aria-hidden', 'true');
  const threads = [
    'M-36 133.2 C22 114.48 42 292.32 132 293.88 S278 80.16 396 161.28',
    'M-36 236.16 C44 259.56 70 69.24 152 72.36 S288 279.84 396 211.2'
  ];
  light.innerHTML = '<defs><linearGradient id="album-stage-thread"><stop stop-color="#92bce6"/><stop offset=".52" stop-color="#b4afe0"/><stop offset="1" stop-color="#dfa7ca"/></linearGradient><linearGradient id="album-stage-thread-two"><stop stop-color="#dfa7ca"/><stop offset=".5" stop-color="#b8afe2"/><stop offset="1" stop-color="#91bde8"/></linearGradient></defs>' + threads.map((path, index) => `<path class="album-thread-base${index ? ' album-thread-two' : ''}" d="${path}"/><path class="album-thread-glow${index ? ' album-thread-two' : ''}" d="${path}"/>`).join('');
  stage.prepend(light);
  const area = album.querySelector('.album-art-area');
  const rail = album.querySelector('.album-thumbs');
  const previous = album.querySelector('.album-prev');
  const next = album.querySelector('.album-next');
  const count = album.querySelector('.album-count');
  const number = album.querySelector('.album-stage-number');
  const notice = album.querySelector('.gallery-end-notice');
  const artButtons = [], thumbButtons = [];

  sources.forEach((source, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'album-art';
    button.setAttribute('aria-label', `细看第 ${index + 1} 件展册作品`);
    button.setAttribute('aria-haspopup', 'dialog');
    const image = source.cloneNode(true);
    image.draggable = false;
    image.loading = Math.abs(index - active) <= 1 ? 'eager' : 'lazy';
    button.append(image);
    button.addEventListener('click', () => {
      if (index !== active) return;
      readerOpened = true;
      sourceButtons[index].click();
    });
    area.append(button);
    artButtons.push(button);

    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'album-thumb';
    thumb.setAttribute('aria-label', `选择第 ${index + 1} 件展册作品`);
    const tiny = source.cloneNode(true);
    tiny.alt = '';
    tiny.draggable = false;
    tiny.loading = 'lazy';
    const label = document.createElement('span');
    label.textContent = pad(index);
    thumb.append(tiny, label);
    thumb.addEventListener('click', () => select(index));
    rail.append(thumb);
    thumbButtons.push(thumb);
  });

  function centerThumb(smooth = false) {
    if (!compact.matches || !rail.clientWidth) return;
    const thumb = thumbButtons[active];
    const left = thumb.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    rail.scrollTo({ left: left - (rail.clientWidth - thumb.offsetWidth) / 2, behavior: smooth && !reduced.matches ? 'smooth' : 'instant' });
  }

  function select(index, smooth = true) {
    clearTimeout(noticeTimer);
    notice.hidden = true;
    if (index >= sources.length) {
      notice.hidden = false;
      noticeTimer = setTimeout(() => { notice.hidden = true; }, 1500);
      return;
    }
    const focusArt = artButtons.includes(document.activeElement);
    active = Math.max(0, index);
    artButtons.forEach((button, i) => {
      const current = i === active;
      button.classList.toggle('is-current', current);
      button.setAttribute('aria-hidden', String(!current));
      button.tabIndex = current ? 0 : -1;
      thumbButtons[i].setAttribute('aria-pressed', String(current));
      if (Math.abs(i - active) <= 1) button.querySelector('img').loading = 'eager';
    });
    number.textContent = pad(active);
    count.querySelector('strong').textContent = pad(active);
    count.setAttribute('aria-label', `第 ${active + 1} 张，共 ${sources.length} 张`);
    count.style.setProperty('--album-progress', String((active + 1) / sources.length));
    previous.disabled = active === 0;
    next.setAttribute('aria-disabled', String(active === sources.length - 1));
    if (focusArt || (previous.disabled && document.activeElement === previous)) artButtons[active].focus({ preventScroll: true });
    centerThumb(smooth);
  }
  previous.addEventListener('click', () => select(active - 1));
  next.addEventListener('click', () => select(active + 1));
  album.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      select(active + (event.key === 'ArrowRight' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      select(event.key === 'Home' ? 0 : sources.length - 1);
    }
  });
  reader.addEventListener('close', () => {
    if (!readerOpened) return;
    readerOpened = false;
    const viewed = reader.querySelector('.reader-image')?.getAttribute('src');
    const index = sources.findIndex(source => source.getAttribute('src') === viewed);
    if (index >= 0) select(index, false);
    if (compact.matches) artButtons[active].focus({ preventScroll: true });
  });

  const finishGesture = () => {
    const pointer = gesture?.id;
    gesture = null;
    if (pointer !== undefined && stage.hasPointerCapture(pointer)) stage.releasePointerCapture(pointer);
  };
  stage.addEventListener('pointerdown', event => {
    if (!compact.matches || !event.isPrimary || event.button !== 0) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, axis: null };
  }, { passive: true });
  stage.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 8) {
      gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'x' : 'y';
      if (gesture.axis === 'x') stage.setPointerCapture(event.pointerId);
    }
    if (gesture.axis === 'x') { event.preventDefault(); gesture.dx = dx; }
  }, { passive: false });
  stage.addEventListener('pointerup', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const horizontal = gesture.axis === 'x', dx = gesture.dx;
    if (horizontal) { event.preventDefault(); suppressClickUntil = performance.now() + 450; }
    finishGesture();
    if (horizontal && Math.abs(dx) >= 36) select(active + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', finishGesture);
  stage.addEventListener('lostpointercapture', () => { if (gesture) finishGesture(); });
  stage.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);

  const exhibitionCount = gallery.querySelector('.curated-count');
  const originalCount = exhibitionCount?.innerHTML;
  function applyPresentation() {
    document.body.dataset.mobileExhibit = compact.matches ? 'album' : '';
    if (exhibitionCount) exhibitionCount.innerHTML = compact.matches ? `${sources.length} 件作品 <span>／ 掌上展册</span>` : originalCount;
    centerThumb(false);
  }
  compact.addEventListener('change', () => { finishGesture(); applyPresentation(); });
  applyPresentation();
  select(active, false);
  const position = () => document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    centerThumb(false);
    if (compact.matches && location.hash === '#mobile-album-gallery') album.scrollIntoView({ block: 'start', behavior: 'instant' });
  })));
  if (document.readyState === 'complete') position(); else addEventListener('load', position, { once: true });
})();
