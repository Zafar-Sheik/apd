"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
};
const highlight = "radial-gradient(75% 181.16% at 50% 50%, #e10600 0%, rgba(255, 255, 255, 0) 100%)";
const order: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

// Aceternity UI — Hover Border Gradient (rendered as a link)
export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setDirection((prev) => {
        const i = order.indexOf(prev);
        return order[clockwise ? (i - 1 + order.length) % order.length : (i + 1) % order.length];
      });
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [hovered, duration, clockwise]);

  return (
    <a
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full border border-white/20 bg-white/10 p-px decoration-clone transition duration-500 hover:bg-white/5",
        containerClassName,
      )}
      {...props}
    >
      <span
        className={cn(
          "z-10 flex h-[52px] w-auto items-center rounded-[inherit] bg-black px-7 text-sm font-bold tracking-wide text-white uppercase",
          className,
        )}
      >
        {children}
      </span>
      <motion.span
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{ background: hovered ? [movingMap[direction], highlight] : movingMap[direction] }}
        transition={{ ease: "linear", duration }}
      />
      <span className="absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-black" />
    </a>
  );
}
