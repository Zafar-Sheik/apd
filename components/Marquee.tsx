"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = { items: string[]; dark?: boolean; reverse?: boolean };

/** Infinite ticker whose speed and direction react to scroll velocity. */
export default function Marquee({ items, dark, reverse }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current!.querySelector<HTMLElement>(".marquee__track")!;
      const stars = root.current!.querySelectorAll(".marquee__star");
      const half = () => track.scrollWidth / 2;
      let x = 0;
      let dir = reverse ? 1 : -1;
      let boost = 0;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = (reverse ? -1 : 1) * -self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 120, 18);
        },
      });

      const tick = (_t: number, dt: number) => {
        boost *= 0.92;
        x += dir * (1 + boost) * dt * 0.06;
        const w = half();
        x = gsap.utils.wrap(-w, 0, x);
        gsap.set(track, { x });
        gsap.set(stars, { rotate: x * 0.6 });
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );

  const row = (key: string) => (
    <div className="marquee__row" key={key} aria-hidden={key === "b"}>
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <svg className="marquee__star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`marquee ${dark ? "marquee--dark" : ""}`}>
      <div className="marquee__track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
