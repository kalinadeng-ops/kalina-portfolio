(() => {
 const section=document.querySelector('.curated-gallery');
 const originalGrid=section?.querySelector('.curated-overview');
 const reader=document.querySelector('.art-reader');
 if(!section||!originalGrid||!reader)return;
 const items=[...originalGrid.querySelectorAll('.curated-item')];
 const buttons=items.map(item=>item.querySelector('.curated-open'));
 const images=items.map(item=>item.querySelector('img'));
 const desktop=matchMedia('(min-width:1024px)');
 const compact=matchMedia('(max-width:1023px)');
 const url=new URL(location.href);
 const mobileDepth=false;
 const modes=['aligned','grouped','index','depth'];
 const focused=true;
 let mode='depth';
 let active=0,returnTo,noticeTimer;
 const pad=n=>String(n+1).padStart(2,'0');
 const toolbar=document.createElement('div');
 const inspect=(index,trigger)=>{returnTo=trigger;buttons[index].click();};
 reader.addEventListener('close',()=>{
  if(returnTo?.classList.contains('depth-card')){
   const viewed=reader.querySelector('.reader-image')?.getAttribute('src');
   const index=images.findIndex(image=>image.getAttribute('src')===viewed);
   if(index>=0){depthSelect(index);returnTo=cards[index];}
  }
  if(returnTo&&returnTo.getClientRects().length)returnTo.focus({preventScroll:true});
  returnTo=null;
 });
 const grouped=document.createElement('section');grouped.className='study-grouped';grouped.setAttribute('aria-label','分组图录');
 const chapters=[['单品印象','FIRST IMPRESSION'],['系列组合','SERIES COMPOSITION'],['包装应用','PACKAGING APPLICATIONS'],['多样陈列','DISPLAY VARIATIONS'],['横向陈列','FINAL DISPLAY']];
 [[0],[1,2,3],[4,5],[6,7,8],[9]].forEach((indices,groupIndex)=>{
  const row=document.createElement('div');row.className=`study-group study-group-${groupIndex+1}`;
  const heading=document.createElement('header');heading.className='study-group-heading';
  heading.innerHTML=`<div class="study-group-label"><span class="study-group-no">${pad(groupIndex)}</span><h3>${chapters[groupIndex][0]}</h3></div><small class="study-group-en">${chapters[groupIndex][1]}</small>`;
  row.append(heading);
  indices.forEach(index=>{
   const item=items[index].cloneNode(true);
   const button=item.querySelector('.curated-open');
   button.addEventListener('click',()=>inspect(index,button));row.append(item);
  });grouped.append(row);
 });
 const indexPanel=document.createElement('section');indexPanel.className='study-index';indexPanel.setAttribute('aria-label','主展位与作品索引');
 indexPanel.innerHTML='<div class="study-main"><div class="study-main-stage"><button type="button" class="study-main-open" aria-label="细看当前作品" aria-haspopup="dialog"><img decoding="async" draggable="false"></button><div class="study-index-notice" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><div class="study-main-controls"><button type="button" class="reader-arrow reader-prev study-prev" aria-label="上一个展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><span class="study-active-count" aria-live="polite" aria-atomic="true"><strong>01</strong><span aria-hidden="true">/</span><span>'+pad(items.length-1)+'</span></span><button type="button" class="reader-arrow study-next" aria-label="下一个展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button></div><p class="study-main-hint">点击大图细看，或从右侧选择作品。</p></div><aside class="study-index-rail" aria-label="完整作品索引"><h3 class="study-index-heading">作品索引<small>INDEX / 10</small></h3><div class="study-index-grid"></div></aside>';
 const mainOpen=indexPanel.querySelector('.study-main-open');
 const mainImage=mainOpen.querySelector('img');
 const previous=indexPanel.querySelector('.study-prev');
 const next=indexPanel.querySelector('.study-next');
 const count=indexPanel.querySelector('.study-active-count');
 const notice=indexPanel.querySelector('.gallery-end-notice');
 const rail=indexPanel.querySelector('.study-index-grid');
 const thumbs=[];
 const sourceLabels=['单品包装特写','提袋组合展示','包装高低陈列','包装平铺总览','袋装错落组合','礼盒与手提袋','盒装竖向叠放','三款袋装并列','多款包装组合','盒装横向陈列'];
 const labels=items.map((item,index)=>sourceLabels[Number(item.dataset.sourceNumber)-1]||sourceLabels[index]);
 images.forEach((img,index)=>{
  const button=document.createElement('button');button.type='button';button.className='study-index-thumb';button.setAttribute('aria-label',`选择第 ${index+1} 张作品：${labels[index]}`);button.setAttribute('aria-pressed','false');
  const box=document.createElement('span');box.className='study-thumb-image';
  const thumb=img.cloneNode(true);thumb.alt='';thumb.loading='lazy';box.append(thumb);
  const number=document.createElement('span');number.className='study-thumb-number';number.textContent=pad(index);
  const title=document.createElement('span');title.className='study-thumb-title';title.textContent=labels[index];
  const status=document.createElement('span');status.className='study-thumb-status';status.setAttribute('aria-hidden','true');
  button.append(number,box,title,status);button.addEventListener('click',()=>select(index));rail.append(button);thumbs.push(button);
 });
 function select(index){
  clearTimeout(noticeTimer);notice.hidden=true;
  if(index>=images.length){notice.hidden=false;noticeTimer=setTimeout(()=>{notice.hidden=true;},1500);return;}
  active=Math.max(0,index);const source=images[active];
  mainImage.src=source.getAttribute('src');mainImage.alt=source.alt;mainImage.width=source.width;mainImage.height=source.height;
  mainOpen.setAttribute('aria-label',`细看第 ${active+1} 张当前作品`);
  count.querySelector('strong').textContent=pad(active);count.setAttribute('aria-label',`第 ${active+1} 张，共 ${images.length} 张`);
  previous.disabled=active===0;next.setAttribute('aria-disabled',String(active===images.length-1));
  thumbs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
 }
 mainOpen.addEventListener('click',()=>inspect(active,mainOpen));
 previous.addEventListener('click',()=>select(active-1));next.addEventListener('click',()=>select(active+1));
 indexPanel.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(active+(event.key==='ArrowRight'?1:-1));}
 });
 const depthPanel=document.createElement('section');depthPanel.className='study-depth';depthPanel.setAttribute('aria-label','景深展台');
 depthPanel.innerHTML='<div class="depth-stage"><div class="depth-notice" role="status" aria-live="polite"><div class="gallery-end-notice" hidden><span aria-hidden="true">✦</span><span>已经是最后一张啦~</span></div></div></div><div class="depth-controls"><button type="button" class="reader-arrow reader-prev depth-prev" aria-label="上一个景深展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button><span class="depth-count" aria-live="polite" aria-atomic="true"><strong>01</strong><span aria-hidden="true">/</span><span>'+pad(items.length-1)+'</span></span><button type="button" class="reader-arrow depth-next" aria-label="下一个景深展品"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.1 21 12 4.5 19.9 10.2 12Z"/></svg></button></div><p class="depth-hint">点击两侧切换展品 · 点击当前作品查看细节</p><div class="depth-thumbs" role="group" aria-label="景深展台作品导航"></div>';
 const depthStage=depthPanel.querySelector('.depth-stage');
 depthStage.id='depth-stage';
 depthStage.setAttribute('role','group');depthStage.setAttribute('aria-label','作品景深展台，支持左右方向键切换');
 const depthPrevious=depthPanel.querySelector('.depth-prev');
 const depthNext=depthPanel.querySelector('.depth-next');
 const depthCount=depthPanel.querySelector('.depth-count');
 const depthNotice=depthPanel.querySelector('.gallery-end-notice');
 const depthThumbRail=depthPanel.querySelector('.depth-thumbs');
 const depthHint=depthPanel.querySelector('.depth-hint');
 const cards=[],depthThumbs=[];
 const requestedDepth=Number(url.searchParams.get('image')||1)-1;
 let depthActive=Number.isFinite(requestedDepth)?Math.max(0,Math.min(images.length-1,requestedDepth)):0;
 let depthNoticeTimer,depthLayerTimer;
 const imageRatio=image=>(image.naturalWidth||Number(image.getAttribute('width')))/(image.naturalHeight||Number(image.getAttribute('height')));
 images.forEach((img,index)=>{
  const card=document.createElement('button');card.type='button';card.className='depth-card';card.dataset.depthIndex=String(index);
  card.style.setProperty('--depth-ratio',String(imageRatio(img)));
  const artwork=img.cloneNode(true);artwork.draggable=false;card.append(artwork);
  artwork.addEventListener('load',()=>card.style.setProperty('--depth-ratio',String(imageRatio(artwork))),{once:true});
  card.addEventListener('click',()=>{if(index===depthActive)inspect(index,card);else if(Math.abs(index-depthActive)===1)depthSelect(index);});
  depthStage.append(card);cards.push(card);
  const thumb=document.createElement('button');thumb.type='button';thumb.className='depth-thumb';thumb.setAttribute('aria-label',`选择第 ${index+1} 件景深展品：${labels[index]}`);thumb.setAttribute('title',labels[index]);thumb.setAttribute('aria-pressed','false');
  const tiny=img.cloneNode(true);tiny.alt='';tiny.loading='lazy';tiny.draggable=false;
  const number=document.createElement('span');number.textContent=pad(index);thumb.append(tiny,number);
  thumb.addEventListener('click',()=>depthSelect(index));depthThumbRail.append(thumb);depthThumbs.push(thumb);
 });
 function depthSelect(index){
  clearTimeout(depthNoticeTimer);depthNotice.hidden=true;
  if(index>=images.length){depthNotice.hidden=false;depthNoticeTimer=setTimeout(()=>{depthNotice.hidden=true;},1500);return;}
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
   if(Math.abs(offset)<=1)card.querySelector('img').loading='eager';
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
  if(mobileDepth&&compact.matches&&mode==='depth')centerDepthThumb(true);
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
 // Horizontal swipes switch one artwork. Vertical scrolling and pinch zoom stay native.
 let swipe=null,suppressDepthClickUntil=0;
 const canSwipe=()=>mobileDepth&&compact.matches&&mode==='depth';
 const finishSwipe=()=>{
  const pointerId=swipe?.id;swipe=null;
  if(pointerId!==undefined&&depthStage.hasPointerCapture(pointerId))depthStage.releasePointerCapture(pointerId);
  depthStage.classList.remove('is-dragging');depthStage.style.setProperty('--depth-drag','0px');
 };
 depthStage.addEventListener('pointerdown',event=>{
  if(!canSwipe()||!event.isPrimary||event.button!==0)return;
  swipe={id:event.pointerId,x:event.clientX,y:event.clientY,dx:0,axis:null};
 },{passive:true});
 depthStage.addEventListener('pointermove',event=>{
  if(!swipe||event.pointerId!==swipe.id)return;
  const dx=event.clientX-swipe.x,dy=event.clientY-swipe.y;
  if(!swipe.axis&&Math.max(Math.abs(dx),Math.abs(dy))>8){
   swipe.axis=Math.abs(dx)>Math.abs(dy)*1.2?'x':'y';
   if(swipe.axis==='x'){depthStage.setPointerCapture(event.pointerId);depthStage.classList.add('is-dragging');}
  }
  if(swipe.axis==='x'){
   event.preventDefault();swipe.dx=dx;
   const atBoundary=(depthActive===0&&dx>0)||(depthActive===images.length-1&&dx<0);
   const resistance=atBoundary?.18:.38;
   depthStage.style.setProperty('--depth-drag',`${Math.max(-52,Math.min(52,dx*resistance))}px`);
  }
 },{passive:false});
 depthStage.addEventListener('pointerup',event=>{
  if(!swipe||event.pointerId!==swipe.id)return;
  const dx=swipe.dx,horizontal=swipe.axis==='x';
  if(horizontal){event.preventDefault();suppressDepthClickUntil=performance.now()+450;}
  finishSwipe();
  if(horizontal&&Math.abs(dx)>=36)depthSelect(depthActive+(dx<0?1:-1));
 });
 depthStage.addEventListener('pointercancel',finishSwipe);
 depthStage.addEventListener('lostpointercapture',()=>{if(swipe)finishSwipe();});
 depthStage.addEventListener('click',event=>{
  if(performance.now()<suppressDepthClickUntil){event.preventDefault();event.stopImmediatePropagation();}
 },true);
 section.append(depthPanel);depthSelect(depthActive);
 function applyMode(scroll=false){
  document.body.dataset.desktopLayout=mode;
  document.body.dataset.studyFocus=String(focused);
  document.body.dataset.mobileLayout=mobileDepth?'depth':'original';
  depthHint.textContent=mobileDepth&&compact.matches?'左右滑动切换 · 轻点主图细看':'点击两侧切换展品 · 点击当前作品查看细节';
  depthStage.setAttribute('aria-label',mobileDepth&&compact.matches?'作品景深展台，可左右滑动或使用下方按钮切换':'作品景深展台，支持左右方向键切换');
  toolbar.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.studyMode===mode)));
  if(scroll&&desktop.matches)(focused&&['grouped','depth'].includes(mode)?section:toolbar).scrollIntoView({block:'start',behavior:'instant'});
 }
 toolbar.addEventListener('click',event=>{
  const button=event.target.closest('button[data-study-mode]');if(!button||button.dataset.studyMode===mode)return;
  mode=button.dataset.studyMode;url.searchParams.set('desktop',mode);history.replaceState(null,'',url);applyMode(true);
 });
 applyMode();
 compact.addEventListener('change',()=>{finishSwipe();applyMode();if(canSwipe())centerDepthThumb();});
 const position=()=>document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(canSwipe())centerDepthThumb();
  if(location.hash==='#depth-stage')((desktop.matches||mobileDepth)&&mode==='depth'?depthStage:section).scrollIntoView({block:'start',behavior:'instant'});
  else if(desktop.matches&&location.hash==='#curated-gallery')(focused&&['grouped','depth'].includes(mode)?section:toolbar).scrollIntoView({block:'start',behavior:'instant'});
 })));
 if(document.readyState==='complete')position();else window.addEventListener('load',position,{once:true});
})();
