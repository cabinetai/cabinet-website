"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

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

const HERO_ROTATING_WORDS = ["Knowledge Base", "AI team", "Work", "AI Workspace", "Cabinet"];

export function HeroHeadline() {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setI((v) => (v + 1) % HERO_ROTATING_WORDS.length), 2200);
    return () => clearInterval(t);
  }, [reduceMotion]);

  const word = HERO_ROTATING_WORDS[i];

  return (
    <h1
      aria-label="Your Knowledge Base, AI team, Work, AI Workspace, Cabinet."
      className="max-w-[13ch] font-display text-[clamp(2.75rem,4.4vw,4.3rem)] leading-[0.98] tracking-[-0.04em] text-text-primary"
    >
      Your{" "}
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="inline-block"
        >
          {word === "Cabinet" ? <span className="font-brand italic">Cabinet</span> : word}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
