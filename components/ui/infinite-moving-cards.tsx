"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type MovingCard = { title: string; copy: string; tag: string };

// Aceternity UI — Infinite Moving Cards. Items render twice so the loop is seamless.
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: MovingCard[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

  return (
    <div
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
      style={
        {
          "--animation-duration": duration,
          "--animation-direction": direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties
      }
    >
      <ul
        className={cn(
          "animate-scroll flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={idx}
            aria-hidden={idx >= items.length}
            className="relative w-[300px] max-w-full shrink-0 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#1c1c1c,#0f0f0f)] px-7 py-6 md:w-[380px]"
          >
            <span className="inline-block rounded-full bg-brand px-3 py-1 font-mono-ui text-[11px] tracking-widest text-white uppercase">
              {item.tag}
            </span>
            <h4 className="mt-4 font-anton text-3xl text-white uppercase">{item.title}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">{item.copy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
