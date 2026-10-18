"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type HoverItem = { title: string; description: string; icon?: React.ReactNode };

// Aceternity UI — Card Hover Effect
export const HoverEffect = ({ items, className }: { items: HoverItem[]; className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-brand/90"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-white group-hover:text-brand">
                {item.icon}
              </span>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink p-6 group-hover:border-transparent",
      className,
    )}
  >
    {children}
  </div>
);

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h4 className={cn("text-xl font-bold tracking-wide text-white", className)}>{children}</h4>
);

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={cn("mt-2 text-[15px] leading-relaxed text-white/70", className)}>{children}</p>
);
