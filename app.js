const workMenu = document.querySelector('.work-menu');
const workMenuButton = document.querySelector('.work-menu-trigger');
const workMenuPanel = document.querySelector('.work-menu-panel');
const closeWorkMenu = (restoreFocus = false) => {
  if (!workMenuButton || !workMenuPanel) return;
  const wasOpen = !workMenuPanel.hidden;
  workMenuButton.setAttribute('aria-expanded', 'false');
  workMenuPanel.hidden = true;
  if (restoreFocus && wasOpen) workMenuButton.focus();
};
if (workMenu && workMenuButton && workMenuPanel) {
  const currentCategory = document.body.dataset.case;
  const parentCategory = currentCategory
    ? window.kalinaSiteURL(`/work/${currentCategory}/`)
    : document.querySelector('.project-topline a')?.href;
  workMenuPanel.querySelectorAll('.work-menu-option').forEach(link => {
    if (link.href === parentCategory) {
      link.classList.add('is-current');
      link.setAttribute('aria-current', currentCategory ? 'page' : 'location');
    }
  });
  const openWorkMenu = () => {
    workMenuPanel.hidden = false;
    workMenuButton.setAttribute('aria-expanded', 'true');
  };
  workMenuButton.addEventListener('click', () => workMenuPanel.hidden ? openWorkMenu() : closeWorkMenu());
  workMenuButton.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    openWorkMenu();
    const links = [...workMenuPanel.querySelectorAll('a')];
    links[event.key === 'ArrowDown' ? 0 : links.length - 1]?.focus();
  });
  workMenuPanel.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const links = [...workMenuPanel.querySelectorAll('a')];
    const index = links.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
    links[next].focus();
  });
  document.addEventListener('pointerdown', event => {
    if (!workMenu.contains(event.target)) closeWorkMenu();
  });
  document.addEventListener('focusin', event => {
    if (!workMenu.contains(event.target)) closeWorkMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !workMenuPanel.hidden) {
      event.preventDefault();
      closeWorkMenu(true);
    }
  });
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
if (menuButton && nav) {
  const closeMenu = () => {
    closeWorkMenu();
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航');
    nav.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    closeWorkMenu();
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? '打开导航' : '关闭导航');
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.defaultPrevented) {
      const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
      closeMenu();
      if (wasOpen) menuButton.focus();
    }
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.section-title, .feature-item, .about-side, .about-copy, .more-list a, .contact-list > div, .case-hero, .case-info-grid > div, .case-story-item, .case-asset-slot, .case-outro');
  revealTargets.forEach(el => el.classList.add('reveal'));
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -36px 0px', threshold: 0.08 });
  revealTargets.forEach(el => observer.observe(el));
}

if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.collage-sheet, .feature-art, .case-cover').forEach(el => {
    let frame = 0;
    el.addEventListener('pointermove', event => {
      const x = event.clientX;
      const y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const horizontal = Math.max(-1, Math.min(1, ((x - rect.left) / rect.width - .5) * 2));
        const vertical = Math.max(-1, Math.min(1, ((y - rect.top) / rect.height - .5) * 2));
        el.style.setProperty('--tilt-y', `${(horizontal * 3.5).toFixed(2)}deg`);
        el.style.setProperty('--tilt-x', `${(-vertical * 3.5).toFixed(2)}deg`);
      });
    });
    el.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    });
  });
}
