'use client';

import { useEffect, useRef } from 'react';

const CURSOR_QUERY =
  '(hover: hover) and (pointer: fine) and (forced-colors: none)';

export function DotCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const root = document.documentElement;
    const media = window.matchMedia(CURSOR_QUERY);
    let enabled = false;
    let frame = 0;
    let x = -100;
    let y = -100;

    const hide = () => {
      cursor.dataset.visible = 'false';
      root.removeAttribute('data-dot-cursor-live');
    };

    const paint = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-5px, -8px)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== 'mouse' || !event.isPrimary) return;

      x = event.clientX;
      y = event.clientY;

      if (!frame) frame = requestAnimationFrame(paint);

      root.setAttribute('data-dot-cursor-live', '');
      cursor.dataset.visible = 'true';
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide();
    };

    const syncCapability = () => {
      enabled = media.matches;
      root.toggleAttribute('data-dot-cursor-capable', enabled);
      if (!enabled) hide();
    };

    const onVisibilityChange = () => {
      if (document.hidden) hide();
    };

    syncCapability();
    media.addEventListener('change', syncCapability);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      media.removeEventListener('change', syncCapability);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      root.removeAttribute('data-dot-cursor-capable');
      root.removeAttribute('data-dot-cursor-live');
    };
  }, []);

  return (
    <div ref={cursorRef} className="dot-cursor" data-visible="false" aria-hidden="true">
      <img src="/hand-cursor.png?v=4" alt="" draggable="false" />
    </div>
  );
}
