"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

interface FadeUpProps {
  children: React.ReactNode;
  trigger?: "scroll" | "mount";
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  type?: "div" | "section" | "article" | "span";
  className?: string;
}

export default function FadeUp({
  children,
  trigger = "scroll",
  delay = 0,
  duration = 0.6,
  y = 24,
  blur = false,
  type: Tag = "div",
  className,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const shouldAnimate = trigger === "mount" ? true : isInView;

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
