'use client';

import { useEffect, useRef } from 'react';

const CURSOR_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';

const cursorDots = Array.from({ length: 11 }, (_, row) =>
  Array.from({ length: 11 }, (_, column) => {
    const gridX = column - 5;
    const gridY = row - 5;
    const distance = Math.hypot(gridX, gridY);
    const edge = 5.15;

    if (distance > edge) return null;

    const falloff = 1 - distance / edge;
    const directionalBias = 1 + 0.06 * ((gridX - gridY) / 10);

    return {
      cx: 20 + gridX * 3.35,
      cy: 20 + gridY * 3.35,
      opacity: 0.5 + 0.42 * falloff,
      radius: (0.24 + 1.18 * Math.pow(falloff, 0.72)) * directionalBias,
    };
  }),
).flatMap((row) => row.filter((dot) => dot !== null));

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
      cursor.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
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
      <svg viewBox="0 0 40 40" focusable="false">
        <defs>
          <linearGradient
            id="dot-cursor-gradient"
            x1="5"
            y1="4"
            x2="35"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#563225" />
            <stop offset="0.52" stopColor="#9a5a3d" />
            <stop offset="1" stopColor="#c88b5d" />
          </linearGradient>
        </defs>

        {cursorDots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.radius}
            fill="url(#dot-cursor-gradient)"
            opacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
