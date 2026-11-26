(() => {
  const mount = () => {
    const template = document.getElementById('poster-design-intro-template');
    const gallery = document.querySelector('#project-root .coffee-design-gallery .coffee-design-inner');
    if (template && gallery && !document.getElementById('design-introduction')) {
      gallery.prepend(template.content.cloneNode(true));
      template.remove();
    }
    const intro = document.querySelector('#design-introduction .poster-design-intro__heading');
    if (intro) {
      intro.querySelector('h2').textContent = '项目介绍';
      intro.querySelector('span').textContent = 'Project Introduction';
    }
    const rationale = document.querySelector('#project-information .coffee-information-heading');
    if (rationale) {
      rationale.querySelector('h2').textContent = '设计阐述';
      rationale.querySelector('.coffee-title-stack small').textContent = 'Design Rationale';
      rationale.querySelector(':scope > span').textContent = 'DESIGN RATIONALE / 02';
    }
    document.querySelectorAll('a[href="#project-information"]').forEach(link => {
      [...link.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => {
        node.textContent = node.textContent.replaceAll('项目资料', '设计阐述');
      });
      if (link.hasAttribute('aria-label')) link.setAttribute('aria-label', link.getAttribute('aria-label').replaceAll('项目资料', '设计阐述'));
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
