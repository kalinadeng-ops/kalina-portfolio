(() => {
  const root = document.querySelector('[data-ip-motion]');
  if (!root) return;
  const video = root.querySelector('video');
  const canvas = root.querySelector('canvas');
  const stage = root.closest('.inspiration-stage');
  const status = root.querySelector('[role="status"]');
  const context = canvas.getContext('2d');
  if (!context) return;
  const atlas = document.createElement('canvas');
  atlas.width = 960; atlas.height = 480;
  const source = atlas.getContext('2d', { willReadFrequently: true });
  if (!source) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false, inView = true, count = 0, lastFrame = -1, loops = 0;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.autoplay = !reduced.matches;
  function paint() {
    queued = false;
    // Native looping briefly seeks with no decoded frame. Keep the render
    // driver alive so the transparent surface resumes after every loop.
    if (video.readyState < 2) { if (!video.paused && !video.error) queue(); return; }
    const frameIndex = Math.min(215, Math.floor(video.currentTime * 24));
    if (lastFrame > frameIndex) root.dataset.loopsCompleted = String(++loops);
    if (frameIndex === lastFrame && !video.ended) { if (!video.paused) queue(); return; }
    lastFrame = frameIndex;
    try {
      source.drawImage(video, 0, 0, 960, 480);
      const rgb = source.getImageData(0, 0, 480, 480);
      const alpha = source.getImageData(480, 0, 480, 480).data;
      for (let p = 0; p < rgb.data.length; p += 4) {
        const a = alpha[p];
        rgb.data[p + 3] = a < 8 ? 0 : a > 247 ? 255 : a;
      }
      context.putImageData(rgb, 0, 0);
      root.classList.add('is-ready');
      root.dataset.framesRendered = String(++count);
    } catch {
      video.pause(); root.dataset.motionState = 'error';
      root.classList.remove('is-ready');
      status.textContent = '动画暂时无法播放，已显示角色静帧。';
      return;
    }
    if (!video.paused && !video.ended) queue();
  }
  function queue() {
    if (queued) return;
    queued = true;
    // The source video is only a decoder, not the visible surface. Browser
    // compositors may throttle frame callbacks for its 1px element, so drive
    // the visible canvas with RAF and draw each decoded 24fps frame once.
    requestAnimationFrame(paint);
  }
  async function play() {
    try {
      await video.play(); queue();
      root.dataset.motionState = 'playing';
      status.textContent = '画家IP动画正在自动循环播放。';
    } catch {
      root.dataset.motionState = 'ready';
      status.textContent = '已显示画家IP静帧。';
    }
  }
  video.addEventListener('error', () => {
    root.dataset.motionState = 'error'; root.classList.remove('is-ready');
    status.textContent = '动画暂时无法播放，已显示角色静帧。';
  });
  function initialPlayback() {
    if (video.readyState < 2 || reduced.matches || !inView || document.hidden) return;
    if (video.paused) play();
    else {
      root.dataset.motionState = 'playing';
      status.textContent = '画家IP动画正在自动循环播放。';
      queue();
    }
  }
  video.addEventListener('loadeddata', initialPlayback, { once: true });
  video.addEventListener('playing', initialPlayback);
  video.addEventListener('seeked', initialPlayback);
  function visibility() {
    const active = !document.hidden && inView && !reduced.matches;
    video.autoplay = !reduced.matches;
    if (stage) stage.dataset.motionActive = String(active);
    if (!active) {
      video.pause(); root.dataset.motionState = reduced.matches ? 'reduced' : 'paused';
    } else if (video.paused) initialPlayback();
    else queue();
  }
  document.addEventListener('visibilitychange', visibility);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; visibility(); }, { threshold: .05 }).observe(root);
  }
  reduced.addEventListener?.('change', visibility);
  if (reduced.matches) {
    root.dataset.motionState = 'reduced';
    video.pause(); status.textContent = '已按减少动态效果设置显示角色静帧。';
  }
  // Cached media can become ready before this deferred script attaches its
  // loadeddata listener. Start immediately when it has already decoded.
  initialPlayback();
})();
