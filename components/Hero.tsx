"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Scooter, Van } from "./Art";
import { useLoaded } from "./useLoaded";
import { Spotlight } from "./ui/spotlight";
import { FlipWords } from "./ui/flip-words";
import { MovingBorderButton } from "./ui/moving-border";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

gsap.registerPlugin(ScrollTrigger);

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span className="ch" key={i}>
          {c === " " ? "\u00a0" : c}
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
      {loaded && <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#e10600" />}
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__meta wrap">
        <span className="mono">Parcel delivery</span>
        <span className="mono hide-sm">Bikes · Vans · Car wash</span>
        <span className="mono">Mobile car wash</span>
      </div>

      <h1 className="hero__title" aria-label="We deliver. We wash.">
        <span className="hero__line" aria-hidden="true">
          <Chars text="WE DELIVER" />
          <span className="ch red">.</span>
        </span>
        <span className="hero__line hero__line--outline" aria-hidden="true">
          <Chars text="WE WASH" />
          <span className="ch red solid">.</span>
        </span>
      </h1>

      <div className="hero__foot wrap">
        <p className="hero__lede">
          Parcels delivered by bike and van. A car wash that comes to{" "}
          <FlipWords words={["your home.", "your office.", "you."]} className="font-bold text-white" />
        </p>
        <div className="hero__ctas">
          <MovingBorderButton href="#book" duration={3500} data-cursor="Send" data-book="parcel">
            Send a parcel
          </MovingBorderButton>
          <HoverBorderGradient href="#book" data-cursor="Wash" data-book="wash">
            Book a car wash
          </HoverBorderGradient>
        </div>
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
