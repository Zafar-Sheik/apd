"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { IconLayoutNavbarCollapse, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type DockItem = { title: string; icon: React.ReactNode; href: string; external?: boolean };

// Aceternity UI — Floating Dock
export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const linkProps = (item: DockItem) =>
  item.external ? { target: "_blank", rel: "noreferrer" } : {};

const FloatingDockMobile = ({ items, className }: { items: DockItem[]; className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="dock-nav" className="absolute right-0 bottom-full mb-3 flex flex-col items-end gap-2">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  {...linkProps(item)}
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center gap-3 rounded-full bg-paper pr-4 pl-1.5 text-sm font-semibold text-black shadow-lg"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                    <span className="h-4 w-4">{item.icon}</span>
                  </span>
                  {item.title}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close quick menu" : "Open quick menu"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_rgba(225,6,0,0.45)]"
      >
        {open ? <IconX className="h-6 w-6" /> : <IconLayoutNavbarCollapse className="h-6 w-6" />}
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }: { items: DockItem[]; className?: string }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl border border-white/10 bg-ink/80 px-4 pb-3 backdrop-blur-xl md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, external }: DockItem & { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const spring = { mass: 0.1, stiffness: 150, damping: 12 };
  const width = useSpring(useTransform(distance, [-150, 0, 150], [40, 76, 40]), spring);
  const height = useSpring(useTransform(distance, [-150, 0, 150], [40, 76, 40]), spring);
  const widthIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 38, 20]), spring);
  const heightIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 38, 20]), spring);

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} aria-label={title} {...linkProps({ title, icon, href, external })}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-9 left-1/2 w-fit rounded-md border border-white/10 bg-ink px-2 py-0.5 text-xs whitespace-pre text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
