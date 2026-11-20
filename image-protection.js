(() => {
  'use strict';
  // A client-side saving deterrent, not DRM: the browser still loads the assets.
  const message = '作者已关闭图片下载功能';
  const mediaSelector = 'img, picture, canvas, svg image';
  const surfaceSelector = mediaSelector + ', [data-image-protected], [data-image-download]';
  const imageExtension = /\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp)(?:$|[?#])/i;
  let notice, noticeTimer, press, pressTimer, heldClick;
  const pointers = new Set();

  function element(target) {
    return target instanceof Element ? target : target?.parentElement;
  }
  function imageLink(target) {
    const link = element(target)?.closest('a[href]');
    if (!link) return null;
    return imageExtension.test(link.href) || /^data:image\//i.test(link.href) ||
      imageExtension.test(link.getAttribute('download') || '') ? link : null;
  }
  function surface(target) {
    const el = element(target);
    if (!el || el.closest('input, textarea, [contenteditable="true"]')) return null;
    return el.closest(surfaceSelector) || imageLink(el);
  }
  function protect(root) {
    const images = root.matches?.(mediaSelector) ? [root] : [];
    images.push(...(root.querySelectorAll?.(mediaSelector) || []));
    images.forEach(image => {
      image.setAttribute('draggable', 'false');
      // Some card images ignore pointer events; protect the surrounding control too.
      image.closest('a, button')?.setAttribute('data-image-protected', '');
    });
  }
  function hideNotice() {
    clearTimeout(noticeTimer);
    if (notice) notice.hidden = true;
  }
  function showNotice() {
    if (!notice) {
      notice = document.createElement('p');
      notice.className = 'image-download-notice';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      notice.setAttribute('aria-atomic', 'true');
      notice.textContent = message;
    }
    // A modal is in the browser's top layer: the feedback must be inside it.
    const openDialogs = document.querySelectorAll('dialog[open]');
    const host = openDialogs[openDialogs.length - 1] || document.body;
    if (notice.parentElement !== host) host.append(notice);
    notice.hidden = false;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(hideNotice, 2000);
  }
  function block(event) {
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
    showNotice();
  }
  function cancelPress() {
    clearTimeout(pressTimer);
    press = null;
  }
  function startPress(id, target, x, y) {
    pointers.add(id);
    cancelPress();
    if (pointers.size !== 1) { heldClick = null; hideNotice(); return; }
    const hit = surface(target);
    if (!hit) return;
    press = { id, hit, x, y };
    pressTimer = setTimeout(() => {
      if (!press) return;
      heldClick = { hit: press.hit, id, until: Infinity };
      showNotice();
    }, 550);
  }
  function movePress(id, x, y) {
    if (press?.id === id && Math.hypot(x - press.x, y - press.y) > 10) cancelPress();
  }
  function endPress(id) {
    pointers.delete(id);
    if (heldClick?.id === id) heldClick.until = performance.now() + 800;
    if (press?.id === id) cancelPress();
  }

  document.addEventListener('contextmenu', event => {
    if (surface(event.target)) block(event);
  }, true);
  document.addEventListener('dragstart', event => {
    if (surface(event.target)) block(event);
  }, true);
  function blockImageLink(event) {
    const el = element(event.target);
    if (imageLink(el) || el?.closest('[data-image-download]')) return block(event);
    if (event.type === 'click' && event.detail !== 0 && heldClick &&
        performance.now() < heldClick.until &&
        (heldClick.hit === el || heldClick.hit.contains(el) || surface(el) === heldClick.hit)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      heldClick = null;
    }
  }
  document.addEventListener('click', blockImageLink, true);
  document.addEventListener('auxclick', blockImageLink, true);

  if ('PointerEvent' in window) {
    document.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen')
        startPress(event.pointerId, event.target, event.clientX, event.clientY);
    }, { capture: true, passive: true });
    document.addEventListener('pointermove', event => movePress(event.pointerId, event.clientX, event.clientY), { capture: true, passive: true });
    document.addEventListener('pointerup', event => endPress(event.pointerId), true);
    document.addEventListener('pointercancel', event => endPress(event.pointerId), true);
  } else {
    // Older touch browsers: keep the same hold/scroll/pinch behavior.
    document.addEventListener('touchstart', event => {
      for (const touch of event.changedTouches) startPress(touch.identifier, event.target, touch.clientX, touch.clientY);
    }, { capture: true, passive: true });
    document.addEventListener('touchmove', event => {
      for (const touch of event.changedTouches) movePress(touch.identifier, touch.clientX, touch.clientY);
    }, { capture: true, passive: true });
    for (const type of ['touchend', 'touchcancel']) document.addEventListener(type, event => {
      for (const touch of event.changedTouches) endPress(touch.identifier);
    }, { capture: true, passive: true });
  }
  document.addEventListener('scroll', cancelPress, { capture: true, passive: true });
  document.addEventListener('close', hideNotice, true);
  document.addEventListener('kalina:image-gesture', () => {
    cancelPress(); heldClick = null; hideNotice();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelPress(); pointers.clear(); heldClick = null; hideNotice(); }
  });
  window.addEventListener('blur', () => { cancelPress(); pointers.clear(); heldClick = null; });
  protect(document);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) protect(node);
    }));
  }).observe(document.body, { childList: true, subtree: true });
})();
