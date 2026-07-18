"use client";

// Vendored from Lightswind UI (lightswind.com, MIT) with two local changes:
// children may contain styled <span>s and <br/>s (the stock version only
// splits plain strings), and there is no clsx/tailwind-merge dependency.

import React, { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ponytail: naive class join instead of tailwind-merge; textClassName fully
// replaces the built-in size/align/variant classes so nothing conflicts.
const cn = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Custom container className */
  containerClassName?: string;
  /** Custom text className. When set, replaces size/align/variant classes. */
  textClassName?: string;
  /** Enable blur animation effect */
  enableBlur?: boolean;
  /** Base opacity when text is out of view */
  baseOpacity?: number;
  /** Base rotation angle in degrees */
  baseRotation?: number;
  /** Blur strength in pixels */
  blurStrength?: number;
  /** Animation delay between words in seconds */
  staggerDelay?: number;
  /** Viewport threshold for triggering animation */
  threshold?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Spring animation configuration */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Overrides the built-in in-view detection. Useful inside pinned scenes
      where the element is always in the viewport but hidden until its beat. */
  revealed?: boolean;
  /** Text size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Color variant */
  variant?: "default" | "muted" | "accent" | "primary";
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
};

type Piece =
  | { kind: "word" | "space"; value: string; className?: string; key: number }
  | { kind: "break"; key: number };

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = {
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  revealed,
  size = "lg",
  align = "left",
  variant = "default",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    amount: threshold,
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [baseRotation, 0, 0],
  );

  // Flatten children (strings, styled spans, <br/>) into animatable pieces.
  const pieces = useMemo(() => {
    const out: Piece[] = [];
    let key = 0;
    const walk = (node: React.ReactNode, className?: string) => {
      React.Children.forEach(node, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          for (const part of String(child).split(/(\s+)/)) {
            if (!part) continue;
            out.push({
              kind: /^\s+$/.test(part) ? "space" : "word",
              value: part,
              className,
              key: key++,
            });
          }
        } else if (React.isValidElement(child)) {
          if (child.type === "br") {
            out.push({ kind: "break", key: key++ });
          } else {
            const props = child.props as {
              className?: string;
              children?: React.ReactNode;
            };
            walk(props.children, cn(className, props.className));
          }
        }
      });
    };
    walk(children);
    return out;
  }, [children]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        ...springConfig,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate: rotation }}
      className={cn("transform-gpu", containerClassName)}
    >
      <motion.p
        className={
          textClassName ??
          cn(
            "leading-relaxed font-semibold",
            sizeClasses[size],
            alignClasses[align],
            variantClasses[variant],
          )
        }
        variants={containerVariants}
        initial="hidden"
        animate={(revealed ?? isInView) ? "visible" : "hidden"}
      >
        {pieces.map((item) =>
          item.kind === "break" ? (
            <br key={item.key} />
          ) : item.kind === "space" ? (
            <span key={item.key}>{item.value}</span>
          ) : (
            <motion.span
              key={item.key}
              className={cn("inline-block", item.className)}
              variants={wordVariants}
            >
              {item.value}
            </motion.span>
          ),
        )}
      </motion.p>
    </motion.div>
  );
}

export default ScrollReveal;
