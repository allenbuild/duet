'use client';

import { useEffect, useRef } from 'react';

const CURSOR_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';

const seededVariation = (x: number, y: number, salt: number) => {
  const value = Math.sin((x + 6) * 12.9898 + (y + 6) * 78.233 + salt * 37.719);
  const scaled = value * 43758.5453;
  return scaled - Math.floor(scaled);
};

const cursorOutline = [
  [4, 3],
  [4, 31],
  [11, 24],
  [17, 37],
  [22, 35],
  [16, 22],
  [29, 22],
] as const;

const pointIsInsideCursor = (x: number, y: number) => {
  let inside = false;

  for (let index = 0, previous = cursorOutline.length - 1; index < cursorOutline.length; previous = index++) {
    const [currentX, currentY] = cursorOutline[index];
    const [previousX, previousY] = cursorOutline[previous];
    if (currentY > y !== previousY > y) {
      const crossingX =
        ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX;

      if (x < crossingX) inside = !inside;
    }
  }

  return inside;
};

const cursorDots = Array.from({ length: 16 }, (_, row) =>
  Array.from({ length: 12 }, (_, column) => {
    const cx = 4 + column * 2.35 + (seededVariation(column, row, 11) - 0.5) * 0.75;
    const cy = 3 + row * 2.35 + (seededVariation(column, row, 12) - 0.5) * 0.75;

    if (!pointIsInsideCursor(cx, cy)) return null;

    const sizeVariation = seededVariation(column, row, 1);
    const pulseVariation = seededVariation(column, row, 2);
    const amplitudeVariation = seededVariation(column, row, 3);
    const timingVariation = seededVariation(column, row, 4);
    const opacityVariation = seededVariation(column, row, 5);
    const radius = 0.28 + 1.15 * Math.pow(sizeVariation, 1.45);
    const pulseMinimum = radius * (0.58 + 0.18 * pulseVariation);
    const pulseMaximum = radius * (1.12 + 0.38 * amplitudeVariation);
    const pulseDuration = 1.6 + 1.7 * timingVariation;

    return {
      cx,
      cy,
      opacity: 0.34 + opacityVariation * 0.6,
      pulseDelay: -seededVariation(column, row, 6) * pulseDuration,
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
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-4px, -3px)`;
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
      <svg viewBox="0 0 34 42" focusable="false">
        <defs>
          <radialGradient
            id="dot-cursor-gradient"
            cx="4"
            cy="3"
            r="29"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="r"
              values="21;38;21"
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
          <clipPath id="dot-cursor-outline">
            <polygon points="4,3 4,31 11,24 17,37 22,35 16,22 29,22" />
          </clipPath>
        </defs>

        <g clipPath="url(#dot-cursor-outline)">
          <circle cx="4" cy="3" r="0.72" fill="#4a2e21">
            <animate
              attributeName="r"
              values="0.48;0.86;0.48"
              dur="2.35s"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              calcMode="spline"
              repeatCount="indefinite"
            />
          </circle>
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
        </g>
      </svg>
    </div>
  );
}
