"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconArrowUp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconCar,
  IconPackage,
  IconRoute,
} from "@tabler/icons-react";
import { FloatingDock, type DockItem } from "./ui/floating-dock";
import { socials } from "@/lib/brand";

const icon = "h-full w-full";

const items: DockItem[] = [
  { title: "Send a parcel", icon: <IconPackage className={icon} />, href: "#book" },
  { title: "Car wash", icon: <IconCar className={icon} />, href: "#wash" },
  { title: "How it works", icon: <IconRoute className={icon} />, href: "#journey" },
  { title: "Parcels Instagram", icon: <IconBrandInstagram className={icon} />, href: socials.parcelsInstagram.href, external: true },
  { title: "Car wash Instagram", icon: <IconBrandInstagram className={icon} />, href: socials.washInstagram.href, external: true },
  { title: "TikTok", icon: <IconBrandTiktok className={icon} />, href: socials.tiktok.href, external: true },
  { title: "Back to top", icon: <IconArrowUp className={icon} />, href: "#top" },
];

/** Quick-action dock that appears once the visitor scrolls past the hero. */
export default function Dock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 200;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="dock"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <FloatingDock items={items} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
