(() => {
  const root = document.getElementById('project-root');
  const titleRow = root?.querySelector('.story-title-row');
  const jump = titleRow?.querySelector('.story-information-jump');
  if (!jump) return;

  document.body.classList.add('project-detail-chrome');
  titleRow.classList.add('story-title-row--info-button');
  if (document.body.classList.contains('project-exhibition')) {
    const subtitle = titleRow.parentElement.querySelector('.project-subtitle');
    if (subtitle) titleRow.append(subtitle);
  }

  const arrow = document.createElement('span');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↓';
  jump.replaceChildren('先看项目资料', arrow);

  for (const intro of root.querySelectorAll('.curated-intro')) {
    const gallery = intro.closest('.coffee-design-gallery');
    const heading = gallery?.querySelector('.coffee-design-heading');
    const titleStack = heading?.querySelector('.coffee-title-stack');
    const count = intro.querySelector('.curated-count');
    if (!titleStack || !count) continue;

    heading.classList.add('coffee-design-heading--with-count');
    titleStack.append(count);
    intro.remove();
  }
})();
