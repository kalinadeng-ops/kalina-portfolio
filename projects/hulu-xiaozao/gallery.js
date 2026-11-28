(() => {
  const thumbnails = [...document.querySelectorAll('[data-scene]')];
  const panelButtons = [...document.querySelectorAll('[data-flat]')];
  const stage = document.querySelector('.hl-feature');
  const stageImage = stage.querySelector('img');
  const stageLabel = document.getElementById('stage-label');
  const stageCount = document.getElementById('stage-count');
  const viewer = document.querySelector('.hl-viewer');
  const viewerImage = document.getElementById('viewer-img');
  const viewTitle = document.getElementById('viewer-title');
  const viewCount = document.getElementById('viewer-count');
  const viewport = viewer.querySelector('.hl-view-scroll');
  const zoom = viewer.querySelector('[data-zoom]');
  const scenes = thumbnails.map(button => ({
    title: button.dataset.label,
    alt: button.dataset.alt,
    src: './media/shot-' + button.dataset.scene + '.webp',
    small: './media/shot-' + button.dataset.scene + '-sm.webp'
  }));
  const panels = panelButtons.map(button => ({
    title: button.dataset.label,
    alt: button.querySelector('img').alt,
    src: button.querySelector('img').src
  }));
  let selected = thumbnails.findIndex(button => button.getAttribute('aria-pressed') === 'true');
  let viewed = 0;
  let collection = scenes;
  const counter = (index, group) => String(index + 1).padStart(2, '0') + ' / ' + String(group.length).padStart(2, '0');

  function selectScene(index) {
    selected = index;
    const scene = scenes[index];
    stageImage.srcset = scene.small + ' 720w, ' + scene.src + ' 1536w';
    stageImage.src = scene.src;
    stageImage.alt = scene.alt;
    stage.setAttribute('aria-label', '放大当前场景：' + scene.title);
    stageLabel.textContent = scene.title;
    stageCount.textContent = counter(index, scenes);
    thumbnails.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
  }

  function setZoom(enlarged) {
    viewer.classList.toggle('is-zoomed', enlarged);
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.textContent = enlarged ? '适应窗口' : '查看原尺寸';
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  }

  function paintView() {
    const artwork = collection[viewed];
    setZoom(false);
    viewerImage.src = artwork.src;
    viewerImage.alt = artwork.alt;
    viewTitle.textContent = artwork.title;
    viewCount.textContent = counter(viewed, collection);
  }
  function openView(group, index) {
    collection = group;
    viewed = index;
    paintView();
    viewer.showModal();
  }
  function advance(step) {
    viewed = (viewed + step + collection.length) % collection.length;
    paintView();
    if (collection === scenes) selectScene(viewed);
  }

  thumbnails.forEach((button, index) => button.addEventListener('click', () => selectScene(index)));
  stage.addEventListener('click', () => openView(scenes, selected));
  panelButtons.forEach((button, index) => button.addEventListener('click', () => openView(panels, index)));
  viewer.querySelector('[data-prev]').addEventListener('click', () => advance(-1));
  viewer.querySelector('[data-next]').addEventListener('click', () => advance(1));
  viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
  const toggleZoom = () => setZoom(!viewer.classList.contains('is-zoomed'));
  zoom.addEventListener('click', toggleZoom);
  viewerImage.addEventListener('click', toggleZoom);
  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('keydown', event => {
    if (viewer.classList.contains('is-zoomed') && document.activeElement === viewport) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    advance(event.key === 'ArrowRight' ? 1 : -1);
  });
})();

