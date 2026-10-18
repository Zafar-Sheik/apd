"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { washPackages } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function Packages() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pkg", {
        y: 140,
        rotate: (i) => (i - 1) * 6,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".pkgs", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".pkg").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(((e.clientY - r.top) / r.height - 0.5) * -14);
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
        card.addEventListener("pointerleave", () => {
          rx(0);
          ry(0);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="packages">
      <div className="wrap">
        <div className="packages__head">
          <span className="mono eyebrow">Wash packages</span>
          <h2 className="h2">
            Choose your <span className="red">clean.</span>
          </h2>
        </div>
        <div className="pkgs">
          {washPackages.map((p, i) => (
            <article key={p.name} className={`pkg ${"featured" in p && p.featured ? "pkg--featured" : ""}`}>
              <div className="pkg__top">
                <span className="mono">0{i + 1}</span>
                <span className="pkg__tag mono">{p.tag}</span>
              </div>
              <h3>{p.name}</h3>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <a href="#book" className="pkg__cta">
                Get a quote <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
