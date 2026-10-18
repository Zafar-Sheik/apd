"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type Tab<T extends string> = { value: T; title: string };

// Aceternity UI — Animated Tabs (pill follows the active tab)
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  layoutId,
  label,
  className,
  light,
}: {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
  label: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "relative inline-flex flex-row items-center gap-1 rounded-full p-1.5",
        light ? "bg-black/10" : "border border-white/10 bg-ink",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative min-w-[120px] rounded-full px-5 py-3 text-sm font-bold tracking-wide uppercase transition-colors",
              active ? "text-white" : light ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 rounded-full bg-brand"
              />
            )}
            <span className="relative block">{tab.title}</span>
          </button>
        );
      })}
    </div>
  );
}
