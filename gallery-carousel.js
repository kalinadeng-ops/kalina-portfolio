(() => {
  document.querySelectorAll('.coffee-carousel').forEach(carousel => {
    if (carousel.dataset.galleryEnhanced) return;
    const figures = [...carousel.querySelectorAll('.coffee-slide')];
    const track = carousel.querySelector('.coffee-carousel-track');
    const previous = carousel.querySelector('.coffee-carousel-prev');
    const next = carousel.querySelector('.coffee-carousel-next');
    const meta = carousel.nextElementSibling;
    const count = meta?.querySelector('.coffee-carousel-count');
    if (!figures.length || !track || !previous || !next || !count) return;
    carousel.dataset.galleryEnhanced = 'true';
    carousel.tabIndex = 0;
    next.disabled = false;
    meta.classList.add('gallery-boundary-meta');
    meta.setAttribute('aria-atomic', 'true');
    meta.querySelectorAll('.coffee-carousel-caption').forEach(caption => caption.remove());
    count.innerHTML = `<span class="gallery-page-star" aria-hidden="true">✦</span><span class="gallery-page-sr">第</span><span class="gallery-page-current">01</span><span class="gallery-page-sr">张，共</span><span class="gallery-page-divider" aria-hidden="true">/</span><span class="gallery-page-total">${String(figures.length).padStart(2,'0')}</span><span class="gallery-page-sr">张</span><span class="gallery-page-progress" aria-hidden="true"></span>`;
    const current = count.querySelector('.gallery-page-current');
    const slot = document.createElement('div');
    slot.className = 'gallery-boundary-slot';
    slot.setAttribute('role', 'status');
    slot.setAttribute('aria-live', 'polite');
    slot.setAttribute('aria-atomic', 'true');
    slot.innerHTML = '<div class="gallery-end-notice" hidden><span class="gallery-end-spark" aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div>';
    carousel.append(slot);
    const notice = slot.querySelector('.gallery-end-notice');
    let active = 0;
    let noticeTimer;
    const show = (index, prefetch = true) => {
      clearTimeout(noticeTimer);
      notice.hidden = true;
      if (index >= figures.length) {
        notice.hidden = false;
        noticeTimer = setTimeout(() => { notice.hidden = true; }, 1500);
        return;
      }
      active = Math.max(0, index);
      if (prefetch) [active-1, active, active+1].filter(n => n >= 0 && n < figures.length).forEach(n => {
        const img = figures[n].querySelector('img');
        if (img) img.loading = 'eager';
      });
      track.style.transform = `translate3d(-${active*100}%,0,0)`;
      figures.forEach((figure, i) => {
        figure.setAttribute('aria-hidden', String(i !== active));
        const link = figure.querySelector('a');
        if (link) link.tabIndex = i === active ? 0 : -1;
      });
      current.textContent = String(active+1).padStart(2,'0');
      count.style.setProperty('--gallery-progress', `${(active+1)/figures.length*100}%`);
      const focused = document.activeElement;
      previous.disabled = active === 0;
      next.setAttribute('aria-disabled', String(active === figures.length-1));
      if (previous.disabled && focused === previous) carousel.focus({preventScroll:true});
    };
    previous.addEventListener('click', () => show(active-1));
    next.addEventListener('click', () => show(active+1));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(active + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let touchX = 0;
    let touchY = 0;
    carousel.addEventListener('touchstart', event => {touchX=event.changedTouches[0].screenX;touchY=event.changedTouches[0].screenY;}, {passive:true});
    carousel.addEventListener('touchend', event => {
      const dx = event.changedTouches[0].screenX-touchX;
      const dy = event.changedTouches[0].screenY-touchY;
      if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) show(active+(dx<0?1:-1));
    }, {passive:true});
    show(0, false);
  });
})();
