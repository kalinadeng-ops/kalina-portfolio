/* Responsive exhibition for the project detail pages. */
(() => {
const orders = {};
function createThumbnail(url) {
  const image = document.createElement('img');
  Object.assign(image, {alt: '', loading: 'lazy', decoding: 'async', draggable: false});
  image.src = url;
  return image;
}

function createReader(sources, title, id) {
  const pad = index => String(index + 1).padStart(2, '0');
  const reader=document.createElement('dialog');
  reader.className='art-reader';reader.setAttribute('aria-labelledby',`reader-title-${id}`);reader.dataset.zoomed='false';
  reader.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="reader-arrow-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c3def6"/><stop offset=".5" stop-color="#8fb3dc"/><stop offset="1" stop-color="#6889b4"/></linearGradient></defs></svg><header class="reader-header"><h2 class="reader-heading" id="reader-title-'+id+'">作品细看<small>DESIGN VIEW</small></h2><p class="reader-project"></p><div class="reader-actions"><button type="button" class="reader-button reader-zoom" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4M7.5 10.5h6m-3-3v6"/></svg><span>放大细节</span></button><button type="button" class="reader-button reader-close" aria-label="关闭细看，返回总览" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div></header><div class="reader-stage"><button type="button" class="reader-arrow reader-prev" aria-label="上一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-image-viewport" tabindex="0" role="region" aria-label="作品图像，可放大查看"><figure class="reader-artboard"><img class="reader-image" decoding="async" draggable="false"></figure></div><button type="button" class="reader-arrow reader-next" aria-label="下一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-notice-slot" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span class="gallery-end-spark" aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><footer class="reader-footer"><div class="reader-footer-top"><span class="reader-pagination" aria-live="polite" aria-atomic="true"><span class="reader-page-star" aria-hidden="true">✦</span><span class="reader-page-current">01</span><span aria-hidden="true">/</span><span>'+pad(sources.length-1)+'</span><span class="reader-progress" aria-hidden="true"></span></span><p class="reader-help">选择比例放大 · 拖动画面查看细节</p></div><div class="reader-thumbnails" role="group" aria-label="细看作品导航"></div></footer>';
  if (id > 1) reader.querySelector('svg').remove();
  reader.querySelector('.reader-project').textContent = title;
  document.body.append(reader);
  const image=reader.querySelector('.reader-image');
  const imageViewport=reader.querySelector('.reader-image-viewport');
  const close=reader.querySelector('.reader-close');
  const previous=reader.querySelector('.reader-prev');
  const next=reader.querySelector('.reader-next');
  const count=reader.querySelector('.reader-pagination');
  const current=reader.querySelector('.reader-page-current');
  const notice=reader.querySelector('.gallery-end-notice');
  const thumbs=reader.querySelector('.reader-thumbnails');
  let active=0,noticeTimer,opener,bodyOverflow='',bodyPadding='',rootOverflow='';
  const zoomController = window.KalinaImageZoom.attach(reader, { onStep: delta => show(active + delta) });
  const thumbButtons=[];
  sources.forEach((source,index)=>{
    const button=document.createElement('button');button.type='button';button.className='reader-thumb';button.setAttribute('aria-label',`切换到第 ${index+1} 张作品`);button.setAttribute('aria-pressed','false');
    const img=createThumbnail(source.thumbSrc || source.src);
    button.append(img);thumbs.append(button);thumbButtons.push(button);button.addEventListener('click',()=>show(index));
  });
  function resetZoom(){
    zoomController.reset();
  }
  function show(index){
    if(index>=sources.length){if(notice.hidden){notice.hidden=false;noticeTimer=setTimeout(()=>{notice.hidden=true;},1500);}return;}
    clearTimeout(noticeTimer);notice.hidden=true;
    active=Math.max(0,index);resetZoom();
    const source=sources[active];
    reader.dataset.activeIndex=String(active);
    image.width=source.width;image.height=source.height;image.alt=source.alt;image.src=source.fullSrc || source.src;
    current.textContent=pad(active);count.setAttribute('aria-label',`第 ${active+1} 张，共 ${sources.length} 张`);count.style.setProperty('--reader-progress',String((active+1)/sources.length));
    previous.disabled=active===0;next.setAttribute('aria-disabled',String(active===sources.length-1));
    thumbButtons.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===active)));
    const selected=thumbButtons[active];thumbs.scrollTo({left:Math.max(0,selected.offsetLeft-thumbs.offsetLeft-thumbs.clientWidth/2+selected.offsetWidth/2),behavior:'instant'});
    [active-1,active+1].filter(index=>index>=0&&index<sources.length).forEach(index=>{const prefetch=new Image();prefetch.src=sources[index].src;});
    if(previous.disabled&&document.activeElement===previous)imageViewport.focus({preventScroll:true});
  }
  function openReader(index,button){
    opener=button;bodyOverflow=document.body.style.overflow;bodyPadding=document.body.style.paddingRight;rootOverflow=document.documentElement.style.overflow;
    const gutter=innerWidth-document.documentElement.clientWidth;
    if(gutter>0)document.body.style.paddingRight=`${gutter}px`;
    document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';
    show(index);reader.showModal();
    requestAnimationFrame(()=>show(index));
  }
  close.addEventListener('click',()=>reader.close());
  reader.addEventListener('close',()=>{
    clearTimeout(noticeTimer);notice.hidden=true;resetZoom();document.body.style.overflow=bodyOverflow;document.body.style.paddingRight=bodyPadding;document.documentElement.style.overflow=rootOverflow;opener?.focus({preventScroll:true});
  });
  previous.addEventListener('click',()=>show(active-1));next.addEventListener('click',()=>show(active+1));
  reader.addEventListener('keydown',event=>{
    if(reader.dataset.zoomed==='true')return;
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(active+(event.key==='ArrowRight'?1:-1));}
  });

  return {reader, openReader};
}
function createDepth(section, images, reader, openReader, id) {
 const desktop=matchMedia('(min-width:1024px)');
 const pad=n=>String(n+1).padStart(2,'0');
 const items=images;
 const labels=images.map((image,index)=>image.dataset.label || `展品 ${pad(index)}`);
 let returnTo;
 const inspect=(index,trigger)=>{returnTo=trigger;openReader(index,trigger);};
 reader.addEventListener('close',()=>{
  if(!returnTo)return;
  depthSelect(Number(reader.dataset.activeIndex));
  if(desktop.matches)cards[depthActive].focus({preventScroll:true});
  returnTo=null;
 });
 const depthPanel=document.createElement('section');depthPanel.className='study-depth';depthPanel.setAttribute('aria-label','景深展台');
 depthPanel.innerHTML='<div class="depth-stage"><div class="depth-notice" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><div class="depth-controls"><button type="button" class="reader-arrow reader-prev depth-prev" aria-label="上一个景深展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><span class="depth-count" aria-live="polite" aria-atomic="true"><strong>01</strong><span aria-hidden="true">/</span><span>'+pad(items.length-1)+'</span></span><button type="button" class="reader-arrow depth-next" aria-label="下一个景深展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button></div><p class="depth-hint">点击两侧切换展品 · 点击当前作品查看细节</p><div class="depth-thumbs" role="group" aria-label="景深展台作品导航"></div>';
 const depthStage=depthPanel.querySelector('.depth-stage');
 depthStage.id=id===1?'depth-stage':`depth-stage-${id}`;
 depthStage.setAttribute('role','group');depthStage.setAttribute('aria-label','作品景深展台，支持左右方向键切换');
 const depthPrevious=depthPanel.querySelector('.depth-prev');
 const depthNext=depthPanel.querySelector('.depth-next');
 const depthCount=depthPanel.querySelector('.depth-count');
 const depthNotice=depthPanel.querySelector('.gallery-end-notice');
 const depthThumbRail=depthPanel.querySelector('.depth-thumbs');
 const cards=[],depthThumbs=[];
 let depthActive=0;
 let depthNoticeTimer,depthLayerTimer;
 const imageRatio=image=>(image.naturalWidth||Number(image.getAttribute('width')))/(image.naturalHeight||Number(image.getAttribute('height')));
 images.forEach((img,index)=>{
  const card=document.createElement('button');card.type='button';card.className='depth-card';card.dataset.depthIndex=String(index);
  card.style.setProperty('--depth-ratio',String(imageRatio(img)));
  const artwork=img.cloneNode(false);artwork.removeAttribute('src');artwork.draggable=false;card.append(artwork);
  artwork.addEventListener('load',()=>card.style.setProperty('--depth-ratio',String(imageRatio(artwork))),{once:true});
  card.addEventListener('click',()=>{if(index===depthActive)inspect(index,card);else if(Math.abs(index-depthActive)===1)depthSelect(index);});
  depthStage.append(card);cards.push(card);
  const thumb=document.createElement('button');thumb.type='button';thumb.className='depth-thumb';thumb.setAttribute('aria-label',`选择第 ${index+1} 件景深展品：${labels[index]}`);thumb.setAttribute('title',labels[index]);thumb.setAttribute('aria-pressed','false');
  const tiny=createThumbnail(img.dataset.thumbSrc || img.src);
  const number=document.createElement('span');number.textContent=pad(index);thumb.append(tiny,number);
  thumb.addEventListener('click',()=>depthSelect(index));depthThumbRail.append(thumb);depthThumbs.push(thumb);
 });
 function depthSelect(index){
  if(index>=images.length){if(depthNotice.hidden){depthNotice.hidden=false;depthNoticeTimer=setTimeout(()=>{depthNotice.hidden=true;},1500);}return;}
  clearTimeout(depthNoticeTimer);depthNotice.hidden=true;
  const oldActive=depthActive;
  const moveCardFocus=cards.some(card=>card===document.activeElement);
  clearTimeout(depthLayerTimer);
  depthActive=Math.max(0,index);
  if (images[depthActive].dataset.label) depthPanel.querySelector('.depth-hint').textContent = images[depthActive].dataset.label + ' · 点击照片细看';
  depthStage.style.setProperty('--depth-current-ratio',String(imageRatio(images[depthActive])));
  cards.forEach((card,i)=>{
   const offset=i-depthActive;
   card.className='depth-card'+(offset===0?' depth-current':offset===-1?' depth-back depth-back-left':offset===1?' depth-back depth-back-right':offset<0?' depth-away-left':' depth-away-right');
   card.setAttribute('aria-hidden',String(Math.abs(offset)>1));card.tabIndex=Math.abs(offset)<=1?0:-1;
   card.setAttribute('aria-label',offset===0?`细看第 ${i+1} 件景深展品`:`切换到第 ${i+1} 件景深展品`);
   if(offset===0)card.setAttribute('aria-haspopup','dialog');else card.removeAttribute('aria-haspopup');
   if(desktop.matches && Math.abs(offset)<=1){const art=card.querySelector('img');art.loading='eager';if(!art.hasAttribute('src'))art.src=images[i].getAttribute('src');}
   depthThumbs[i].setAttribute('aria-pressed',String(offset===0));
  });
  if(oldActive!==depthActive&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
   const departing=cards[oldActive];departing.classList.add('depth-departing');
   depthLayerTimer=setTimeout(()=>departing.classList.remove('depth-departing'),240);
  }
  depthCount.querySelector('strong').textContent=pad(depthActive);depthCount.setAttribute('aria-label',`第 ${depthActive+1} 张，共 ${images.length} 张`);
  depthCount.style.setProperty('--depth-progress',String((depthActive+1)/images.length));
  depthPrevious.disabled=depthActive===0;depthNext.setAttribute('aria-disabled',String(depthActive===images.length-1));
  if(moveCardFocus||(depthPrevious.disabled&&document.activeElement===depthPrevious))cards[depthActive].focus({preventScroll:true});
  centerDepthThumb();
 }
 function centerDepthThumb(smooth=false){
  if(!depthThumbRail.clientWidth)return;
  const item=depthThumbs[depthActive];
  const offset=item.getBoundingClientRect().left-depthThumbRail.getBoundingClientRect().left+depthThumbRail.scrollLeft;
  depthThumbRail.scrollTo({left:offset-(depthThumbRail.clientWidth-item.offsetWidth)/2,behavior:smooth&&!matchMedia('(prefers-reduced-motion:reduce)').matches?'smooth':'instant'});
 }
 depthPrevious.addEventListener('click',()=>depthSelect(depthActive-1));depthNext.addEventListener('click',()=>depthSelect(depthActive+1));
 depthPanel.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();depthSelect(depthActive+(event.key==='ArrowRight'?1:-1));}
  else if(event.key==='Home'||event.key==='End'){event.preventDefault();depthSelect(event.key==='Home'?0:images.length-1);}
 });
 section.append(depthPanel);
 depthSelect(0);
 desktop.addEventListener('change',()=>{if(desktop.matches)depthSelect(depthActive);});
}
function createPhotoSheet(gallery, images, openReader) {
  const sheet = document.createElement('div');
  sheet.className = 'site-photo-sheet';
  const buttons = images.map((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'site-photo-open';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', '查看现场照片：' + image.dataset.label);
    const caption = document.createElement('span');
    caption.className = 'site-photo-legend';
    caption.textContent = image.dataset.label;
    button.append(image.cloneNode(true), caption);
    button.addEventListener('click', () => openReader(index, button));
    sheet.append(button);
    return button;
  });
  gallery.append(sheet);
  return buttons;
}

