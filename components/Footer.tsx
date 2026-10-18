"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socials } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer__big span", {
        yPercent: 100,
        stagger: 0.08,
        ease: "power4.out",
        duration: 1.2,
        scrollTrigger: { trigger: ".footer__big", start: "top 95%" },
      });

      // Letters lean toward the pointer.
      const letters = gsap.utils.toArray<HTMLElement>(".footer__big span");
      const move = (e: PointerEvent) => {
        letters.forEach((l) => {
          const r = l.getBoundingClientRect();
          const d = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
          gsap.to(l, { skewX: d * -18, scaleY: 1 + Math.max(0, 0.18 - Math.abs(d)) , duration: 0.6, ease: "power3" });
        });
      };
      root.current!.addEventListener("pointermove", move);
      return () => root.current?.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="footer">
      <div className="wrap footer__top">
        <div>
          <span className="mono eyebrow">Ready when you are</span>
          <p className="footer__line">
            Parcels on the move.
            <br />
            Cars on the shine.
          </p>
        </div>
        <div className="footer__links">
          {Object.values(socials).map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="ulink">
              {s.label} {s.handle}
            </a>
          ))}
          <a href="#top" className="ulink">
            Back to top ↑
          </a>
        </div>
      </div>
      <div className="footer__big" aria-hidden="true">
        {"APD".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <div className="wrap footer__bottom mono">
        <span>© {new Date().getFullYear()} Aboo&apos;s Parcel Deliveries</span>
        <span>Bikes · Vans · Buckets</span>
      </div>
    </footer>
  );
}
