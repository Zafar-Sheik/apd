"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socials } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { ...socials.parcelsInstagram, what: "Parcel deliveries" },
  { ...socials.washInstagram, what: "Mobile car wash" },
  { ...socials.tiktok, what: "Videos" },
];

export default function Socials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".social", {
        yPercent: 60,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".socials__list", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="socials">
      <div className="wrap">
        <span className="mono eyebrow">Follow us</span>
        <div className="socials__list">
          {rows.map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="social" data-cursor="Follow">
              <span className="social__fill" aria-hidden="true" />
              <span className="mono social__net">{r.label}</span>
              <span className="social__handle">{r.handle}</span>
              <span className="social__what mono">{r.what}</span>
              <span className="social__arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
