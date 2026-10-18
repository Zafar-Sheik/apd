"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Car } from "./Art";

gsap.registerPlugin(ScrollTrigger);

const SPARKLES = [
  [18, 30], [34, 18], [52, 26], [70, 16], [84, 34], [26, 62], [76, 60], [60, 44],
];

export default function Wash() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stage = root.current!.querySelector<HTMLElement>(".wash__stage")!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".wash__pin",
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.8,
          },
        });

        tl.fromTo(".wash__dirty", { clipPath: "inset(0 0 0 0%)" }, { clipPath: "inset(0 0 0 100%)", ease: "none", duration: 1 }, 0)
          .fromTo(".wash__squeegee", { left: "0%" }, { left: "100%", ease: "none", duration: 1 }, 0)
          .fromTo(".wash__shine", { "--fill": "0%" }, { "--fill": "100%", ease: "none", duration: 1 }, 0)
          .fromTo(".wash__meter i", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0)
          .fromTo(
            ".wash__sparkle",
            { scale: 0, rotate: -90 },
            { scale: 1, rotate: 0, stagger: 0.02, duration: 0.15, ease: "back.out(3)" },
            0.95,
          )
          .to(".wash__glow", { autoAlpha: 1, duration: 0.2 }, 0.9);

        gsap.to(".wash__sparkle", { rotate: "+=45", repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
      });

      // Foam follows the pointer.
      let last = 0;
      const foam = (e: PointerEvent) => {
        const now = performance.now();
        if (now - last < 28) return;
        last = now;
        const r = stage.getBoundingClientRect();
        const b = document.createElement("span");
        b.className = "bubble";
        const size = gsap.utils.random(10, 38);
        stage.appendChild(b);
        gsap.set(b, { x: e.clientX - r.left, y: e.clientY - r.top, width: size, height: size, xPercent: -50, yPercent: -50 });
        gsap.fromTo(
          b,
          { scale: 0, autoAlpha: 0.9 },
          {
            scale: 1,
            x: `+=${gsap.utils.random(-40, 40)}`,
            y: `-=${gsap.utils.random(60, 160)}`,
            autoAlpha: 0,
            duration: gsap.utils.random(1, 1.8),
            ease: "power1.out",
            onComplete: () => b.remove(),
          },
        );
      };
      stage.addEventListener("pointermove", foam);

      // Ambient rising bubbles.
      gsap.utils.toArray<HTMLElement>(".wash__ambient span").forEach((b) => {
        gsap.set(b, { left: `${gsap.utils.random(0, 100)}%`, scale: gsap.utils.random(0.4, 1.2) });
        gsap.fromTo(
          b,
          { yPercent: 0, y: 0 },
          {
            y: () => -window.innerHeight * 1.1,
            x: `+=${gsap.utils.random(-60, 60)}`,
            duration: gsap.utils.random(6, 12),
            repeat: -1,
            delay: gsap.utils.random(0, 8),
            ease: "none",
          },
        );
      });

      return () => stage.removeEventListener("pointermove", foam);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="wash" className="wash">
      <div className="wash__pin">
        <div className="wash__ambient" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="wash__head wrap">
          <span className="mono eyebrow">APD Mobile Car Wash</span>
          <h2 className="h2 wash__title">
            From <span className="red">grime</span>
            <br />
            to{" "}
            <span className="wash__shine" data-text="shine.">
              shine.
            </span>
          </h2>
          <p className="wash__copy">
            Keep scrolling to wash it. Wiggle your cursor over the car for foam. We bring the water, the gear
            and the elbow grease — you just hand over the keys.
          </p>
        </div>

        <div className="wash__stage" data-cursor="Foam">
          <div className="wash__glow" aria-hidden="true" />
          <div className="wash__car">
            <Car id="wash-clean" />
            <div className="wash__dirty">
              <Car id="wash-dirty" dirty />
            </div>
            <div className="wash__squeegee" aria-hidden="true">
              <i />
            </div>
            {SPARKLES.map(([x, y], i) => (
              <svg
                key={i}
                className="wash__sparkle"
                style={{ left: `${x}%`, top: `${y}%` }}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
              </svg>
            ))}
          </div>
          <div className="wash__meter mono" aria-hidden="true">
            <span>Dirty</span>
            <b>
              <i />
            </b>
            <span>Spotless</span>
          </div>
        </div>
      </div>
    </section>
  );
}
