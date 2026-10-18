"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity UI — Background Beams. Each beam is the same curve shifted along the diagonal.
const paths = Array.from({ length: 34 }, (_, i) => {
  const dx = i * 7;
  const dy = i * 8;
  return `M${-380 + dx} ${-189 - dy}C${-380 + dx} ${-189 - dy} ${-312 + dx} ${216 - dy} ${152 + dx} ${343 - dy}C${616 + dx} ${470 - dy} ${684 + dx} ${875 - dy} ${684 + dx} ${875 - dy}`;
});

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center", className)}>
      <svg
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d={paths.join("")} stroke="url(#beams-base)" strokeOpacity="0.08" strokeWidth="0.5" />
        {paths.map((path, index) => (
          <motion.path key={`path-${index}`} d={path} stroke={`url(#beam-${index})`} strokeOpacity="0.5" strokeWidth="0.5" />
        ))}
        <defs>
          {paths.map((_, index) => (
            <motion.linearGradient
              id={`beam-${index}`}
              key={`gradient-${index}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + ((index * 37) % 8)}%`],
              }}
              transition={{
                duration: 10 + ((index * 53) % 10),
                ease: "easeInOut",
                repeat: Infinity,
                delay: (index * 29) % 10,
              }}
            >
              <stop stopColor="#e10600" stopOpacity="0" />
              <stop stopColor="#e10600" />
              <stop offset="32.5%" stopColor="#ff5a4f" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </motion.linearGradient>
          ))}
          <radialGradient
            id="beams-base"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="#d4d4d4" />
            <stop offset="0.243243" stopColor="#d4d4d4" />
            <stop offset="0.43594" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
