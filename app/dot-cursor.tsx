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
  [1.5, 1.5],
  [1.5, 20.5],
  [5.8, 16.2],
  [9.8, 24.6],
  [13.5, 22.9],
  [9.6, 14.9],
  [16.5, 14.9],
] as const;

const cursorPath = 'M1.5 1.5V20.5L5.8 16.2L9.8 24.6L13.5 22.9L9.6 14.9H16.5Z';

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

const cursorDots = Array.from({ length: 13 }, (_, row) =>
  Array.from({ length: 9 }, (_, column) => {
    const cx = 1.5 + column * 2 + (seededVariation(column, row, 11) - 0.5) * 0.5;
    const cy = 1.5 + row * 2 + (seededVariation(column, row, 12) - 0.5) * 0.5;

    if (!pointIsInsideCursor(cx, cy)) return null;

    const sizeVariation = seededVariation(column, row, 1);
    const pulseVariation = seededVariation(column, row, 2);
    const amplitudeVariation = seededVariation(column, row, 3);
    const timingVariation = seededVariation(column, row, 4);
    const opacityVariation = seededVariation(column, row, 5);
    const radius = 0.22 + 0.55 * Math.pow(sizeVariation, 1.2);
    const pulseMinimum = radius * (0.58 + 0.18 * pulseVariation);
    const pulseMaximum = radius * (1.12 + 0.38 * amplitudeVariation);
    const pulseDuration = 1.1 + 1.15 * timingVariation;

    return {
      cx,
      cy,
      opacity: 0.42 + opacityVariation * 0.55,
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
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-1.5px, -1.5px)`;
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
      <svg viewBox="0 0 18 26" focusable="false">
        <defs>
          <radialGradient
            id="dot-cursor-gradient"
            cx="1.5"
            cy="1.5"
            r="14"
            gradientUnits="userSpaceOnUse"
          >
            <animate
              attributeName="r"
              values="10;19;10"
              dur="1.85s"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              calcMode="spline"
              repeatCount="indefinite"
            />
            <stop offset="0" stopColor="#42291d" />
            <stop offset="0.32" stopColor="#573326" />
            <stop offset="0.58" stopColor="#754831" />
            <stop offset="0.8" stopColor="#9c6848" />
            <stop offset="1" stopColor="#bc8b63" />
          </radialGradient>
          <clipPath id="dot-cursor-outline">
            <path d={cursorPath} />
          </clipPath>
        </defs>

        <g clipPath="url(#dot-cursor-outline)">
          <circle cx="1.5" cy="1.5" r="0.42" fill="#42291d">
            <animate
              attributeName="r"
              values="0.3;0.55;0.3"
              dur="1.55s"
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
        <path
          d={cursorPath}
          fill="none"
          stroke="#5f3b2b"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
