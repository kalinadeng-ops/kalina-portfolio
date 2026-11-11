(() => {
  const root = document.getElementById('project-root');
  const information = root?.querySelector('.coffee-information');
  const gallery = root?.querySelector('.coffee-design-gallery');
  const title = root?.querySelector('.coffee-top h1');
  if (!information || !gallery || !title) return;
  document.body.classList.add('story-first');
  information.id = 'project-information';
  information.tabIndex = -1;
  const next = gallery.querySelector('.project-next');
  root.insertBefore(gallery, information);
  if (next) root.append(next);

  const titleRow = document.createElement('div');
  titleRow.className = 'story-title-row';
  title.before(titleRow);
  const jump = document.createElement('a');
  jump.className = 'story-information-jump';
  jump.href = '#project-information';
  jump.textContent = '项目资料 ↓';
  titleRow.append(title, jump);

  const eyebrow = information.querySelector('.coffee-information-heading > span');
  if (eyebrow) eyebrow.textContent = 'ABOUT THE PROJECT / 02';
  const position = () => document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    if (location.hash === '#project-information') information.scrollIntoView({block:'start', behavior:'instant'});
  })));
  if (document.readyState === 'complete') position(); else addEventListener('load', position, {once:true});
})();
