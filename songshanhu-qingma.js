(() => {
  const root = document.getElementById('project-root');
  if (!root || document.body.dataset.project !== 'songshanhu-qingma') return;
  const groups = window.KALINA_PROJECT_GALLERY?.['songshanhu-qingma'];
  if (!groups) return;
  const slides = [{src:'/assets/projects/songshanhu-qingma/001.webp',alt:'松山湖中学生青马工程培训班活动视觉设计方案封面',caption:'主题方案封面'}, ...groups[0].items];
  const information = [
    {cn:'项目概述',en:'PROJECT OVERVIEW',text:'围绕松山湖中学生「青马工程」培训班，以「走在前列 建新功」为主题构建活动视觉方案，从背景板延展至学员手册与互动手举牌，让主题表达贯穿活动展示、学习资料与互动场景。'},
    {cn:'设计策略',en:'DESIGN STRATEGY',text:'以蓝绿为主色、橙色为点缀，将青年人物、纸飞机、灯塔与松山湖地域元素融入画面。通过鲜明的标题层级和舒展的曲线组织信息，在青春活力与活动识别之间建立统一的视觉语言。'},
    {cn:'物料延展',en:'EVENT APPLICATIONS',text:'围绕统一配色与图形元素，适配活动背景板、学员手册及手举牌。根据远距离识别、近距离阅读与互动展示的使用差异，调整标题比例、信息密度和版式结构，保持不同物料之间的系列感。'}
  ];
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg>';
  const mediaRoot = '/assets/projects/songshanhu-qingma/';
  const fieldPhotos = [
    { file: 'hand-signs.webp', caption: '互动手举牌 · 学员合影', alt: '八名学员在青马班主题背景板前展示五款活动手举牌', width: 1702, height: 1276 },
    { file: 'opening-talk.webp', caption: '开班动员', alt: '开班讲话现场，讲台牌和后方大屏延用同一活动主视觉', width: 910, height: 584 },
    { file: 'closing-group.webp', caption: '结业合影', alt: '六位参与者在结业现场的大屏前合影', width: 920, height: 577 }
  ];
  const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function carousel(items, label, sourceOrder = false) {
    const figures = items.map(({ src, alt, caption, width, height }, index) => {
      const dimensions = width && height ? `width="${width}" height="${height}"` : '';
      return `<figure class="coffee-slide" aria-hidden="${index !== 0}"><a href="${src}" aria-label="查看第 ${index + 1} 张${label}" tabindex="${index ? -1 : 0}">
        <img src="${src}" alt="${escape(alt)}" data-label="${escape(caption || alt)}" ${dimensions} loading="${index || sourceOrder ? 'lazy' : 'eager'}" decoding="async"></a></figure>`;
    }).join('');
    return `<div class="coffee-carousel" role="region" aria-roledescription="轮播图" aria-label="松山湖青马班${label}" ${sourceOrder ? 'data-source-order data-count-unit="张照片"' : ''}>
      <div class="coffee-carousel-window"><div class="coffee-carousel-track">${figures}</div></div>
      <button class="coffee-carousel-arrow coffee-carousel-prev" type="button" aria-label="上一张${label}">${arrow}</button>
      <button class="coffee-carousel-arrow coffee-carousel-next" type="button" aria-label="下一张${label}">${arrow}</button>
    </div><div class="coffee-carousel-meta" aria-live="polite"><span class="coffee-carousel-count">01 / ${String(items.length).padStart(2, '0')}</span></div>`;
  }
  root.innerHTML = window.kalinaSiteHTML(`
    <div class="coffee-top-band"><div class="coffee-top-scenery" aria-hidden="true"><i class="coffee-bubble coffee-bubble-one"></i><i class="coffee-bubble coffee-bubble-two"></i></div>
      <section class="project-top coffee-top">
        <div class="project-topline"><a href="/work/event-materials/">← 返回活动物料设计</a><span>EVENT VISUAL DESIGN / 01</span></div>
        <p class="project-kicker">活动视觉与物料设计</p><h1>松山湖青马班</h1><p class="project-subtitle">走在前列 建新功</p>
        <figure class="coffee-guide"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP 为松山湖青马班项目作介绍" width="232" height="232"><figcaption>跟我一起，走进这场设计。</figcaption></figure>
      </section>
    </div>
    <section class="coffee-information" aria-labelledby="coffee-information-title"><div class="coffee-information-inner">
      <div class="coffee-information-heading"><span>ABOUT THE PROJECT</span><div class="coffee-title-stack"><h2 id="coffee-information-title">项目资料</h2><small>Project Information</small></div></div>
      ${information.map(({cn,en,text},index) => `<article class="coffee-information-row"><div class="coffee-information-label"><span>0${index+1} / 03</span><h3>${cn}</h3><small>${en}</small></div><p>${text}</p></article>`).join('')}
    </div></section>
    <section class="coffee-design-gallery" aria-labelledby="coffee-gallery-title"><div class="coffee-design-inner">
      <div class="coffee-design-heading"><span>DESIGN PRESENTATION / ${slides.length} IMAGES</span><div class="coffee-title-stack"><h2 id="coffee-gallery-title">设计方案图</h2><small>Design Presentation</small></div><p>从主题主视觉，走向完整的活动物料。</p></div>
      ${carousel(slides, '设计方案图')}
    </div></section>
    <section class="coffee-design-gallery project-site-photos" id="on-site" data-photo-sheet aria-labelledby="site-photos-title"><div class="coffee-design-inner">
      <div class="field-toolbar">
        <div class="coffee-design-heading"><span>ON-SITE / ${fieldPhotos.length} IMAGES</span><div class="coffee-title-stack"><h2 id="site-photos-title">现场实拍</h2><small lang="en">On-site Photography</small></div></div>
        <button class="site-recap-open" type="button" aria-haspopup="dialog" aria-controls="site-recap-reader">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M4 2.6 13 8l-9 5.4z"/></svg>
          观看活动回顾 <span>0:34</span>
        </button>
      </div>
      ${carousel(fieldPhotos.map(photo => ({ ...photo, src: mediaRoot + photo.file })), '现场照片', true)}
        <dialog class="site-recap-reader" id="site-recap-reader" aria-labelledby="site-recap-title">
          <header><h2 id="site-recap-title">活动回顾</h2><button class="reader-button reader-close" type="button" aria-label="关闭视频" autofocus>${closeIcon}</button></header>
          <video controls playsinline preload="none" controlslist="nodownload" aria-label="松山湖中学生青马班圆满结业活动回顾"></video>
          <p class="site-recap-error" role="status" hidden>视频加载失败，请关闭后重新打开。</p>
        </dialog>
      <nav class="project-next" aria-label="项目导航"><a href="/work/event-materials/">← 活动物料设计目录</a><a href="/work/illustration/">继续参观：插画设计 ↗</a></nav>
    </div></section>`);

  const filmTrigger = root.querySelector('.site-recap-open');
  const filmReader = root.querySelector('#site-recap-reader');
  const film = filmReader.querySelector('video');
  const errorMessage = filmReader.querySelector('.site-recap-error');
  filmTrigger.addEventListener('click', () => {
    errorMessage.hidden = true;
    filmReader.showModal();
    film.poster = window.kalinaSiteURL(mediaRoot + 'event-recap-poster.webp');
    film.src = window.kalinaSiteURL(mediaRoot + 'event-recap.mp4');
    film.play().catch(() => { /* Native controls remain available for manual playback. */ });
  });
  film.addEventListener('error', () => { if (filmReader.open) errorMessage.hidden = false; });
  filmReader.addEventListener('close', () => {
    film.pause();
    film.removeAttribute('src');
    film.load();
    filmTrigger.focus({ preventScroll: true });
  });
  filmReader.querySelector('.reader-close').addEventListener('click', () => filmReader.close());
  filmReader.addEventListener('click', event => {
    if (event.target !== filmReader) return;
    const rect = filmReader.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) filmReader.close();
  });
  // Keep a direct link aligned while the headings and gallery above it settle.
  if (location.hash === '#on-site') {
    const controller = new AbortController();
    const section = root.querySelector('#on-site');
    const header = document.querySelector('.site-header');
    const align = () => {
      if (controller.signal.aborted || location.hash !== '#on-site') return;
      const offset = section.getBoundingClientRect().top - header.getBoundingClientRect().height - 18;
      if (Math.abs(offset) > 1) window.scrollTo({ top: window.scrollY + offset, behavior: 'instant' });
    };
    const layout = new ResizeObserver(align);
    const release = () => { controller.abort(); layout.disconnect(); };
    for (const event of ['pointerdown', 'touchstart', 'wheel', 'keydown', 'hashchange', 'pagehide']) {
      window.addEventListener(event, release, { passive: true, signal: controller.signal });
    }
    window.addEventListener('DOMContentLoaded', () => {
      for (const element of root.querySelectorAll('.coffee-top-band, .coffee-design-heading, .curated-gallery')) layout.observe(element);
      align();
    }, { once: true, signal: controller.signal });
    window.addEventListener('load', () => {
      document.fonts.ready.then(align);
      setTimeout(release, 3000);
    }, { once: true, signal: controller.signal });
  }
})();
