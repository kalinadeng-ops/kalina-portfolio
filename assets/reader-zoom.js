(() => {
  'use strict';
  let sequence = 0;
  const steps = [1, 1.5, 2, 3, 4];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  window.KalinaImageZoom = {
    attach(reader, { onStep } = {}) {
      const viewport = reader.querySelector('.reader-image-viewport');
      const image = reader.querySelector('.reader-image');
      const help = reader.querySelector('.reader-help');
      const oldButton = reader.querySelector('.reader-zoom');
      const tools = document.createElement('div');
      const menuId = 'reader-scale-menu-' + (++sequence);
      tools.className = 'reader-zoom-tools';
      tools.innerHTML = `<div class="reader-zoom-stepper"><button type="button" class="reader-scale-step reader-scale-down" aria-label="缩小图片">−</button><button type="button" class="reader-scale-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="${menuId}" title="以全图显示大小为 100%"><span class="reader-scale-value">100%</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button><button type="button" class="reader-scale-step reader-scale-up" aria-label="放大图片">＋</button><div class="reader-scale-menu" role="listbox" aria-label="选择图片缩放比例" id="${menuId}" hidden>${steps.map(scale => `<button type="button" role="option" class="reader-scale-option" data-scale="${scale}" tabindex="-1" aria-selected="${scale === 1}"><span>${scale === 1 ? '适应屏幕' : Math.round(scale * 100) + '%'}</span><small>${scale === 1 ? '100%' : ''}</small></button>`).join('')}</div></div><button type="button" class="reader-button reader-scale-fit" title="恢复全图，重置缩放和位置">全图</button>`;
      oldButton.replaceWith(tools);
      reader.classList.add('has-image-zoom');
      const trigger = tools.querySelector('.reader-scale-trigger');
      const value = tools.querySelector('.reader-scale-value');
      const minus = tools.querySelector('.reader-scale-down');
      const plus = tools.querySelector('.reader-scale-up');
      const fit = tools.querySelector('.reader-scale-fit');
      const menu = tools.querySelector('.reader-scale-menu');
      const choices = [...menu.querySelectorAll('[role="option"]')];
      const touchDevice = matchMedia('(any-pointer: coarse)');
      let scale = 1, panX = 0, panY = 0, fitWidth = 0, fitHeight = 0;
      let frame = 0, gesture = null, suppressClickUntil = 0, lastHelp = '';
      const points = new Map();

      function closeMenu(restore = false) {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (restore) trigger.focus({ preventScroll: true });
      }
      function render() {
        const maxX = Math.max(0, (fitWidth * scale - viewport.clientWidth) / 2);
        const maxY = Math.max(0, (fitHeight * scale - viewport.clientHeight) / 2);
        panX = clamp(panX, -maxX, maxX);
        panY = clamp(panY, -maxY, maxY);
        const zoomed = scale > 1.001;
        reader.dataset.zoomed = String(zoomed);
        reader.dataset.zoomScale = scale.toFixed(4);
        reader.style.setProperty('--image-scale', scale);
        reader.style.setProperty('--image-pan-x', panX + 'px');
        reader.style.setProperty('--image-pan-y', panY + 'px');
        reader.style.setProperty('--image-fit-width', fitWidth + 'px');
        reader.style.setProperty('--image-fit-height', fitHeight + 'px');
        value.textContent = Math.round(scale * 100) + '%';
        trigger.setAttribute('aria-label', '缩放比例：' + value.textContent + (zoomed ? '' : '，适应屏幕'));
        minus.disabled = !zoomed;
        fit.disabled = !zoomed;
        plus.disabled = scale >= 3.999;
        choices.forEach(button => button.setAttribute('aria-selected', String(Math.abs(Number(button.dataset.scale) - scale) < .005)));
        const baseHint = touchDevice.matches ? '双指捏合缩放' : '选择比例或双击放大';
        const navigationHint = onStep ? (touchDevice.matches ? ' · 左右滑动翻页' : ' · 方向键翻页') : '';
        const hint = zoomed
          ? (touchDevice.matches ? '双指调整比例 · 单指拖动查看' : '拖动画面查看 · 点「全图」复位')
          : baseHint + navigationHint;
        if (hint !== lastHelp) { help.textContent = hint; lastHelp = hint; }
        viewport.setAttribute('aria-label', `作品图像，当前${Math.round(scale * 100)}%。${hint}`);
      }
      function measure() {
        const width = Number(image.getAttribute('width')) || image.naturalWidth;
        const height = Number(image.getAttribute('height')) || image.naturalHeight;
        if (!reader.open || !width || !height || !viewport.clientWidth || !viewport.clientHeight) return;
        const ratio = Math.min(Math.max(1, viewport.clientWidth - 16) / width, Math.max(1, viewport.clientHeight - 16) / height);
        fitWidth = width * ratio;
        fitHeight = height * ratio;
        render();
      }
      function scheduleMeasure() {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(measure);
      }
      function reset() {
        scale = 1; panX = 0; panY = 0;
        points.clear(); gesture = null;
        viewport.classList.remove('is-panning');
        viewport.scrollLeft = 0; viewport.scrollTop = 0;
        closeMenu(); render(); scheduleMeasure();
      }
      function centerAt(clientX, clientY) {
        const rect = viewport.getBoundingClientRect();
        return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 };
      }
      function setScale(next, anchor = { x: 0, y: 0 }) {
        measure();
        const limited = clamp(next, 1, 4), ratio = limited / scale;
        panX = anchor.x - (anchor.x - panX) * ratio;
        panY = anchor.y - (anchor.y - panY) * ratio;
        scale = limited;
        render();
      }
      function stepScale(direction) {
        const next = direction > 0 ? steps.find(n => n > scale + .005) : [...steps].reverse().find(n => n < scale - .005);
        if (next) setScale(next);
        closeMenu();
      }
      function openMenu() {
        menu.hidden = false; trigger.setAttribute('aria-expanded', 'true');
        const selected = choices.find(button => button.getAttribute('aria-selected') === 'true') || choices[0];
        selected.focus({ preventScroll: true });
      }
      trigger.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
      trigger.addEventListener('keydown', event => {
        if (['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); openMenu(); }
      });
      choices.forEach(button => button.addEventListener('click', () => {
        setScale(Number(button.dataset.scale)); closeMenu(true);
      }));
      menu.addEventListener('keydown', event => {
        event.stopPropagation();
        if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return; }
        if (event.key === 'Tab') { closeMenu(); return; }
        const index = choices.indexOf(document.activeElement);
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
          choices[next].focus();
        }
      });
      tools.addEventListener('focusout', event => { if (!tools.contains(event.relatedTarget)) closeMenu(); });
      reader.addEventListener('pointerdown', event => { if (!tools.contains(event.target)) closeMenu(); });
      minus.addEventListener('click', () => stepScale(-1));
      plus.addEventListener('click', () => stepScale(1));
      fit.addEventListener('click', reset);

      function viewingGesture() {
        reader.dispatchEvent(new CustomEvent('kalina:image-gesture', { bubbles: true }));
      }
      function beginPinch() {
        const [a, b] = [...points.values()];
        const mid = centerAt((a.x + b.x) / 2, (a.y + b.y) / 2);
        gesture = { mode: 'pinch', distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), startScale: scale, anchorX: (mid.x - panX) / scale, anchorY: (mid.y - panY) / scale };
        viewingGesture();
      }
      function start(id, x, y, kind) {
        points.set(id, { x, y, kind });
        if (points.size === 2) { beginPinch(); return; }
        if (points.size > 2) return;
        gesture = { mode: scale > 1.001 ? 'pan' : 'swipe', x, y, panX, panY, moved: false, canSwipe: kind !== 'mouse' };
      }
      function move(id, x, y) {
        if (!points.has(id) || !gesture) return;
        points.set(id, { ...points.get(id), x, y });
        if (points.size >= 2) {
          if (gesture.mode !== 'pinch') beginPinch();
          const [a, b] = [...points.values()];
          const mid = centerAt((a.x + b.x) / 2, (a.y + b.y) / 2);
          scale = clamp(gesture.startScale * Math.hypot(a.x - b.x, a.y - b.y) / gesture.distance, 1, 4);
          panX = mid.x - gesture.anchorX * scale; panY = mid.y - gesture.anchorY * scale;
          render(); return;
        }
        const dx = x - gesture.x, dy = y - gesture.y;
        if (Math.hypot(dx, dy) > 8 && !gesture.moved) { gesture.moved = true; viewingGesture(); }
        if (gesture.mode === 'pan') {
          viewport.classList.toggle('is-panning', gesture.moved);
          panX = gesture.panX + dx; panY = gesture.panY + dy; render();
        }
      }
      function end(id, cancelled = false) {
        const point = points.get(id); if (!point) return;
        points.delete(id);
        const previous = gesture;
        if (previous?.mode === 'pinch' || previous?.moved) suppressClickUntil = performance.now() + 450;
        if (points.size >= 2) { beginPinch(); return; }
        if (points.size === 1) {
          const remaining = [...points.values()][0];
          gesture = { mode: 'pan', x: remaining.x, y: remaining.y, panX, panY, moved: false, canSwipe: false };
          return;
        }
        gesture = null; viewport.classList.remove('is-panning');
        if (!cancelled && previous?.mode === 'swipe' && previous.canSwipe) {
          const dx = point.x - previous.x, dy = point.y - previous.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.25) onStep?.(dx < 0 ? 1 : -1);
        }
      }
      if ('PointerEvent' in window) {
        viewport.addEventListener('pointerdown', event => {
          if (event.button !== 0) return;
          if (event.pointerType === 'mouse') viewport.focus({ preventScroll: true });
          viewport.setPointerCapture(event.pointerId);
          start(event.pointerId, event.clientX, event.clientY, event.pointerType);
        });
        viewport.addEventListener('pointermove', event => move(event.pointerId, event.clientX, event.clientY));
        viewport.addEventListener('pointerup', event => end(event.pointerId));
        viewport.addEventListener('pointercancel', event => end(event.pointerId, true));
        viewport.addEventListener('lostpointercapture', event => { if (event.target === viewport) end(event.pointerId, true); });
      } else {
        viewport.addEventListener('touchstart', event => {
          for (const point of event.changedTouches) start(point.identifier, point.clientX, point.clientY, 'touch');
        }, { passive: true });
        viewport.addEventListener('touchmove', event => {
          event.preventDefault();
          for (const point of event.changedTouches) move(point.identifier, point.clientX, point.clientY);
        }, { passive: false });
        for (const type of ['touchend', 'touchcancel']) viewport.addEventListener(type, event => {
          for (const point of event.changedTouches) end(point.identifier, type === 'touchcancel');
        });
      }
      viewport.addEventListener('click', event => {
        if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
      }, true);
      viewport.addEventListener('dblclick', event => {
        if (performance.now() < suppressClickUntil) return;
        event.preventDefault();
        scale > 1.001 ? reset() : setScale(2, centerAt(event.clientX, event.clientY));
      });
      viewport.addEventListener('wheel', event => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault(); viewingGesture();
          setScale(scale * Math.exp(-event.deltaY * .01), centerAt(event.clientX, event.clientY));
        } else if (scale > 1.001) {
          event.preventDefault();
          const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
          panX -= event.deltaX * units; panY -= event.deltaY * units; render();
        }
      }, { passive: false });
      viewport.addEventListener('keydown', event => {
        if (['+', '=', '-', '0'].includes(event.key)) {
          event.preventDefault(); event.stopPropagation();
          event.key === '0' ? reset() : stepScale(event.key === '-' ? -1 : 1);
        } else if (scale > 1.001 && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          event.preventDefault(); event.stopPropagation();
          if (event.key === 'ArrowLeft') panX += 48;
          if (event.key === 'ArrowRight') panX -= 48;
          if (event.key === 'ArrowUp') panY += 48;
          if (event.key === 'ArrowDown') panY -= 48;
          render();
        }
      });
      new MutationObserver(reset).observe(image, { attributes: true, attributeFilter: ['src', 'width', 'height'] });
      new MutationObserver(() => { if (reader.open) scheduleMeasure(); else reset(); }).observe(reader, { attributes: true, attributeFilter: ['open'] });
      new ResizeObserver(() => {
        if (reader.open) {
          scale = 1; panX = 0; panY = 0; points.clear(); gesture = null;
          viewport.classList.remove('is-panning');
          scheduleMeasure();
        }
      }).observe(viewport);
      image.addEventListener('load', scheduleMeasure);
      touchDevice.addEventListener?.('change', render);
      reset();
      return { reset };
    }
  };
})();
