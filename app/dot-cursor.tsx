'use client';

import { useEffect, useRef } from 'react';

const CURSOR_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';

const seededVariation = (x: number, y: number, salt: number) => {
  const value = Math.sin((x + 6) * 12.9898 + (y + 6) * 78.233 + salt * 37.719);
  const scaled = value * 43758.5453;
  return scaled - Math.floor(scaled);
};

const cursorDots = Array.from({ length: 11 }, (_, row) =>
  Array.from({ length: 11 }, (_, column) => {
    const gridX = column - 5;
    const gridY = row - 5;
    const distance = Math.hypot(gridX, gridY);
    const edge = 5.15;

    if (distance > edge) return null;

    const falloff = 1 - distance / edge;
    const sizeVariation = seededVariation(gridX, gridY, 1);
    const pulseVariation = seededVariation(gridX, gridY, 2);
    const timingVariation = seededVariation(gridX, gridY, 3);
    const radialWeight = 0.38 + 0.62 * falloff;
    const radius = Math.min(
      1.75,
      0.2 + 1.42 * radialWeight * Math.pow(sizeVariation, 0.68),
    );
    const pulseMinimum = Math.max(0.16, radius * (0.54 + pulseVariation * 0.18));
    const pulseMaximum = Math.min(2, radius * (1.18 + timingVariation * 0.34));
    const pulseDuration = 1.8 + timingVariation * 1.15;

    return {
      cx: 20 + gridX * 3.35,
      cy: 20 + gridY * 3.35,
      opacity: Math.min(
        0.96,
        Math.max(
          0.22,
          0.28 + 0.68 * Math.pow(falloff, 0.9) + (sizeVariation - 0.5) * 0.14,
        ),
      ),
      pulseDelay: -seededVariation(gridX, gridY, 4) * pulseDuration,
      pulseDuration,
      pulseMaximum,
      pulseMinimum,
      radius,
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
          <radialGradient
            id="dot-cursor-gradient"
            cx="20"
            cy="20"
            r="17"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="r"
              values="13.5;20.5;13.5"
              dur="2.8s"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              calcMode="spline"
              repeatCount="indefinite"
            />
            <stop offset="0" stopColor="#4a2e21" />
            <stop offset="0.32" stopColor="#60392a" />
            <stop offset="0.58" stopColor="#805039" />
            <stop offset="0.8" stopColor="#a87452" />
            <stop offset="1" stopColor="#c79a70" />
          </radialGradient>
        </defs>

        {cursorDots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.radius}
            fill="url(#dot-cursor-gradient)"
            opacity={dot.opacity}
          >
            <animate
              attributeName="r"
              values={`${dot.pulseMinimum};${dot.pulseMaximum};${dot.pulseMinimum}`}
              dur={`${dot.pulseDuration}s`}
              begin={`${dot.pulseDelay}s`}
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              calcMode="spline"
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
