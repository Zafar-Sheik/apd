"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ParcelIcon } from "./Art";

export const LOADED_EVENT = "apd:loaded";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const done = () => {
        document.documentElement.dataset.loaded = "true";
        window.dispatchEvent(new Event(LOADED_EVENT));
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(root.current, { display: "none" });
        done();
        return;
      }

      window.__lenis?.stop();
      const counter = { v: 0 };
      const num = root.current!.querySelector(".pre__num")!;

      gsap
        .timeline({
          onComplete: () => {
            window.__lenis?.start();
            gsap.set(root.current, { display: "none" });
          },
        })
        .from(".pre__word span", { yPercent: 110, stagger: 0.05, duration: 0.5, ease: "power4.out" })
        .to(counter, {
          v: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.2)
        .to(".pre__bar i", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.2)
        .to(".pre__parcel", { x: () => root.current!.querySelector<HTMLElement>(".pre__bar")!.clientWidth - 40, rotate: 360, duration: 0.9, ease: "power2.inOut" }, 0.2)
        .to(".pre__inner", { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power3.in" })
        .to(".pre__panel", { yPercent: -100, stagger: 0.1, duration: 0.9, ease: "expo.inOut" }, "-=0.2")
        .add(done, "-=0.6");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="pre" aria-hidden="true">
      <div className="pre__panel pre__panel--red" />
      <div className="pre__panel pre__panel--black">
        <div className="pre__inner">
          <div className="pre__word">
            {"APD".split("").map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
          <div className="pre__row">
            <span className="mono">Loading the van</span>
            <span className="pre__num mono">000</span>
          </div>
          <div className="pre__bar">
            <i />
            <ParcelIcon className="pre__parcel" />
          </div>
        </div>
      </div>
    </div>
  );
}
