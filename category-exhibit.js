(() => {
  const key = document.body.dataset.case;
  const data = cases[key];
  const root = document.getElementById('case-root');
  if (!root || !data) return;
  const projects = data.projects || [];
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const arrow = id => `<svg viewBox="0 0 32 34" aria-hidden="true"><defs><linearGradient id="hall-arrow-${id}" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#b2d8fc"/><stop offset=".5" stop-color="#7da5d4"/><stop offset="1" stop-color="#5475aa"/></linearGradient></defs><path fill="url(#hall-arrow-${id})" d="M10.3 6.5H24.1C25 6.5 25.6 7.2 25.6 8.1V21.9C25.6 23.3 23.9 24 22.9 23L18.9 19L10.2 27.7C9.5 28.4 8.4 28.4 7.7 27.7L4.3 24.3C3.6 23.6 3.6 22.5 4.3 21.8L13 13.1L9 9.1C8 8.1 8.9 6.5 10.3 6.5Z"/><path d="M11.2 8.2H23.4V13.2" fill="none" stroke="#fff9" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  const star = name => `<svg class="hall-star ${name}" viewBox="0 0 32 32" aria-hidden="true"><use href="#hall-rounded-star"/></svg>`;
  document.title = `${data.name}｜KALINA 作品集`;
  root.innerHTML = window.kalinaSiteHTML(`
    <svg class="hall-defs" width="0" height="0" aria-hidden="true"><defs><linearGradient id="hall-star-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff7d0"/><stop offset="1" stop-color="#edcb82"/></linearGradient><linearGradient id="hall-light-tone"><stop stop-color="#aed5f8"/><stop offset=".52" stop-color="#beb4e6"/><stop offset="1" stop-color="#eab1d0"/></linearGradient><symbol id="hall-rounded-star" viewBox="0 0 32 32"><path d="M16 3C17.2 3 20 10 20.4 10.6C21 11 28 11.5 28.4 12.7C28.7 13.9 23 18.2 22.7 19.2C22.4 20.2 24.3 27 23.3 27.8C22.3 28.5 16.8 24.3 16 24.3C15.2 24.3 9.7 28.5 8.7 27.8C7.7 27 9.6 20.2 9.3 19.2C9 18.2 3.3 13.9 3.6 12.7C4 11.5 11 11 11.6 10.6C12 10 14.8 3 16 3Z"/></symbol></defs></svg>
    <div class="hall-shell">
      <div class="hall-topline"><a href="/#work-exhibition">← 返回灵感展场</a><span>EXHIBITION HALL / ${data.number} OF 05</span></div>
      <section class="hall-intro" aria-labelledby="hall-title">
        <div class="hall-intro-copy"><p class="hall-eyebrow"><i aria-hidden="true"></i>EXHIBIT ${data.number} / ${data.en.toUpperCase()}</p><h1 id="hall-title">${data.name}</h1><p class="hall-tagline">${data.intro}</p><p class="hall-intro-note">${projects.length ? `${projects.length} 个项目在此展出。选一件作品，走进它的创意现场。` : '这个展位正在布置，先去发现其他灵感。'}</p></div>
        <figure class="hall-host"><figcaption>这一站，逛逛${data.name}。</figcaption><div class="hall-host-body"><img src="/assets/character-3d-v2.png" alt="KALINA 画家 IP 拿着画笔和调色盘，为${data.name}展区作介绍" width="240" height="240" fetchpriority="high"></div><i class="hall-plinth" aria-hidden="true"></i>${star('hall-host-star')}<i class="hall-pearl host-pearl" aria-hidden="true"></i></figure>
      </section>
      <section class="hall-gallery" aria-labelledby="hall-gallery-title"><div class="hall-section-heading"><h2 id="hall-gallery-title">项目展出</h2><div><span>Selected Projects</span><small>${projects.length ? `${String(projects.length).padStart(2,'0')} PROJECTS / 慢慢逛，让灵感发生。` : 'COMING SOON / 下一份灵感，正在路上。'}</small></div></div>
      ${projects.length ? `<div class="hall-stage"><svg class="hall-light" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true"><path d="M-150 290 C160 80 400 530 730 290 S1200 80 1590 340"/><path class="hall-light-glow" pathLength="1000" d="M-150 290 C160 80 400 530 730 290 S1200 80 1590 340"/></svg>${star('hall-stage-star-one')}${star('hall-stage-star-two')}<i class="hall-pearl stage-pearl" aria-hidden="true"></i><div class="hall-project-grid hall-project-grid--${projects.length}">${projects.map((project,index) => `<article class="hall-project"><a class="hall-project-link" href="/projects/${project.slug}/" aria-label="查看${escape(project.name)}项目"><div class="hall-card-top"><span>EXHIBIT ${data.number}.${String(index+1).padStart(2,'0')}</span><i aria-hidden="true"></i></div><div class="hall-project-image"><img src="${project.cover}" alt="${escape(project.alt)}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async"></div><div class="hall-project-meta"><span>${project.type}</span><small>${project.en}</small></div><h3>${project.name}</h3><div class="hall-project-bottom"><span>走进项目</span><span class="hall-project-arrow">${arrow(project.slug)}</span></div></a></article>`).join('')}</div></div>` : `<div class="hall-empty"><div class="hall-empty-object" aria-hidden="true"><div class="hall-empty-frame"><svg viewBox="0 0 32 32"><use href="#hall-rounded-star"/></svg><i></i></div><div class="hall-empty-plinth"></div><i class="hall-pearl"></i></div><div class="hall-empty-copy"><p class="hall-empty-kicker">A LITTLE WORK IN PROGRESS</p><h3>这个展位，正在布置中。</h3><p>作品整理中，精彩稍后登场。<br>先到其他展区，继续寻找喜欢的灵感。</p><a href="/work/packaging/">先逛逛包装设计 ${arrow('empty')}</a></div></div>`}
      </section>
      <section class="hall-next" aria-label="继续参观"><div><p>换个展位，遇见另一种灵感。</p><small>KEEP EXPLORING THE GALLERY</small></div><a href="/work/${data.next}/"><span><small>下一展区 / EXHIBIT ${cases[data.next].number}</small><strong>${data.nextName}</strong></span>${arrow('next')}</a></section>
    </div>`);
  const observed = [root.querySelector('.hall-host'), ...root.querySelectorAll('.hall-project'), root.querySelector('.hall-stage')].filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting)), {threshold:.04});
    observed.forEach(element => observer.observe(element));
  }
})();
