(()=>{
  const root=document.querySelector('#project-root');if(!root||!root.querySelector('.coffee-top-band'))return;
  document.body.classList.add('coffee-exhibit');
  const ns='http://www.w3.org/2000/svg',guide=root.querySelector('.coffee-guide');
  // One complete character image: no independently moving limbs or synthetic poses.
  if(guide){
    const caption=guide.querySelector('figcaption');guide.removeAttribute('data-ip-motion');
    guide.setAttribute('aria-label',`KALINA 画家 IP 轻轻呼吸，介绍${root.querySelector('h1').textContent}项目`);
    guide.replaceChildren();
    const portrait=document.createElement('div');portrait.className='coffee-presenter-body';
    const img=document.createElement('img');img.src=window.kalinaSiteURL('/assets/character-3d-v2.png');img.alt='KALINA 画家 IP 举起画笔，为设计项目作介绍';img.width=232;img.height=232;portrait.append(img);guide.append(portrait);if(caption)guide.append(caption);
    new IntersectionObserver(([e])=>guide.classList.toggle('is-visible',e.isIntersecting),{threshold:.1}).observe(guide);
  }
  const svg=document.createElementNS(ns,'svg');svg.classList.add('coffee-exhibit-light');svg.setAttribute('viewBox','0 0 1440 2900');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
  svg.innerHTML='<defs><linearGradient id="coffee-exhibit-thread" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#9cccf6"/><stop offset=".5" stop-color="#b9afe6"/><stop offset="1" stop-color="#e9aaca"/></linearGradient><linearGradient id="coffee-exhibit-arrow" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#badcf8"/><stop offset=".5" stop-color="#8cb0d9"/><stop offset="1" stop-color="#6485b0"/></linearGradient><linearGradient id="coffee-exhibit-star-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff7cf"/><stop offset="1" stop-color="#eec875"/></linearGradient><symbol id="coffee-exhibit-rounded-star" viewBox="0 0 32 32"><path d="M16 3C17.2 3 20 10 20.4 10.6C21 11 28 11.5 28.4 12.7C28.7 13.9 23 18.2 22.7 19.2C22.4 20.2 24.3 27 23.3 27.8C22.3 28.5 16.8 24.3 16 24.3C15.2 24.3 9.7 28.5 8.7 27.8C7.7 27 9.6 20.2 9.3 19.2C9 18.2 3.3 13.9 3.6 12.7C4 11.5 11 11 11.6 10.6C12 10 14.8 3 16 3Z"/></symbol></defs>';
  ['M-160 340 C90 230 320 650 615 550 S1100 260 1600 570','M1600 1810 C1280 1580 1060 1960 780 1810 S190 1580 -160 1830'].forEach((d,i)=>{
    for(const cls of['coffee-thread-base','coffee-thread-glow']){const p=document.createElementNS(ns,'path');p.setAttribute('d',d);p.setAttribute('class',cls);p.setAttribute('data-coffee-track',String(i));if(cls.endsWith('glow')){p.setAttribute('pathLength','1000');p.style.animationDelay=(-i*2.8)+'s'}svg.append(p)}
  });root.prepend(svg);
  // Route the first light through the actual cards, masking their tilted surfaces.
  const cards=[...root.querySelectorAll('.coffee-information-row')];
  const mask=document.createElementNS(ns,'mask');mask.id='coffee-card-occlusion';mask.setAttribute('maskUnits','userSpaceOnUse');mask.setAttribute('maskContentUnits','userSpaceOnUse');
  const maskBase=document.createElementNS(ns,'rect');maskBase.setAttribute('x','-400');maskBase.setAttribute('y','-400');maskBase.setAttribute('width','2240');maskBase.setAttribute('height','3700');maskBase.setAttribute('fill','white');mask.append(maskBase);
  const cardMasks=cards.map(()=>{const p=document.createElementNS(ns,'polygon');p.setAttribute('fill','black');mask.append(p);return p});svg.querySelector('defs').append(mask);
  const tracks=document.createElementNS(ns,'g');tracks.setAttribute('mask','url(#coffee-card-occlusion)');[...svg.children].filter(e=>e.tagName.toLowerCase()==='path').forEach(p=>tracks.append(p));svg.append(tracks);
  let layoutQueued=false;
  function updateCardLight(){
    layoutQueued=false;const r=svg.getBoundingClientRect();if(!r.width||!r.height)return;
    const sx=1440/r.width,sy=2900/r.height,centers=[];
    cards.forEach((card,i)=>{
      const b=card.getBoundingClientRect(),style=getComputedStyle(card),m=new DOMMatrix(style.transform==='none'?undefined:style.transform),angle=Math.atan2(m.b,m.a),cx=b.left+b.width/2-r.left,cy=b.top+b.height/2-r.top,w=card.offsetWidth/2+4,h=card.offsetHeight/2+4;
      centers.push(cy*sy);cardMasks[i].setAttribute('points',[[-w,-h],[w,-h],[w,h],[-w,h]].map(([x,y])=>[((cx+x*Math.cos(angle)-y*Math.sin(angle))*sx).toFixed(2),((cy+x*Math.sin(angle)+y*Math.cos(angle))*sy).toFixed(2)].join(',')).join(' '));
    });
    if(!centers.length)return;
    let d;if(innerWidth<=760&&centers.length===3){
      const [a,b,c]=centers;d=`M-160 ${a-55*sy} C180 ${a-130*sy} 1500 ${a+55*sy} 1540 ${a+130*sy} S-120 ${b-45*sy} -100 ${b+65*sy} S1400 ${c-50*sy} 1600 ${c+85*sy}`;
    }else{
      const mid=centers.reduce((a,b)=>a+b,0)/3,amp=Math.min(130,cards[0].offsetHeight*.4)*sy;
      d=`M-160 ${mid+amp*.4} C100 ${mid-amp*1.3} 350 ${mid+amp*1.2} 650 ${mid+amp*.25} S1160 ${mid-amp*1.1} 1600 ${mid+amp*.65}`;
    }
    tracks.querySelectorAll('[data-coffee-track="0"]').forEach(p=>p.setAttribute('d',d));
  }
  function scheduleCardLight(){if(!layoutQueued){layoutQueued=true;requestAnimationFrame(updateCardLight)}}
  new ResizeObserver(scheduleCardLight).observe(root);addEventListener('resize',scheduleCardLight);document.fonts.ready.then(scheduleCardLight);scheduleCardLight();
  new IntersectionObserver(([e])=>svg.classList.toggle('is-visible',e.isIntersecting),{threshold:0}).observe(root);
  ['one','two','three'].forEach(n=>{const s=document.createElementNS(ns,'svg');s.setAttribute('class','coffee-exhibit-star coffee-star-'+n);s.setAttribute('viewBox','0 0 32 32');s.setAttribute('aria-hidden','true');const use=document.createElementNS(ns,'use');use.setAttribute('href','#coffee-exhibit-rounded-star');s.append(use);root.append(s)});
  const decorObserver=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-visible',e.isIntersecting)),{threshold:0});
  function decorate(target,name,items){
    if(!target)return;const layer=document.createElement('div');layer.className='coffee-small-decor coffee-decor-'+name;layer.setAttribute('aria-hidden','true');
    items.forEach(([type,x,y,size,wide],i)=>{
      const e=type==='star'?document.createElementNS(ns,'svg'):document.createElement('i');e.setAttribute('class','decor-element decor-'+type+(wide?' decor-wide-only':''));
      e.style.cssText=`--decor-x:${x};--decor-y:${y}px;--decor-size:${size}px;--decor-delay:${-i*2.1}s`;
      if(type==='star'){e.setAttribute('viewBox','0 0 32 32');const use=document.createElementNS(ns,'use');use.setAttribute('href','#coffee-exhibit-rounded-star');e.append(use)}layer.append(e);
    });target.append(layer);decorObserver.observe(layer);
  }
  decorate(root.querySelector('.coffee-top-band'),'top',[
    ['star','61%',205,13],['bubble','58%',90,15],['ring','67%',230,23]
  ]);
  decorate(root.querySelector('.coffee-information'),'info',[
    ['star','2.2%',128,13],['bubble','3.7%',154,11],['ring','96.8%',206,17],['star','58%',2,11,true]
  ]);
  decorate(root.querySelector('.coffee-design-gallery'),'gallery',[
    ['star','1.8%',47,14],['bubble','3.5%',67,10],['ring','97%',110,18]
  ]);
  decorate(root.querySelector('.coffee-motion'),'film',[
    ['star','-40px',31,12],['ring','calc(100% + 30px)',62,16]
  ]);
})();
