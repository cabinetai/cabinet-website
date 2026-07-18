"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "rise" | "pop" | "left" | "right";

export function MotionReveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  variant?: RevealVariant;
}) {
  const reduceMotion = useReducedMotion();
  const offset = variant === "left" ? { x: -26 } : variant === "right" ? { x: 26 } : { y: 24 };
  const scale = variant === "pop" ? 0.97 : 1;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)", scale, ...offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const HERO_WORDS = [
  "Your",
  "knowledge,",
  "your",
  "AI",
  "team,",
  "your",
  "apps.",
  "One",
  "workspace.",
];

export function HeroHeadline() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      aria-label="Your knowledge, your AI team, your apps. One workspace."
      className="max-w-[13ch] font-display text-[clamp(2.75rem,4.4vw,4.3rem)] leading-[0.98] tracking-[-0.04em] text-text-primary"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduceMotion ? 0 : 0.075, delayChildren: 0.16 },
        },
      }}
    >
      {HERO_WORDS.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: "88%", rotate: 1.5 },
              visible: {
                opacity: 1,
                y: "0%",
                rotate: 0,
                transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
