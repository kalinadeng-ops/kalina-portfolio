(() => {
  const original = document.querySelector('.coffee-carousel');
  if (!original) return;
  // Two landscape images, six portraits, then two landscapes: two orientation changes.
  const exhibitionOrder = [5,1,4,8,2,3,9,7,10,6];
  const sourceNumber = figure => Number(figure.querySelector('img').getAttribute('src').match(/\/(\d+)\.webp$/)?.[1]);
  const sourceFigures = [...original.querySelectorAll('.coffee-slide')].sort((a,b)=>exhibitionOrder.indexOf(sourceNumber(a))-exhibitionOrder.indexOf(sourceNumber(b)));
  const sources = sourceFigures.map((figure,index)=>{
    const img=figure.querySelector('img');
    const number=sourceNumber(figure),landscape=[1,5,6,10].includes(number);
    return {src:img.getAttribute('src'),alt:img.getAttribute('alt'),number,width:landscape?2000:1514,height:landscape?1321:2000};
  });
  if(!sources.length)return;
  document.body.classList.add('gallery-curated-page');
  const pad=n=>String(n+1).padStart(2,'0');
  const mark='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4M8 12h8m-4-4v8"/></svg>';
  const section=document.createElement('section');
  section.className='curated-gallery';
  section.id='curated-gallery';
  section.setAttribute('aria-label','VOYAGER 策展总览墙');
  section.innerHTML=window.kalinaSiteHTML('<svg class="curated-light" viewBox="0 0 1440 1300" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="curated-thread"><stop stop-color="#99c6ed"/><stop offset=".5" stop-color="#b7afe1"/><stop offset="1" stop-color="#e7abc8"/></linearGradient></defs><path class="curated-thread-base" d="M-100 280 C160 80 380 500 710 310 S1150 180 1540 440"/><path class="curated-flow" d="M-100 280 C160 80 380 500 710 310 S1150 180 1540 440"/><path class="curated-thread-base" d="M-80 1020 C240 1230 430 680 800 900 S1210 1110 1540 790"/><path class="curated-flow" d="M-80 1020 C240 1230 430 680 800 900 S1210 1110 1540 790"/></svg><div class="curated-intro"><div class="curated-guide"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP 为你导览作品" width="100" height="100"><p>走近一点，看看设计的细节。</p></div><div><p class="curated-count">10 件作品 <span>／ 策展总览</span></p></div></div><div class="curated-overview"></div>');
  const grid=section.querySelector('.curated-overview');
  const openers=[];
  sources.forEach((source,index)=>{
    const figure=document.createElement('figure');
    figure.className='curated-item';figure.dataset.number=String(index+1);figure.dataset.sourceNumber=String(source.number);
    const button=document.createElement('button');
    button.type='button';button.className='curated-open';
    button.setAttribute('aria-label',`细看第 ${index+1} 张作品`);
    button.setAttribute('aria-haspopup','dialog');
    const img=document.createElement('img');
    Object.assign(img,{src:source.src,alt:source.alt,width:source.width,height:source.height,loading:index<3?'eager':'lazy',decoding:'async',draggable:false});
    const icon=document.createElement('span');icon.className='curated-open-mark';icon.setAttribute('aria-hidden','true');icon.innerHTML=mark;
    button.append(img,icon);
    const caption=document.createElement('figcaption');
    caption.innerHTML=`<span>${pad(index)}</span>`;
    figure.append(button,caption);grid.append(figure);openers.push(button);
    button.addEventListener('click',()=>openReader(index,button));
  });
  const overviewItems=[...grid.children];
  [[0,1,2],[3,4,5],[6,7,8,9]].forEach((indices,index)=>{
    const row=document.createElement('div');row.className=`curated-row curated-row-${index+1}`;
    indices.forEach(i=>row.append(overviewItems[i]));grid.append(row);
  });
  const meta=original.nextElementSibling;
  original.replaceWith(section);meta?.remove();
  const description=document.querySelector('.coffee-design-heading>p');
  if(description)description.textContent='先看完整系列，再走近每一个设计细节。';

  const reader=document.createElement('dialog');
  reader.className='art-reader';reader.setAttribute('aria-labelledby','reader-title');reader.dataset.zoomed='false';
  reader.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="reader-arrow-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c3def6"/><stop offset=".5" stop-color="#8fb3dc"/><stop offset="1" stop-color="#6889b4"/></linearGradient></defs></svg><header class="reader-header"><h2 class="reader-heading" id="reader-title">作品细看<small>DESIGN VIEW</small></h2><p class="reader-project">VOYAGER COFFEE ROASTERS</p><div class="reader-actions"><button type="button" class="reader-button reader-zoom" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4M7.5 10.5h6m-3-3v6"/></svg><span>放大细节</span></button><button type="button" class="reader-button reader-close" aria-label="关闭细看，返回总览" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div></header><div class="reader-stage"><button type="button" class="reader-arrow reader-prev" aria-label="上一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-image-viewport" tabindex="0" role="region" aria-label="作品图像，可放大查看"><figure class="reader-artboard"><img class="reader-image" decoding="async" draggable="false"></figure></div><button type="button" class="reader-arrow reader-next" aria-label="下一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-notice-slot" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span class="gallery-end-spark" aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><footer class="reader-footer"><div class="reader-footer-top"><span class="reader-pagination" aria-live="polite" aria-atomic="true"><span class="reader-page-star" aria-hidden="true">✦</span><span class="reader-page-current">01</span><span aria-hidden="true">/</span><span>'+pad(sources.length-1)+'</span><span class="reader-progress" aria-hidden="true"></span></span><p class="reader-help">左右切换作品 · 点击画面放大细节</p></div><div class="reader-thumbnails" role="group" aria-label="细看作品导航"></div></footer>';
  document.body.append(reader);
  const image=reader.querySelector('.reader-image');
  const imageViewport=reader.querySelector('.reader-image-viewport');
  const zoom=reader.querySelector('.reader-zoom');
  const close=reader.querySelector('.reader-close');
  const previous=reader.querySelector('.reader-prev');
  const next=reader.querySelector('.reader-next');
  const count=reader.querySelector('.reader-pagination');
  const current=reader.querySelector('.reader-page-current');
  const notice=reader.querySelector('.gallery-end-notice');
  const thumbs=reader.querySelector('.reader-thumbnails');
  let active=0,noticeTimer,opener,bodyOverflow='',bodyPadding='',rootOverflow='';
  const thumbButtons=[];
  sources.forEach((source,index)=>{
    const button=document.createElement('button');button.type='button';button.className='reader-thumb';button.setAttribute('aria-label',`切换到第 ${index+1} 张作品`);button.setAttribute('aria-pressed','false');
    const img=document.createElement('img');Object.assign(img,{src:source.src,alt:'',loading:'lazy',draggable:false});
    button.append(img);thumbs.append(button);thumbButtons.push(button);button.addEventListener('click',()=>show(index));
  });
  function resetZoom(){
    reader.dataset.zoomed='false';zoom.setAttribute('aria-pressed','false');zoom.querySelector('span').textContent='放大细节';imageViewport.scrollTop=0;imageViewport.scrollLeft=0;
  }
  function show(index){
    clearTimeout(noticeTimer);notice.hidden=true;
    if(index>=sources.length){notice.hidden=false;noticeTimer=setTimeout(()=>{notice.hidden=true;},1500);return;}
    active=Math.max(0,index);resetZoom();
    const source=sources[active];
    image.width=source.width;image.height=source.height;image.alt=source.alt;image.src=source.src;
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
  function toggleZoom(){
    if(reader.dataset.zoomed==='true'){resetZoom();return;}
    const width=Math.min(sources[active].width,Math.max(imageViewport.clientWidth,image.getBoundingClientRect().width*1.8));
    reader.style.setProperty('--reader-zoom-width',`${width}px`);reader.dataset.zoomed='true';zoom.setAttribute('aria-pressed','true');zoom.querySelector('span').textContent='适应屏幕';imageViewport.focus({preventScroll:true});
  }
  close.addEventListener('click',()=>reader.close());
  reader.addEventListener('close',()=>{
    clearTimeout(noticeTimer);notice.hidden=true;resetZoom();document.body.style.overflow=bodyOverflow;document.body.style.paddingRight=bodyPadding;document.documentElement.style.overflow=rootOverflow;opener?.focus({preventScroll:true});
  });
  zoom.addEventListener('click',toggleZoom);image.addEventListener('click',toggleZoom);
  previous.addEventListener('click',()=>show(active-1));next.addEventListener('click',()=>show(active+1));
  reader.addEventListener('keydown',event=>{
    if(reader.dataset.zoomed==='true')return;
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(active+(event.key==='ArrowRight'?1:-1));}
  });
  let touch;
  imageViewport.addEventListener('touchstart',event=>{touch=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{passive:true});
  imageViewport.addEventListener('touchend',event=>{
    if(!touch||reader.dataset.zoomed==='true')return;
    const dx=event.changedTouches[0].clientX-touch.x,dy=event.changedTouches[0].clientY-touch.y;touch=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){event.preventDefault();show(active+(dx<0?1:-1));}
  },{passive:false});
  const positionPreview=()=>document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const params=new URLSearchParams(location.search);
    if(location.hash==='#curated-gallery')section.scrollIntoView({block:'start',behavior:'instant'});
    if(params.get('detail')==='1'){const index=Math.max(0,Math.min(sources.length-1,Number(params.get('image')||1)-1));openReader(index,openers[index]);}
  })));
  if(document.readyState==='complete')positionPreview();else window.addEventListener('load',positionPreview,{once:true});
})();
