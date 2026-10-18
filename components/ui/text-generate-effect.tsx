"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Text Generate Effect (starts when scrolled into view)
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (!inView) return;
    animate("span", { opacity: 1, filter: filter ? "blur(0px)" : "none" }, { duration, delay: stagger(0.06) });
  }, [inView, animate, filter, duration]);

  return (
    <p ref={scope} className={cn(className)}>
      {words.split(" ").map((word, idx) => (
        <motion.span key={word + idx} className="opacity-0" style={{ filter: filter ? "blur(10px)" : "none" }}>
          {word}{" "}
        </motion.span>
      ))}
    </p>
  );
};
