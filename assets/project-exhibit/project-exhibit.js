/* Responsive exhibition for the project detail pages. */
(() => {
const orders = {"hanging-coffee":[[[2,"/assets/projects/coffee-graphics-white.jpg",10417,6695],[1,"/assets/projects/coffee-cover.lossless.webp",2000,1321],[3,"/assets/projects/all/coffee-002.webp",2000,1321],[5,"/assets/projects/all/coffee-004.webp",2000,1321],[6,"/assets/projects/all/coffee-005.webp",2000,1321],[7,"/assets/projects/all/coffee-006.webp",3000,1928],[8,"/assets/projects/coffee-detail.lossless.webp",3000,1928],[11,"/assets/projects/all/coffee-010.webp",2000,1321],[10,"/assets/projects/all/coffee-009.webp",3000,1928],[9,"/assets/projects/all/coffee-008.webp",3000,1928],[4,"/assets/projects/coffee-scene.lossless.webp",3000,1928]]],"craft-beer":[[[1,"/assets/projects/juxi/001.lossless.webp",1588,991],[2,"/assets/projects/juxi/002.lossless.webp",3200,3200],[6,"/assets/projects/all/craft-face-008.webp",3000,4000],[5,"/assets/projects/all/craft-face-006.webp",3000,4000],[7,"/assets/projects/all/craft-face-010.webp",3000,4000],[4,"/assets/projects/all/craft-face-004.webp",3000,4000],[3,"/assets/projects/all/craft-face-002.webp",3000,4000],[13,"/assets/projects/all/craft-main-007.webp",3000,4000],[34,"/assets/projects/all/craft-main-030.webp",3000,4000],[24,"/assets/projects/all/craft-main-019.webp",3000,4000],[29,"/assets/projects/all/craft-main-024.webp",3000,4000],[14,"/assets/projects/all/craft-main-008.webp",3000,4000],[15,"/assets/projects/all/craft-main-009.webp",3000,4000],[35,"/assets/projects/all/craft-main-031.webp",3000,4000],[8,"/assets/projects/all/craft-main-001.webp",3000,4000],[16,"/assets/projects/all/craft-main-010.webp",3000,4000],[37,"/assets/projects/all/craft-main-035.webp",3000,4000],[9,"/assets/projects/all/craft-main-003.webp",3000,4000],[20,"/assets/projects/all/craft-main-016.webp",3000,4000],[31,"/assets/projects/all/craft-main-026.webp",3000,4000],[28,"/assets/projects/all/craft-main-023.webp",3000,4000],[17,"/assets/projects/all/craft-new-005.webp",3000,4000],[22,"/assets/projects/craft-blue-box.lossless.webp",3000,4000],[12,"/assets/projects/all/craft-new-002.webp",3000,4000],[32,"/assets/projects/craft-yellow-box.lossless.webp",3000,4000],[10,"/assets/projects/all/craft-new-001.webp",3000,4000],[19,"/assets/projects/all/craft-main-012.webp",3000,4000],[27,"/assets/projects/all/craft-main-022.webp",3000,4000],[38,"/assets/projects/all/craft-main-036.webp",3000,4000],[25,"/assets/projects/craft-boxes.lossless.webp",3000,4000],[26,"/assets/projects/all/craft-main-021.webp",3000,4000],[30,"/assets/projects/all/craft-main-025.webp",3000,4000],[23,"/assets/projects/all/craft-main-018.webp",3000,4000],[33,"/assets/projects/all/craft-main-029.webp",3000,4000],[40,"/assets/projects/all/craft-main-039.webp",3000,4000],[18,"/assets/projects/all/craft-main-011.webp",3200,3200],[39,"/assets/projects/all/craft-main-038.webp",3200,3200],[36,"/assets/projects/all/craft-main-034.webp",3200,3200],[11,"/assets/projects/all/craft-main-005.webp",3200,3200],[21,"/assets/projects/all/craft-main-017.webp",3200,3200]]],"lumirose-atoll":[[[1,"/assets/projects/lumirose-atoll/001.jpg",2000,2642],[7,"/assets/projects/lumirose-atoll/007.jpg",2000,2642],[2,"/assets/projects/lumirose-atoll/002.jpg",2000,2642],[3,"/assets/projects/lumirose-atoll/003.jpg",2000,2642],[4,"/assets/projects/lumirose-atoll/004.jpg",2000,2642],[5,"/assets/projects/lumirose-atoll/005.jpg",2000,2642],[6,"/assets/projects/lumirose-atoll/006.jpg",2000,2642],[8,"/assets/projects/lumirose-atoll/008.jpg",2000,2642],[9,"/assets/projects/lumirose-atoll/009.webp",1400,1781]]],"prismora":[[[1,"/assets/projects/prismora-cover.webp",2000,1321],[16,"/assets/projects/all/prismora-016.webp",2000,1321],[14,"/assets/projects/all/prismora-013.webp",2000,1321],[2,"/assets/projects/prismora-system.webp",2600,1463],[6,"/assets/projects/prismora-range.webp",2600,1463],[4,"/assets/projects/all/prismora-003.webp",4000,2250],[8,"/assets/projects/all/prismora-007.webp",4000,2250],[13,"/assets/projects/prismora-packaging.webp",2000,1321],[10,"/assets/projects/all/prismora-009.webp",2000,1321],[11,"/assets/projects/all/prismora-010.webp",2000,1321],[7,"/assets/projects/all/prismora-006.webp",2000,1321],[5,"/assets/projects/all/prismora-004.webp",2000,1321],[12,"/assets/projects/all/prismora-011.webp",2000,2642],[3,"/assets/projects/all/prismora-002.webp",2000,2642],[9,"/assets/projects/all/prismora-008.webp",2000,2642],[15,"/assets/projects/all/prismora-015.webp",2000,2642],[17,"/assets/projects/all/prismora-017.webp",2000,2642]]],"luminaere":[[[5,"/assets/projects/luminaere/005.jpg",2000,1321],[1,"/assets/projects/luminaere/001.lossless.webp",6667,3750],[2,"/assets/projects/luminaere/002.lossless.webp",1672,941],[7,"/assets/projects/luminaere/007.jpg",2000,1321],[3,"/assets/projects/luminaere/003.jpg",2000,1321],[4,"/assets/projects/luminaere/004.jpg",2000,1321],[6,"/assets/projects/luminaere/006.jpg",2000,1321],[11,"/assets/projects/luminaere/011.jpg",2000,1321],[9,"/assets/projects/luminaere/009.jpg",2000,2642],[8,"/assets/projects/luminaere/008.jpg",2000,2642],[10,"/assets/projects/luminaere/010.jpg",2000,2642],[12,"/assets/projects/luminaere/012.webp",4000,2250],[13,"/assets/projects/luminaere/013.webp",4000,2250]]],"miaoxing-tea":[[[1,"/assets/projects/miaoxing-tea/001.webp",3840,2560],[2,"/assets/projects/miaoxing-tea/002.webp",3840,2560],[4,"/assets/projects/miaoxing-tea/004.webp",3840,2560],[8,"/assets/projects/miaoxing-tea/008.webp",3840,2560],[9,"/assets/projects/miaoxing-tea/009.webp",3840,2560],[10,"/assets/projects/miaoxing-tea/010.webp",3840,2560],[5,"/assets/projects/miaoxing-tea/005.webp",3840,2560],[11,"/assets/projects/miaoxing-tea/011.webp",3840,2560],[12,"/assets/projects/miaoxing-tea/012.webp",3840,2560],[13,"/assets/projects/miaoxing-tea/013.webp",3840,2560],[14,"/assets/projects/miaoxing-tea/014.webp",3840,2560],[15,"/assets/projects/miaoxing-tea/015.webp",3840,2560],[16,"/assets/projects/miaoxing-tea/016.webp",3840,2560],[6,"/assets/projects/miaoxing-tea/006.webp",3840,2560],[18,"/assets/projects/miaoxing-tea/018.webp",3840,2560],[7,"/assets/projects/miaoxing-tea/007.webp",3840,2560],[17,"/assets/projects/miaoxing-tea/017.webp",3840,2560],[3,"/assets/projects/miaoxing-tea/003.webp",3840,2560]]],"probiotic-lozenges":[[[6,"/assets/projects/probiotic-lozenges/006.webp",3840,2304],[1,"/assets/projects/probiotic-lozenges/001.webp",3840,2304],[2,"/assets/projects/probiotic-lozenges/002.webp",3840,2304],[8,"/assets/projects/probiotic-lozenges/008.webp",3840,2536],[11,"/assets/projects/probiotic-lozenges/011.webp",3840,2537],[3,"/assets/projects/probiotic-lozenges/003.webp",3840,2304],[9,"/assets/projects/probiotic-lozenges/009.webp",3840,2536],[5,"/assets/projects/probiotic-lozenges/005.webp",3840,2304],[7,"/assets/projects/probiotic-lozenges/007.webp",3840,2304],[12,"/assets/projects/probiotic-lozenges/012.webp",2304,3840],[4,"/assets/projects/probiotic-lozenges/004.webp",3200,3840],[13,"/assets/projects/probiotic-lozenges/013.webp",2906,3840],[10,"/assets/projects/probiotic-lozenges/010.webp",2906,3840]]],"tianjingsha":[[[1,"/assets/projects/tianjingsha/001.webp",4961,3508],[2,"/assets/projects/tianjingsha/002.webp",4961,3508],[4,"/assets/projects/tianjingsha/004.webp",4961,3508],[3,"/assets/projects/tianjingsha/003.webp",4961,3508],[6,"/assets/projects/tianjingsha/006.webp",4961,3508],[5,"/assets/projects/tianjingsha/005.webp",4961,3508],[8,"/assets/projects/tianjingsha/008.webp",4961,3508],[7,"/assets/projects/tianjingsha/007.webp",4961,3508],[10,"/assets/projects/tianjingsha/010.webp",4961,3508],[9,"/assets/projects/tianjingsha/009.webp",4961,3508],[11,"/assets/projects/tianjingsha/011.webp",4961,3508],[12,"/assets/projects/tianjingsha/012.webp",4961,3508],[13,"/assets/projects/tianjingsha/013.webp",4961,3508],[14,"/assets/projects/tianjingsha/014.webp",4961,3508],[15,"/assets/projects/tianjingsha/015.webp",4961,3508]]],"guanyi-blossoms":[[[1,"/assets/projects/guanyi-blossoms/001.webp",3000,1688],[4,"/assets/projects/guanyi-blossoms/004.webp",3000,1688],[6,"/assets/projects/guanyi-blossoms/006.webp",3000,1688],[5,"/assets/projects/guanyi-blossoms/005.webp",3000,1688],[2,"/assets/projects/guanyi-blossoms/002.webp",3000,1688],[3,"/assets/projects/guanyi-blossoms/003.webp",3000,1688],[7,"/assets/projects/guanyi-blossoms/007.webp",3000,1688],[12,"/assets/projects/guanyi-blossoms/012.webp",3000,1688],[8,"/assets/projects/guanyi-blossoms/008.webp",3000,1688],[13,"/assets/projects/guanyi-blossoms/013.webp",3000,1688],[14,"/assets/projects/guanyi-blossoms/014.webp",3000,1688],[15,"/assets/projects/guanyi-blossoms/015.webp",3000,1688],[16,"/assets/projects/guanyi-blossoms/016.webp",3000,1688],[17,"/assets/projects/guanyi-blossoms/017.webp",3000,1688],[9,"/assets/projects/guanyi-blossoms/009.webp",3000,1688],[10,"/assets/projects/guanyi-blossoms/010.webp",3000,1688],[11,"/assets/projects/guanyi-blossoms/011.webp",3000,1688],[18,"/assets/projects/guanyi-blossoms/018.webp",3000,1688],[19,"/assets/projects/guanyi-blossoms/019.webp",3000,1688],[20,"/assets/projects/guanyi-blossoms/020.webp",3000,1688],[21,"/assets/projects/guanyi-blossoms/021.webp",3000,1688],[22,"/assets/projects/guanyi-blossoms/022.webp",3000,1688],[23,"/assets/projects/guanyi-blossoms/023.webp",3000,1688],[24,"/assets/projects/guanyi-blossoms/024.webp",3000,1688],[25,"/assets/projects/guanyi-blossoms/025.webp",3000,1688],[26,"/assets/projects/guanyi-blossoms/026.webp",3000,1688],[27,"/assets/projects/guanyi-blossoms/027.webp",3000,1688],[28,"/assets/projects/guanyi-blossoms/028.webp",3000,1688],[29,"/assets/projects/guanyi-blossoms/029.webp",3000,1688],[30,"/assets/projects/guanyi-blossoms/030.webp",3000,1688],[31,"/assets/projects/guanyi-blossoms/031.webp",3000,1688],[32,"/assets/projects/guanyi-blossoms/032.webp",3000,1688],[33,"/assets/projects/guanyi-blossoms/033.webp",3000,1688],[34,"/assets/projects/guanyi-blossoms/034.webp",3000,1688],[35,"/assets/projects/guanyi-blossoms/035.webp",3000,1688],[36,"/assets/projects/guanyi-blossoms/036.webp",3000,1688],[37,"/assets/projects/guanyi-blossoms/037.webp",3000,1688]]],"wanjiang-bookmarks":[[[1,"/assets/projects/wanjiang-bookmarks/001.webp",2600,1463],[2,"/assets/projects/wanjiang-bookmarks/003.webp",2600,1463],[3,"/assets/projects/wanjiang-bookmarks/004.webp",2600,1463],[4,"/assets/projects/wanjiang-bookmarks/005.webp",2600,1463],[5,"/assets/projects/wanjiang-bookmarks/006.webp",2600,1463],[6,"/assets/projects/wanjiang-bookmarks/007.webp",2600,1463],[7,"/assets/projects/wanjiang-bookmarks/002.webp",2600,1463]],[[5,"/assets/projects/wanjiang-bookmarks/012.webp",2600,1954],[2,"/assets/projects/wanjiang-bookmarks/009.webp",2600,1954],[4,"/assets/projects/wanjiang-bookmarks/011.webp",2600,1977],[3,"/assets/projects/wanjiang-bookmarks/010.webp",2600,1954],[1,"/assets/projects/wanjiang-bookmarks/008.webp",2600,1954],[6,"/assets/projects/wanjiang-bookmarks/013.jpg",1280,959]]]};
function createReader(sources, title, id) {
  const pad = index => String(index + 1).padStart(2, '0');
  const reader=document.createElement('dialog');
  reader.className='art-reader';reader.setAttribute('aria-labelledby',`reader-title-${id}`);reader.dataset.zoomed='false';
  reader.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="reader-arrow-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c3def6"/><stop offset=".5" stop-color="#8fb3dc"/><stop offset="1" stop-color="#6889b4"/></linearGradient></defs></svg><header class="reader-header"><h2 class="reader-heading" id="reader-title-'+id+'">作品细看<small>DESIGN VIEW</small></h2><p class="reader-project"></p><div class="reader-actions"><button type="button" class="reader-button reader-zoom" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4M7.5 10.5h6m-3-3v6"/></svg><span>放大细节</span></button><button type="button" class="reader-button reader-close" aria-label="关闭细看，返回总览" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div></header><div class="reader-stage"><button type="button" class="reader-arrow reader-prev" aria-label="上一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-image-viewport" tabindex="0" role="region" aria-label="作品图像，可放大查看"><figure class="reader-artboard"><img class="reader-image" decoding="async" draggable="false"></figure></div><button type="button" class="reader-arrow reader-next" aria-label="下一张作品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><div class="reader-notice-slot" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span class="gallery-end-spark" aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><footer class="reader-footer"><div class="reader-footer-top"><span class="reader-pagination" aria-live="polite" aria-atomic="true"><span class="reader-page-star" aria-hidden="true">✦</span><span class="reader-page-current">01</span><span aria-hidden="true">/</span><span>'+pad(sources.length-1)+'</span><span class="reader-progress" aria-hidden="true"></span></span><p class="reader-help">左右切换作品 · 点击画面放大细节</p></div><div class="reader-thumbnails" role="group" aria-label="细看作品导航"></div></footer>';
  if (id > 1) reader.querySelector('svg').remove();
  reader.querySelector('.reader-project').textContent = title;
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
    if(index>=sources.length){if(notice.hidden){notice.hidden=false;noticeTimer=setTimeout(()=>{notice.hidden=true;},1500);}return;}
    clearTimeout(noticeTimer);notice.hidden=true;
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
  const viewed=reader.querySelector('.reader-image').getAttribute('src');
  const index=images.findIndex(image=>image.getAttribute('src')===viewed);
  if(index>=0)depthSelect(index);
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
  const tiny=img.cloneNode(true);tiny.alt='';tiny.loading='lazy';tiny.draggable=false;
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
function createAlbum(gallery, sources, reader, openReader, id) {
  const compact = matchMedia('(max-width:1023px)');
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
    const tiny = source.cloneNode(true);
    tiny.alt = '';
    tiny.draggable = false;
    tiny.loading = 'lazy';
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
    if (!readerOpened) return;
    readerOpened = false;
    const viewed = reader.querySelector('.reader-image')?.getAttribute('src');
    const index = sources.findIndex(source => source.getAttribute('src') === viewed);
    if (index >= 0) select(index, false);
    if (compact.matches) artButtons[active].focus({ preventScroll: true });
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
  stage.addEventListener('lostpointercapture', () => { if (gesture) finishGesture(); });
  stage.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);

  select(0, false);
  compact.addEventListener('change', () => { finishGesture(); if (compact.matches) select(active, false); });
}

const root = document.getElementById('project-root');
const configuration = orders[document.body.dataset.project];
const original = [...(root?.querySelectorAll('.coffee-carousel') || [])];
const title = root?.querySelector('.coffee-top h1');
const information = root?.querySelector('.coffee-information');
if (!configuration || original.length !== configuration.length || !title || !information) return;

// Validate every source before replacing the fallback carousels.
const galleries = original.map((carousel, index) => {
  const figures = [...carousel.querySelectorAll('.coffee-slide img')];
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
    count.querySelector('span').textContent=compact.matches?'／ 掌上展册':'／ 策展总览';
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
  const images=sources.map(({src,alt,width,height}) => {
    const image=document.createElement('img');
    Object.assign(image,{src,alt,width,height,loading:'lazy',decoding:'async',draggable:false});
    return image;
  });
  const {reader,openReader}=createReader(sources,title.textContent,id);
  const meta=carousel.nextElementSibling;
  carousel.replaceWith(section);
  if(meta?.classList.contains('coffee-carousel-meta'))meta.remove();
  createDepth(section,images,reader,openReader,id);
  createAlbum(section,images,reader,openReader,id);
});
compact.addEventListener('change',applyPresentation);
applyPresentation();
const position = () => {
  if (location.hash === '#project-information') information.scrollIntoView({block:'start',behavior:'instant'});
};
if (document.readyState === 'complete') position(); else addEventListener('load',position,{once:true});
})();
