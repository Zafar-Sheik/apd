"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  borderRadius?: string;
  children: React.ReactNode;
  href?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Aceternity UI — Moving Border (rendered as a link)
export function MovingBorderButton({
  borderRadius = "999px",
  children,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <a
      className={cn("relative inline-block h-14 overflow-hidden bg-transparent p-[2px]", containerClassName)}
      style={{ borderRadius }}
      {...otherProps}
    >
      <span className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <span
            className={cn(
              "block h-20 w-20 bg-[radial-gradient(#ffffff_40%,transparent_60%)] opacity-90",
              borderClassName,
            )}
          />
        </MovingBorder>
      </span>
      <span
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-brand px-7 text-sm font-bold tracking-wide text-white uppercase antialiased",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </span>
    </a>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  // A hidden button's path isn't rendered, and the SVG length APIs throw on it.
  const totalLength = () => {
    try {
      return pathRef.current?.getTotalLength() ?? 0;
    } catch {
      return 0;
    }
  };

  useAnimationFrame((time) => {
    const length = totalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const point = (val: number) =>
    pathRef.current && totalLength() > 0 ? pathRef.current.getPointAtLength(val) : { x: 0, y: 0 };
  const x = useTransform(progress, (val) => point(val).x);
  const y = useTransform(progress, (val) => point(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.span style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.span>
    </>
  );
};