function createAlbum(gallery, sources, reader, openReader, id, compact, sheetButtons) {
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const pad = index => String(index + 1).padStart(2, '0');
  let active = 0;
  let noticeTimer, readerOpened = false, suppressClickUntil = 0, gesture;

  const album = document.createElement('section');
  album.className = 'mobile-album';
  album.id = id===1?'mobile-album-gallery':`mobile-album-gallery-${id}`;
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
  if (id > 1) {
    light.querySelectorAll('[id]').forEach(gradient => { gradient.id += `-${id}`; });
    light.querySelectorAll('path').forEach(path => {
      path.style.stroke = `url(#album-stage-thread${path.classList.contains('album-thread-two') ? '-two' : ''}-${id})`;
    });
  }
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
    image.removeAttribute('src');
    image.draggable = false;
    image.loading = Math.abs(index - active) <= 1 ? 'eager' : 'lazy';
    button.append(image);
    button.addEventListener('click', () => {
      if (index !== active) return;
      readerOpened = true;
      openReader(index, button);
    });
    area.append(button);
    artButtons.push(button);

    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'album-thumb';
    thumb.setAttribute('aria-label', `选择第 ${index + 1} 件展册作品`);
    const tiny = createThumbnail(source.dataset.thumbSrc || source.src);
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
    if (index >= sources.length) {
      if (notice.hidden) {
        notice.hidden = false;
        noticeTimer = setTimeout(() => { notice.hidden = true; }, 1500);
      }
      return;
    }
    clearTimeout(noticeTimer);
    notice.hidden = true;
    const focusArt = artButtons.includes(document.activeElement);
    active = Math.max(0, index);
    if (sources[active].dataset.label) album.querySelector('.album-hint').textContent = sources[active].dataset.label + ' · 左右滑动翻页';
    artButtons.forEach((button, i) => {
      const current = i === active;
      button.classList.toggle('is-current', current);
      button.setAttribute('aria-hidden', String(!current));
      button.tabIndex = current ? 0 : -1;
      thumbButtons[i].setAttribute('aria-pressed', String(current));
      if (compact.matches && Math.abs(i - active) <= 1) {
        const art = button.querySelector('img');
        art.loading = 'eager';
        if (!art.hasAttribute('src')) art.src = sources[i].getAttribute('src');
      }
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
    if (!readerOpened && !sheetButtons) return;
    readerOpened = false;
    select(Number(reader.dataset.activeIndex), false);
    const returnTarget = compact.matches ? artButtons[active] : sheetButtons?.[active];
    returnTarget?.focus({ preventScroll: true });
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
  stage.addEventListener('lostpointercapture', event => {
    // A child image releases its implicit capture when the stage takes over.
    if (event.target === stage && gesture) finishGesture();
  });
  stage.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);

  select(0, false);
  compact.addEventListener('change', () => { finishGesture(); if (compact.matches) select(active, false); });
}

const root = document.getElementById('project-root');
const configuration = orders[document.body.dataset.project] || [];
const original = [...(root?.querySelectorAll('.coffee-carousel') || [])];
const title = root?.querySelector('.coffee-top h1');
const information = root?.querySelector('.coffee-information');
const ordered = original.filter(carousel => !carousel.hasAttribute('data-source-order'));
if (!original.length || ordered.length !== configuration.length || !title || !information) return;

// Validate every source before replacing the fallback carousels.
const galleries = original.map(carousel => {
  const figures = [...carousel.querySelectorAll('.coffee-slide img')];
  if (carousel.hasAttribute('data-source-order')) {
    if (!figures.length || !figures.every(img => img.getAttribute('src') && Number(img.getAttribute('width')) > 0 && Number(img.getAttribute('height')) > 0)) return null;
    return figures.map(img => ({
      src: img.src, fullSrc: img.closest('a')?.href, thumbSrc: img.dataset.thumbSrc, alt: img.alt, label: img.dataset.label,
      width: Number(img.getAttribute('width')), height: Number(img.getAttribute('height'))
    }));
  }
  const index = ordered.indexOf(carousel);
  const inputs = configuration[index];
  if (figures.length !== inputs.length || !inputs.every(([i, src]) => figures[i-1]?.src === window.kalinaSiteURL(src))) return null;
  return inputs.map(([i, src, width, height]) => ({src: window.kalinaSiteURL(src), width, height, alt: i===1 && index===0 ? figures[0].alt : `${title.textContent} · ${carousel.closest('section').querySelector('h2').textContent} ${i}`}));
});
if (galleries.some(gallery => !gallery)) return;

document.body.classList.add('gallery-curated-page','story-first','project-exhibition');
document.body.dataset.desktopLayout='depth';
document.body.dataset.studyFocus='true';
const compact=matchMedia('(max-width:1023px)');
function applyPresentation() {
  document.body.dataset.mobileExhibit=compact.matches?'album':'';
  root.querySelectorAll('.curated-count').forEach(count => {
    const fieldLayout = count.closest('[data-field-layout]')?.dataset.fieldLayout;
    const isAlbum = fieldLayout ? fieldLayout === 'album' : compact.matches;
    count.querySelector('span').textContent = isAlbum ? '／ 掌上展册' : fieldLayout ? '／ 现场总览' : '／ 策展总览';
  });
}
const headingRow = document.createElement('div');
headingRow.className = 'story-title-row';
const jump = document.createElement('a');
jump.className = 'story-information-jump';
jump.href = '#project-information';
jump.textContent = '项目资料 ↓';
title.before(headingRow);
headingRow.append(title,jump);
information.id = 'project-information';
information.tabIndex = -1;
const eyebrow = information.querySelector('.coffee-information-heading > span');
if (eyebrow) eyebrow.textContent = 'ABOUT THE PROJECT / 02';
const projectNav = root.querySelector('.project-next');
const navBand = projectNav?.closest('div.coffee-design-gallery');
if (projectNav) root.append(projectNav);
if (navBand && !navBand.querySelector('.coffee-carousel')) navBand.remove();

original.forEach((carousel, index) => {
  const id = index + 1;
  const gallerySection=carousel.closest('.coffee-design-gallery');
  const heading=gallerySection.querySelector('h2').textContent;
  const sources=galleries[index];
  const count=sources.length;
  root.insertBefore(gallerySection, information);
  const section=document.createElement('section');
  section.className='curated-gallery';
  section.id=id===1?'curated-gallery':`curated-gallery-${id}`;
  section.setAttribute('aria-label',heading);
  section.innerHTML=window.kalinaSiteHTML(`<svg class="curated-light" viewBox="0 0 1440 1300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="curated-thread"><stop stop-color="#99c6ed"/><stop offset=".5" stop-color="#b7afe1"/><stop offset="1" stop-color="#e7abc8"/></linearGradient></defs><path class="curated-thread-base" d="M-100 280 C160 80 380 500 710 310 S1150 180 1540 440"/><path class="curated-flow" d="M-100 280 C160 80 380 500 710 310 S1150 180 1540 440"/><path class="curated-thread-base" d="M-80 1020 C240 1230 430 680 800 900 S1210 1110 1540 790"/><path class="curated-flow" d="M-80 1020 C240 1230 430 680 800 900 S1210 1110 1540 790"/></svg><div class="curated-intro"><div class="curated-guide"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP 为你导览作品" width="100" height="100"><p>走近一点，看看设计的细节。</p></div><div><p class="curated-count">${count} 件作品 <span>／ 策展总览</span></p></div></div>`);

  if(id>1){
    section.querySelector('.curated-light [id]').id+=`-${id}`;
    section.querySelectorAll('.curated-light path').forEach(path=>{path.style.stroke=`url(#curated-thread-${id})`;});
    section.querySelector('.curated-guide img').alt='';
  }
  if (carousel.dataset.countUnit) section.querySelector('.curated-count').firstChild.data = count + ' ' + carousel.dataset.countUnit + ' ';
  const images=sources.map(({src,alt,width,height,label,thumbSrc}) => {
    const image=document.createElement('img');
    Object.assign(image,{alt,width,height,loading:'lazy',decoding:'async',draggable:false});
    image.src=src;
    if (label) image.dataset.label = label;
    if (thumbSrc) image.dataset.thumbSrc = thumbSrc;
    return image;
  });
  const {reader,openReader}=createReader(sources,title.textContent,id);
  const meta=carousel.nextElementSibling;
  carousel.replaceWith(section);
  if(meta?.classList.contains('coffee-carousel-meta'))meta.remove();
  if (gallerySection.hasAttribute('data-photo-sheet')) {
    const albumView = matchMedia('(max-width: 739px), (orientation: portrait) and (any-pointer: coarse), (max-width: 1023px) and (max-height: 540px) and (any-pointer: coarse)');
    function updateFieldLayout() {
      gallerySection.dataset.fieldLayout = albumView.matches ? 'album' : 'sheet';
      applyPresentation();
    }
    updateFieldLayout();
    albumView.addEventListener('change', updateFieldLayout);
    const sheetButtons = createPhotoSheet(section, images, openReader);
    createAlbum(section, images, reader, openReader, id, albumView, sheetButtons);
  } else {
    createDepth(section,images,reader,openReader,id);
    createAlbum(section,images,reader,openReader,id,compact);
  }
});
compact.addEventListener('change',applyPresentation);
applyPresentation();
const position = () => {
  if (location.hash === '#project-information') information.scrollIntoView({block:'start',behavior:'instant'});
};
if (document.readyState === 'complete') position(); else addEventListener('load',position,{once:true});
})();
