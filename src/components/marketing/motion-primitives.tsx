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
      aria-label="Your knowledge base. Your AI team. Your work. Your AI workspace. Your Cabinet."
      className="max-w-[14ch] font-display text-[clamp(2.55rem,4vw,3.85rem)] leading-[1.02] tracking-[-0.04em] text-text-primary"
    >
      <span className="block">Your</span>
      <span className="relative block min-h-[1.02em] whitespace-nowrap">
        <span aria-hidden className="invisible block">
          Knowledge Base
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            aria-hidden
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 block"
          >
            {word === "Cabinet" ? <span className="font-brand italic">Cabinet</span> : word}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
