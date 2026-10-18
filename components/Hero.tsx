"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Scooter, Van } from "./Art";
import { useLoaded } from "./useLoaded";

gsap.registerPlugin(ScrollTrigger);

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span className="ch" key={i}>
          {c}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const loaded = useLoaded();

  // Static setup: hide intro elements, scroll-out and pointer interactions.
  useGSAP(
    () => {
      gsap.set(".hero .ch", { yPercent: 115 });
      gsap.set([".hero__meta > *", ".hero__foot > *"], { autoAlpha: 0, y: 24 });
      gsap.set(".hero__scooter", { xPercent: -260 });
      gsap.set(".hero__van", { xPercent: -330 });

      gsap.to(".hero__road", { backgroundPositionX: "-=240px", duration: 0.6, ease: "none", repeat: -1 });
      gsap.to(".hero__badge svg", { rotate: 360, duration: 14, ease: "none", repeat: -1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      tl.to(".hero__title", { yPercent: -35, scale: 0.92, autoAlpha: 0.15, ease: "none" }, 0)
        .to(".hero__vehicles", { x: () => window.innerWidth * 0.9, ease: "power1.in" }, 0)
        .to(".hero__vehicles .wheel", { transformOrigin: "50% 50%", rotate: 720, ease: "none" }, 0);

      // Pointer parallax.
      const px = gsap.quickTo(".hero__title", "x", { duration: 0.8, ease: "power3" });
      const vx = gsap.quickTo(".hero__parallax", "x", { duration: 1, ease: "power3" });
      const vy = gsap.quickTo(".hero__parallax", "y", { duration: 1, ease: "power3" });
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        px(nx * -24);
        vx(nx * 40);
        vy(ny * 14);
      };
      root.current!.addEventListener("pointermove", move);

      // Letters hop when hovered.
      const hop = (e: Event) => {
        const el = e.currentTarget as HTMLElement;
        if (gsap.isTweening(el)) return;
        gsap.fromTo(el, { y: 0 }, { y: "-0.12em", duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
        gsap.fromTo(el, { color: "#e10600" }, { color: "", duration: 0.8, delay: 0.1, clearProps: "color" });
      };
      const chars = gsap.utils.toArray<HTMLElement>(".hero .ch");
      chars.forEach((c) => c.addEventListener("pointerenter", hop));

      return () => {
        root.current?.removeEventListener("pointermove", move);
        chars.forEach((c) => c.removeEventListener("pointerenter", hop));
      };
    },
    { scope: root },
  );

  // Intro once the preloader clears.
  useGSAP(
    () => {
      if (!loaded) return;
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero .ch", { yPercent: 0, duration: 1.1, stagger: 0.035 })
        .to(".hero__meta > *", { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.8 }, 0.3)
        .to(".hero__foot > *", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 }, 0.6)
        .to(".hero__scooter", { xPercent: 0, duration: 1.6, ease: "expo.out" }, 0.2)
        .to(".hero__van", { xPercent: 0, duration: 1.9, ease: "expo.out" }, 0.4)
        .from(".hero__vehicles .wheel", { transformOrigin: "50% 50%", rotate: -1080, duration: 1.9, ease: "expo.out" }, 0.2)
        .add(() => {
          gsap.to(".hero__scooter svg", { y: -3, duration: 0.25, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".hero__van svg", { y: -2, duration: 0.32, yoyo: true, repeat: -1, ease: "sine.inOut" });
        });
    },
    { scope: root, dependencies: [loaded] },
  );

  return (
    <section ref={root} id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__meta wrap">
        <span className="mono">(01) Parcel deliveries</span>
        <span className="mono hide-sm">Bikes · Vans · Buckets</span>
        <span className="mono">(02) Mobile car wash</span>
      </div>

      <h1 className="hero__title" aria-label="Delivered. Detailed.">
        <span className="hero__line" aria-hidden="true">
          <Chars text="DELIVERED" />
          <span className="ch red">.</span>
        </span>
        <span className="hero__line hero__line--outline" aria-hidden="true">
          <Chars text="DETAILED" />
          <span className="ch red solid">.</span>
        </span>
      </h1>

      <div className="hero__foot wrap">
        <p className="hero__lede">
          Aboo&apos;s Parcel Deliveries gets your parcels across town by <b>bike</b> and <b>van</b> — and our
          mobile car wash brings the <b>shine</b> straight to your driveway.
        </p>
        <div className="hero__ctas">
          <a href="#book" className="btn btn--red" data-cursor="Send">
            Send a parcel
          </a>
          <a href="#wash" className="btn btn--ghost" data-cursor="Wash">
            Book a wash
          </a>
        </div>
        <a href="#services" className="hero__badge" aria-label="Scroll to services" data-cursor="Go">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="286" lengthAdjust="spacingAndGlyphs">
                SEND IT • WASH IT • SEND IT • WASH IT •
              </textPath>
            </text>
          </svg>
          <span>↓</span>
        </a>
      </div>

      <div className="hero__parallax" aria-hidden="true">
        <div className="hero__vehicles">
          <div className="hero__van">
            <Van />
          </div>
          <div className="hero__scooter">
            <span className="speedlines" />
            <Scooter />
          </div>
        </div>
      </div>
      <div className="hero__road" aria-hidden="true" />
    </section>
  );
}
