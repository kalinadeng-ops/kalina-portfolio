(() => {
  const root = document.getElementById('project-root');
  if (!root || document.body.dataset.project !== 'heritage-food') return;
  const groups = window.KALINA_PROJECT_GALLERY?.['heritage-food'];
  if (!groups) return;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg>';
  const brandLogo = '<img src="/assets/projects/heritage-food/anshangzhi-logo.svg" width="247" height="72" alt="案上志">';
  const cover = {src:'/assets/projects/heritage-food/nanxiang-color.webp', preview:'/assets/projects/heritage-food/preview/nanxiang-color.webp', thumb:'/assets/projects/heritage-food/thumb/nanxiang-color.webp', width:1672, height:941, caption:'南翔小笼 · 上色完成稿', alt:'南翔小笼 · 上色完成稿'};
  const designs = [cover, ...groups[0].items];
  const stages = designs.flatMap(color => {
    const prefix = color.src.replace('-color.webp', '-');
    return [...groups[1].items.filter(item => item.src.startsWith(prefix)), color];
  });
  const processLabels = ['构图草稿', '黑白线稿', '设色完成'];
  const processNotes = [
    ['观察人物、桌沿与窗外景物的位置，明确前后景的空间关系。', '重点看捏褶的双手、包子轮廓与竹笼细线之间的层次。', '以克制的淡彩连接人物肤色、木质器物与青绿环境。'],
    ['通过手中的饼模、操作台与月饼安排画面的主次。', '比较木模纹样、手部轮廓与月饼表面线条的疏密。', '让月饼的暖色与环境的冷色形成清晰的视觉层次。'],
    ['沿拉开的面条观察双臂的动势及其与操作台的关系。', '重点看面条曲线、手部衔接与前后遮挡。', '在面食与衣物的浅色中保留轮廓和空间层次。'],
    ['观察包粽动作与桌面食材之间的主次关系。', '重点看粽叶折角、绑线与手指的衔接。', '通过粽叶的绿色联系食材和周围环境。'],
    ['观察人物、烤鸭与操作台如何构成完整的制作场景。', '比较器具、食物与人物衣褶的线条处理。', '让烤鸭的暖色成为画面的视觉重点。'],
    ['观察制作动作与案台、食物之间的位置关系。', '比较手部、器具与食材轮廓的轻重。', '在统一淡彩中区分食物、衣物与室内材质。'],
    ['观察人物动作、馕与制作环境的空间关系。', '重点看服饰细节、馕的纹样与人物轮廓。', '用服饰与食物的色彩呈现地域生活特点。'],
    ['观察人物、煎饼与操作器具的相互支撑关系。', '比较饼的边缘、器具与衣褶的线条变化。', '统一人物、食物与背景的明暗和色彩关系。']
  ];
  const processWorks = designs.map((color, index) => ({
    name: color.caption.split(' · ')[0],
    images: stages.slice(index * 3, index * 3 + 3),
    notes: processNotes[index]
  }));
  const processSection = () => `
    <section class="coffee-design-gallery" id="heritage-process" aria-labelledby="heritage-process-title"><div class="coffee-design-inner">
      <div class="coffee-design-heading"><span>8 SUBJECTS / 3 STAGES</span><div class="coffee-title-stack"><h2 id="heritage-process-title">创作拆解</h2><small>Drawing Process</small></div></div>
      <div class="process-workline"><h3 class="process-work-title">${escape(processWorks[0].name)}</h3><span class="process-work-count">01 / 08</span></div>
      <div class="process-stages" role="group" aria-label="绘画阶段">${processLabels.map((label, index) => `<button type="button" data-process-stage="${index}" aria-pressed="${index === 0}">${label}</button>`).join('')}</div>
      <figure class="process-figure"><button type="button" class="process-open" aria-haspopup="dialog" aria-label="细看当前阶段"><img class="process-art" src="${processWorks[0].images[0].preview || processWorks[0].images[0].src}" alt="${escape(processWorks[0].name)} · 构图草稿" width="1672" height="941" loading="lazy" decoding="async"></button><figcaption class="process-note" aria-live="polite">${processWorks[0].notes[0]}</figcaption></figure>
      <div class="process-turn"><button type="button" data-process-step="-1">上一幅</button><span class="process-position" aria-live="polite">${escape(processWorks[0].name)} · 构图草稿</span><button type="button" data-process-step="1">下一幅</button></div>
      <div class="process-thumbs" role="group" aria-label="选择作品">${processWorks.map((work, index) => `<button class="process-thumb" type="button" data-process-work="${index}" aria-label="查看${escape(work.name)}的创作拆解" aria-pressed="${index === 0}"><img src="${work.images[2].thumb || work.images[2].src}" alt="" width="1672" height="941" loading="lazy" decoding="async"><span>${escape(work.name)}</span></button>`).join('')}</div>
    </div></section>`;
  const gallery = (slides, slug, title, en, note) => `
    <section class="coffee-design-gallery" aria-labelledby="${slug}-title"><div class="coffee-design-inner">
      <div class="coffee-design-heading"><span>${en.toUpperCase()} / ${slides.length} IMAGES</span><div class="coffee-title-stack"><h2 id="${slug}-title">${title}</h2><small>${en}</small></div><p>${note}</p></div>
      <div class="coffee-carousel" data-source-order aria-roledescription="轮播图" aria-label="${title}">
        <div class="coffee-carousel-window"><div class="coffee-carousel-track">${slides.map((slide,index) => `<figure class="coffee-slide" aria-hidden="${index !== 0}"><a href="${slide.src}" target="_blank" rel="noopener" aria-label="查看${escape(slide.caption)}大图" tabindex="${index === 0 ? 0 : -1}"><img src="${slide.preview || slide.src}" data-thumb-src="${slide.thumb || slide.src}" data-label="${escape(slide.caption)}" alt="${escape(slide.alt)}" width="${slide.width}" height="${slide.height}" loading="${index === 0 && slug === 'heritage-design' ? 'eager' : 'lazy'}" decoding="async"></a></figure>`).join('')}</div></div>
        <button class="coffee-carousel-arrow coffee-carousel-prev" type="button" aria-label="上一张${title}">${arrow}</button><button class="coffee-carousel-arrow coffee-carousel-next" type="button" aria-label="下一张${title}">${arrow}</button>
      </div>
      <div class="coffee-carousel-meta" aria-live="polite"><span class="coffee-carousel-count">01 / ${String(slides.length).padStart(2,'0')}</span></div>
    </div></section>`;
  root.innerHTML = window.kalinaSiteHTML(`
    <div class="coffee-top-band"><div class="coffee-top-scenery" aria-hidden="true"><i class="coffee-bubble coffee-bubble-one"></i><i class="coffee-bubble coffee-bubble-two"></i></div><section class="project-top coffee-top">
      <div class="project-topline"><a href="/work/illustration/">← 返回插画设计</a><span>ILLUSTRATION</span></div>
      <div class="heritage-brand-signature">${brandLogo}</div>
      <h1>一味一传</h1><p class="project-subtitle">非遗美食插画 · A Taste of Heritage</p>
      <figure class="coffee-guide"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP，为非遗美食插画项目作介绍" width="232" height="232"><figcaption>跟我一起，看看八方风味。</figcaption></figure>
    </section></div>
    <section class="coffee-information" aria-labelledby="coffee-information-title"><div class="coffee-information-inner heritage-information-inner"><div class="coffee-information-heading"><span>ABOUT THE PROJECT / 01</span><div class="coffee-title-stack"><h2 id="coffee-information-title">项目资料</h2><small>Project Information</small></div></div>
      <div class="heritage-brand-credit" id="heritage-brand">
        ${brandLogo}
        <div><p class="heritage-series-title">一味一传 · 系列插画设计</p>
        <p class="heritage-brand-description">「案上志」以插画记录地方饮食技艺。标志将书页与案台合为一形，以朱砂印记为系列落款。</p></div>
      </div>
      <article class="coffee-information-row heritage-narrative" aria-labelledby="heritage-narrative-title">
        <h3 id="heritage-narrative-title">选题与叙事</h3>
        <p>八幅各选一道关键工序，让观者从手势、器具和食物的形态读懂做法。</p>
        <dl class="heritage-work-stories">
          <div><dt>南翔小笼</dt><dd>指尖捏拢薄皮，收口的细褶与一旁蒸笼里小笼的褶纹呼应。</dd></div>
          <div><dt>广式月饼</dt><dd>将饼坯按入木模，与盘里印好花纹的月饼对照，点明纹样的来处。</dd></div>
          <div><dt>兰州牛肉面</dt><dd>双手向两侧抻开，细面在深色围裙前垂成长弧，拉面的动势一目了然。</dd></div>
          <div><dt>嘉兴粽子</dt><dd>一手托住盛米的粽叶，一手拢起叶边，旁边竹盘里摆着已经扎好的粽子。</dd></div>
          <div><dt>北京烤鸭</dt><dd>以持刀片鸭的手为中心，身后是炉中挂着的烤鸭，案前是已经装盘的薄片。</dd></div>
          <div><dt>汕头牛肉丸</dt><dd>鲜肉、双槌下的肉糜和碗里的肉丸沿案台从左到右排列，把制作顺序变成观看顺序。</dd></div>
          <div><dt>新疆烤馕</dt><dd>馕戳在圆面坯上压出一圈圈点纹，旁边叠放的烤馕保留着同样的印记。</dd></div>
          <div><dt>沂蒙煎饼</dt><dd>木刮板在圆鏊上摊开面糊，饼面留着浅浅的旋纹，案边叠放着摊好的薄饼。</dd></div>
        </dl>
      </article>
      <article class="coffee-information-row" aria-labelledby="heritage-composition-title">
        <h3 id="heritage-composition-title">构图与地域</h3>
        <p>全组采用横幅平视构图，以工笔淡彩描绘人物与器具。近景突出双手如何处理食材，后景借南翔的水巷石桥、新疆院里的葡萄架交代各自的地域环境。</p>
      </article>
      <article class="coffee-information-row" aria-labelledby="heritage-palette-title">
        <h3 id="heritage-palette-title">系列配色</h3>
        <p>用木色与米白统一八幅画的基调，再让食材本色成为每幅的视觉重点。嘉兴粽叶的青绿、北京烤鸭的枣红，让两种风味在相近的案台与器物之间仍容易辨认。</p>
      </article>
    </div></section>
    ${gallery(designs,'heritage-design','系列插画','Illustration Series','八方风味，八段生活。点击当前作品，查看画面细节。')}
    ${processSection()}
    <div class="coffee-design-gallery"><div class="coffee-design-inner"><nav class="project-next" aria-label="项目导航"><a href="/work/illustration/">← 插画设计目录</a><a href="/projects/guanyi-blossoms/">下一项目：莞邑花开 ↗</a></nav></div></div>`);
  const style = document.createElement('style');
  style.id = 'heritage-process-style';
  style.textContent = `
    .heritage-brand-signature{margin:18px 0 0}
    .heritage-brand-signature img,.heritage-brand-credit img{display:block;width:100%;height:auto}
    .heritage-brand-signature img{width:108px}
    body.story-first .heritage-brand-signature+.story-title-row{margin-top:8px}
    .heritage-brand-credit{grid-column:1/-1;display:grid;grid-template-columns:clamp(138px,15vw,188px) minmax(0,1fr);align-items:center;gap:clamp(20px,3vw,42px);padding-block:8px;scroll-margin-top:104px}
    .heritage-brand-credit .heritage-series-title{margin:0;color:#365477;font-size:16px;font-weight:600}
    .heritage-brand-credit .heritage-brand-description{margin:5px 0 0;max-width:40em;font-size:14px;line-height:1.8;color:#526e90}
    @media(max-width:600px){
      .heritage-brand-signature{margin-top:13px}
      .heritage-brand-signature img{width:92px}
      .heritage-brand-credit{grid-template-columns:1fr;gap:12px}
      .heritage-brand-credit img{width:138px}
    }
    .heritage-information-inner .coffee-information-row h3{margin:0 0 12px;color:#365477;font-size:clamp(17px,1.5vw,20px);line-height:1.45}
    .coffee-exhibit .heritage-information-inner .coffee-information-row p{font-size:14px;line-height:1.85}
    .coffee-exhibit .heritage-information-inner .heritage-narrative{grid-column:1/-1;transform:none}
    .heritage-work-stories{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 26px;margin:18px 0 0}
    .heritage-work-stories dt{margin:0 0 3px;font-size:14px;font-weight:600;line-height:1.5;color:#365477}
    .heritage-work-stories dd{margin:0;color:#526e90;font-size:14px;line-height:1.75}
    @media(min-width:761px){.coffee-exhibit .heritage-information-inner{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(min-width:1101px){.heritage-work-stories{grid-template-columns:repeat(4,minmax(0,1fr))}}
    @media(max-width:600px){
      .heritage-work-stories{grid-template-columns:1fr;gap:12px}
      .heritage-work-stories>div{display:grid;grid-template-columns:5em minmax(0,1fr);align-items:baseline;gap:10px;font-size:14px}
    }
    @media(min-width:761px) and (max-width:1100px) and (orientation:portrait){
      .coffee-exhibit .heritage-information-inner{grid-template-columns:minmax(0,1fr)}
      .coffee-exhibit .heritage-information-inner .coffee-information-row{transform:none}
    }
    #heritage-process{--process-inset:48px;--process-art-limit:340px;padding-top:52px;padding-bottom:42px;scroll-margin-top:100px}
    #heritage-process .coffee-design-heading{margin:0 var(--process-inset) 26px}
    #heritage-process :is(.process-workline,.process-stages,.process-figure,.process-turn){width:min(70%,var(--process-art-limit));margin-inline:auto}
    #heritage-process .process-workline{display:flex;align-items:center;justify-content:space-between;gap:16px}
    #heritage-process .process-work-title{font-size:18px;line-height:1.5;font-weight:500;color:#365477;margin:0}
    #heritage-process .process-work-count{font-size:13px;line-height:1.5;letter-spacing:.12em;color:#617b9d;font-variant-numeric:tabular-nums}
    #heritage-process .process-stages{display:flex;gap:8px;margin-block:12px}
    #heritage-process button{font:inherit;color:inherit;cursor:pointer}
    #heritage-process .process-stages button,#heritage-process .process-turn button{min-height:44px;padding:9px 18px;border:1px solid #ffffffd9;border-radius:24px;background:linear-gradient(145deg,#ffffff66,#ffffff2b);color:#526e90;font-size:14px;line-height:1.5}
    #heritage-process .process-stages button{flex:1}
    #heritage-process .process-stages button[aria-pressed="true"]{background:linear-gradient(145deg,#ffffffe0,#ffffffa8);box-shadow:inset 0 1px 3px #fff,0 4px 14px #809abc17;color:#304e72}
    #heritage-process .process-figure{margin-block:0}
    #heritage-process .process-open{display:block;width:100%;padding:0;border:0;border-radius:0;background:transparent}
    #heritage-process .process-art{display:block;width:100%;height:auto;aspect-ratio:1672/941;object-fit:contain;box-shadow:0 12px 28px #45678015}
    #heritage-process .process-note{margin:0;padding:10px 0 0;color:#526e90;font-size:14px;line-height:1.8}
    #heritage-process .process-turn{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;margin-block:12px 20px}
    #heritage-process .process-turn button:disabled{opacity:.4;cursor:default}
    #heritage-process .process-position{text-align:center;color:#617b9d;font-size:13px;line-height:1.7}
    #heritage-process .process-thumbs{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px;width:min(calc(100% - 2 * var(--process-inset)),640px);margin-inline:auto}
    #heritage-process .process-thumb{min-width:0;min-height:44px;padding:3px;border:0;border-radius:0;background:transparent;display:flex;flex-direction:column;align-items:center;gap:8px}
    #heritage-process .process-thumb img{display:block;width:100%;height:auto;aspect-ratio:1672/941;object-fit:cover;opacity:.64}
    #heritage-process .process-thumb[aria-pressed="true"] img{opacity:1;box-shadow:0 0 0 2px #779bc4}
    #heritage-process .process-thumb span{font-size:12px;line-height:1.5;text-align:center;color:#617b9d}
    @media(min-width:1024px),(min-width:740px) and (min-height:560px) and (any-pointer:coarse){#heritage-process{--process-art-limit:500px}}
    @media(max-width:1023px){#heritage-process{--process-inset:20px}#heritage-process .process-thumbs{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}}
    @media(max-width:520px){#heritage-process{padding-top:36px;padding-bottom:30px}#heritage-process .process-stages{gap:6px}#heritage-process .process-stages button{font-size:13px;padding:9px 6px}#heritage-process .process-turn{gap:8px}#heritage-process .process-turn button{font-size:13px;padding:9px 12px}#heritage-process .process-position{font-size:12px}}
  `;
  document.head.append(style);
  const processRoot = document.getElementById('heritage-process');
  const art = processRoot.querySelector('.process-art');
  const openButton = processRoot.querySelector('.process-open');
  let workIndex = 0, stageIndex = 0, processReader;
  const url = value => window.kalinaSiteURL(value);
  function renderProcess() {
    const work = processWorks[workIndex], image = work.images[stageIndex];
    processRoot.querySelector('.process-work-title').textContent = work.name;
    processRoot.querySelector('.process-work-count').textContent = String(workIndex + 1).padStart(2, '0') + ' / 08';
    art.src = url(image.preview || image.src);
    art.alt = work.name + ' · ' + processLabels[stageIndex];
    processRoot.querySelector('.process-position').textContent = art.alt;
    processRoot.querySelector('.process-note').textContent = work.notes[stageIndex];
    openButton.setAttribute('aria-label', '细看' + art.alt);
    processRoot.querySelectorAll('[data-process-stage]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.processStage) === stageIndex)));
    processRoot.querySelectorAll('[data-process-work]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.processWork) === workIndex)));
    processRoot.querySelector('[data-process-step="-1"]').disabled = workIndex === 0;
    processRoot.querySelector('[data-process-step="1"]').disabled = workIndex === processWorks.length - 1;
  }
  processRoot.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !processRoot.contains(button)) return;
    if (button.dataset.processStage !== undefined) stageIndex = Number(button.dataset.processStage);
    else if (button.dataset.processWork !== undefined) workIndex = Number(button.dataset.processWork);
    else if (button.dataset.processStep !== undefined) workIndex = Math.max(0, Math.min(processWorks.length - 1, workIndex + Number(button.dataset.processStep)));
    else if (button === openButton) {
      if (!processReader) processReader = createProcessReader();
      processReader.open();
      return;
    } else return;
    renderProcess();
  });
  renderProcess();
  // The shared exhibit moves its artwork before the information block.
  // Place only this local process section after that completed artwork gallery.
  function placeProcess() {
    const finished = root.querySelector('#curated-gallery')?.closest('.coffee-design-gallery');
    if (!finished) return false;
    finished.after(processRoot);
    return true;
  }
  if (!placeProcess()) {
    const observer = new MutationObserver(() => { if (placeProcess()) observer.disconnect(); });
    observer.observe(root, {childList:true, subtree:true});
  }
  function createProcessReader() {
    const dialog = document.createElement('dialog');
    dialog.className = 'art-reader heritage-process-reader';
    dialog.dataset.zoomed = 'false';
    dialog.setAttribute('aria-labelledby', 'heritage-process-reader-title');
    dialog.innerHTML = `<header class="reader-header"><h2 class="reader-heading" id="heritage-process-reader-title">创作拆解<small>DRAWING PROCESS</small></h2><p class="reader-project"></p><div class="reader-actions"><button type="button" class="reader-button reader-zoom" aria-pressed="false">放大细节</button><button type="button" class="reader-button reader-close" aria-label="关闭细看，返回创作拆解" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div></header><div class="reader-stage"><button type="button" class="reader-arrow reader-prev" aria-label="上一阶段">${arrow}</button><div class="reader-image-viewport" tabindex="0" role="region" aria-label="过程图像，可放大查看"><figure class="reader-artboard"><img class="reader-image" decoding="async" draggable="false"></figure></div><button type="button" class="reader-arrow reader-next" aria-label="下一阶段">${arrow}</button></div><footer class="reader-footer"><div class="reader-footer-top"><span class="reader-pagination" aria-live="polite" aria-atomic="true"><span class="reader-page-star" aria-hidden="true">✦</span><span class="reader-page-current">01</span><span aria-hidden="true">/</span><span>03</span><span class="reader-progress" aria-hidden="true"></span></span><p class="reader-help">选择比例放大 · 拖动画面查看细节</p></div><div class="reader-thumbnails" role="group" aria-label="绘画阶段导航"></div></footer>`;
    document.body.append(dialog);
    const previous = dialog.querySelector('.reader-prev'), next = dialog.querySelector('.reader-next');
    const thumbs = dialog.querySelector('.reader-thumbnails');
    const zoom = window.KalinaImageZoom.attach(dialog, {onStep: delta => show(stageIndex + delta)});
    let overflow, padding, rootOverflow;
    const thumbButtons = processLabels.map((label, index) => {
      const button = document.createElement('button');
      button.type = 'button';button.className = 'reader-thumb';button.setAttribute('aria-label', label);
      const img = document.createElement('img');img.alt = '';img.decoding = 'async';
      button.append(img);thumbs.append(button);button.addEventListener('click', () => show(index));
      return button;
    });
    function show(index) {
      stageIndex = Math.max(0, Math.min(2, index));
      const work = processWorks[workIndex], image = work.images[stageIndex];
      dialog.dataset.activeIndex = String(stageIndex);
      dialog.querySelector('.reader-project').textContent = work.name + ' · ' + processLabels[stageIndex];
      zoom.showImage({src:url(image.preview || image.src), fullSrc:url(image.src), width:image.width, height:image.height, alt:work.name + ' · ' + processLabels[stageIndex]}, stageIndex);
      dialog.querySelector('.reader-page-current').textContent = String(stageIndex + 1).padStart(2, '0');
      dialog.querySelector('.reader-pagination').style.setProperty('--reader-progress', String((stageIndex + 1) / 3));
      previous.disabled = stageIndex === 0;next.disabled = stageIndex === 2;
      thumbButtons.forEach((button, index) => {button.setAttribute('aria-pressed', String(index === stageIndex));button.querySelector('img').src = url(work.images[index].thumb || work.images[index].src);});
    }
    previous.addEventListener('click', () => show(stageIndex - 1));
    next.addEventListener('click', () => show(stageIndex + 1));
    dialog.querySelector('.reader-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => { if (dialog.dataset.zoomed === 'true') return;if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();show(stageIndex + (event.key === 'ArrowRight' ? 1 : -1));} });
    dialog.addEventListener('close', () => {zoom.reset();document.body.style.overflow = overflow;document.body.style.paddingRight = padding;document.documentElement.style.overflow = rootOverflow;renderProcess();openButton.focus({preventScroll:true});});
    return {open() {
      overflow = document.body.style.overflow;padding = document.body.style.paddingRight;rootOverflow = document.documentElement.style.overflow;
      const gutter = innerWidth - document.documentElement.clientWidth;
      if (gutter > 0) document.body.style.paddingRight = gutter + 'px';
      document.body.style.overflow = 'hidden';document.documentElement.style.overflow = 'hidden';
      show(stageIndex);dialog.showModal();requestAnimationFrame(() => { if (dialog.open) zoom.reset(); });
    }};
  }
})();
