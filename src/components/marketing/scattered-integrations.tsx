"use client";

import Image from "next/image";
import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { INTEGRATION_LOGOS } from "./legacy-sections";

const TILE = 40;
const REPEL_RADIUS = 140;
const REPEL_STRENGTH = 60;
const REPEL_SPRING = { stiffness: 240, damping: 17, mass: 0.7 };

// A wide, short canvas the frame slots are authored against, centered on the
// section. Positions sit right at, and a little past, the section's own
// edge (the layer clips them there) - the visual "chaos" of dozens of
// disconnected tools spilling past the one calm, organized Cabinet view in
// the center, with no gap between the tiles and the frame.
const HALF_W = 660;
const HALF_H = 430;

function frameSlot(i: number) {
  const golden = 2.399963;
  const edge = i % 4;
  const t = (i * golden) % 1;
  const jitter = (((i * 977) % 101) / 101 - 0.5) * 40;
  switch (edge) {
    case 0:
      return { x: -HALF_W + t * HALF_W * 2, y: -HALF_H + jitter };
    case 1:
      return { x: HALF_W - 8 + jitter * 0.3, y: -HALF_H + t * HALF_H * 2 };
    case 2:
      return { x: -HALF_W + t * HALF_W * 2, y: HALF_H - jitter };
    default:
      return { x: -HALF_W + 8 + jitter * 0.3, y: -HALF_H + t * HALF_H * 2 };
  }
}

function ScatterTile({
  src,
  x,
  y,
  rot,
  pointerX,
  pointerY,
}: {
  src: string;
  x: number;
  y: number;
  rot: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const repelX = useTransform(() => {
    const dx = x - pointerX.get();
    const dy = y - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist >= REPEL_RADIUS || dist === 0) return 0;
    return (dx / dist) * (1 - dist / REPEL_RADIUS) ** 2 * REPEL_STRENGTH;
  });
  const repelY = useTransform(() => {
    const dx = x - pointerX.get();
    const dy = y - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist >= REPEL_RADIUS || dist === 0) return 0;
    return (dy / dist) * (1 - dist / REPEL_RADIUS) ** 2 * REPEL_STRENGTH;
  });
  const sx = useSpring(repelX, REPEL_SPRING);
  const sy = useSpring(repelY, REPEL_SPRING);
  const finalX = useTransform(sx, (v) => x + v);
  const finalY = useTransform(sy, (v) => y + v);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-xl card-skin shadow-sm"
      style={{
        x: finalX,
        y: finalY,
        rotate: rot,
        width: TILE,
        height: TILE,
        marginLeft: -TILE / 2,
        marginTop: -TILE / 2,
      }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        width={24}
        height={24}
        className="h-5 w-5 object-contain opacity-80"
      />
    </motion.div>
  );
}

/** Scatters every integration logo around the frame of `children`, each
 *  tile fleeing the cursor within a short radius. Used to contrast the
 *  clutter of dozens of tools against the one organized Cabinet view. */
export function ScatteredIntegrationsFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(99999);
  const pointerY = useMotionValue(99999);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pointerX.set(e.clientX - (r.left + r.width / 2));
    pointerY.set(e.clientY - (r.top + r.height / 2));
  };
  const resetPointer = () => {
    pointerX.set(99999);
    pointerY.set(99999);
  };

  return (
    <div
      ref={ref}
      className="relative flex w-full flex-1 items-center self-stretch"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        {INTEGRATION_LOGOS.map((src, i) => {
          const { x, y } = frameSlot(i);
          const rot = (((i * 613) % 37) / 37 - 0.5) * 24;
          return (
            <ScatterTile
              key={`${src}-${i}`}
              src={src}
              x={x}
              y={y}
              rot={rot}
              pointerX={pointerX}
              pointerY={pointerY}
            />
          );
        })}
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
