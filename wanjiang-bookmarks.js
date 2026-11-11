(() => {
  const root = document.getElementById('project-root');
  if (!root || document.body.dataset.project !== 'wanjiang-bookmarks') return;
  const groups = window.KALINA_PROJECT_GALLERY?.['wanjiang-bookmarks'];
  if (!groups) return;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg>';
  const designs = [{src:'/assets/projects/wanjiang-bookmarks/001.webp',caption:'万江印象 · 书签礼盒设计方案封面',alt:'万江印象书签礼盒设计方案封面'}, ...groups[0].items];
  const photos = groups[1].items;
  const gallery = (slides, slug, title, en, note) => `
    <section class="coffee-design-gallery" data-bookmark-gallery aria-labelledby="${slug}-title"><div class="coffee-design-inner">
      <div class="coffee-design-heading"><span>${en.toUpperCase()} / ${slides.length} IMAGES</span><div class="coffee-title-stack"><h2 id="${slug}-title">${title}</h2><small>${en}</small></div><p>${note}</p></div>
      <div class="coffee-carousel" aria-roledescription="轮播图" aria-label="${title}">
        <div class="coffee-carousel-window"><div class="coffee-carousel-track">${slides.map((slide,index) => `<figure class="coffee-slide" aria-hidden="${index !== 0}"><a href="${slide.src}" target="_blank" rel="noopener" aria-label="查看第 ${index+1} 张${title}大图" tabindex="${index === 0 ? 0 : -1}"><img src="${slide.src}" alt="${escape(slide.alt)}" loading="${index === 0 && slug === 'bookmark-design' ? 'eager' : 'lazy'}" decoding="async"></a></figure>`).join('')}</div></div>
        <button class="coffee-carousel-arrow coffee-carousel-prev" type="button" aria-label="上一张${title}">${arrow}</button><button class="coffee-carousel-arrow coffee-carousel-next" type="button" aria-label="下一张${title}">${arrow}</button>
      </div>
      <div class="coffee-carousel-meta" aria-live="polite"><span class="coffee-carousel-count">01 / ${String(slides.length).padStart(2,'0')}</span></div>
    </div></section>`;
  root.innerHTML = window.kalinaSiteHTML(`
    <div class="coffee-top-band"><div class="coffee-top-scenery" aria-hidden="true"><i class="coffee-bubble coffee-bubble-one"></i><i class="coffee-bubble coffee-bubble-two"></i></div><section class="project-top coffee-top">
      <div class="project-topline"><a href="/work/illustration/">← 返回插画设计</a><span>ILLUSTRATION / 03</span></div><p class="project-kicker">插画设计 · 文创书签</p><h1>万江党校文创书签</h1><p class="project-subtitle">万江印象</p>
      <figure class="coffee-guide"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP，为万江党校文创书签项目作介绍" width="232" height="232"><figcaption>跟我一起，看看这套书签。</figcaption></figure>
    </section></div>
    <section class="coffee-information" aria-labelledby="coffee-information-title"><div class="coffee-information-inner"><div class="coffee-information-heading"><span>ABOUT THE PROJECT / 01</span><div class="coffee-title-stack"><h2 id="coffee-information-title">项目资料</h2><small>Project Information</small></div></div>
      ${[{"cn":"项目概述","en":"PROJECT OVERVIEW","text":"「万江印象」围绕金鳌塔公园、龙湾公园、龙江亭及万江党校展开插画设计，并转化为四款书签与配套礼盒。以阅读为使用场景，把分散的地域符号组织成可收藏、可使用的文化载体，连接城市记忆与日常体验。"},{"cn":"设计策略","en":"DESIGN STRATEGY","text":"以青绿、暖橙与金色轮廓连接四组画面，将建筑与景观作为叙事主体，通过云水、花鸟及植物组织层次。不同主题共享边框、色彩与线条规则，既保留单枚书签的识别特征，也形成连续、统一的地域文化叙事。"},{"cn":"文创应用","en":"CULTURAL APPLICATIONS","text":"主视觉延展至书签、配套吊饰与礼盒，主体画面与吊饰采用对应的文化元素，强化系列联系。礼盒封面汇聚主题景观，内盒以同系线描承接四款作品，使包装呈现整体叙事，同时清晰展示单枚书签的图形细节。"}].map(({cn,en,text},index) => `<article class="coffee-information-row"><div class="coffee-information-label"><span>0${index+1} / 03</span><h3>${cn}</h3><small>${en}</small></div><p>${text}</p></article>`).join('')}
    </div></section>
    ${gallery(designs,'bookmark-design','设计方案图','Design Presentation','独立浏览设计方案，点击图片查看大图。')}
    ${gallery(photos,'bookmark-photos','成品实拍','Product Photography','独立浏览成品实拍，点击图片查看大图。')}
    <div class="coffee-design-gallery"><div class="coffee-design-inner"><nav class="project-next" aria-label="项目导航"><a href="/work/illustration/">← 插画设计目录</a><a href="/projects/guanyi-blossoms/">下一项目：莞邑花开 ↗</a></nav></div></div>`);
})();
