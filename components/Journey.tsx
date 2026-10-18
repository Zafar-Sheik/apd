"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParcelIcon, Scooter } from "./Art";
import { journey } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".journey__track")!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".journey__pin",
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(journey.length - 1, Math.floor(self.progress * journey.length));
              root.current!.querySelectorAll(".journey__dots li").forEach((d, k) => d.classList.toggle("on", k <= i));
            },
          },
        });

        tl.to(track, { x: () => -distance(), ease: "none" }, 0)
          .to(".journey__rider", { x: () => window.innerWidth * 0.55, ease: "none" }, 0)
          .to(".journey__rider .wheel", { transformOrigin: "50% 50%", rotate: 360 * 14, ease: "none" }, 0)
          .to(".journey__fill", { scaleX: 1, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
          gsap.from(step.querySelectorAll(".step__n, .step__title, .step__copy"), {
            y: 80,
            autoAlpha: 0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: step, containerAnimation: tl, start: "left 85%", end: "left 45%", scrub: true },
          });
        });

        gsap.from(".journey__stamp", {
          scale: 2.8,
          rotate: -30,
          autoAlpha: 0,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".journey__end",
            containerAnimation: tl,
            start: "left 70%",
            toggleActions: "play none none reverse",
          },
        });
      });

      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>(".step, .journey__end").forEach((el) =>
          gsap.from(el, { y: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="journey" className="journey">
      <div className="journey__pin">
        <div className="journey__head wrap">
          <span className="mono eyebrow">How delivery works</span>
          <ol className="journey__dots mono">
            {journey.map((s) => (
              <li key={s.n}>{s.n}</li>
            ))}
          </ol>
        </div>

        <div className="journey__track">
          <div className="journey__intro">
            <h2 className="h2">
              Your door
              <br />
              <span className="outline">to theirs.</span>
            </h2>
            <p>Four simple steps. Scroll to follow →</p>
          </div>
          {journey.map((s) => (
            <article className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__copy">{s.copy}</p>
            </article>
          ))}
          <div className="journey__end">
            <div className="journey__stamp">
              <ParcelIcon className="journey__stampicon" />
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="journey__road" aria-hidden="true">
          <i className="journey__fill" />
        </div>
        <div className="journey__rider" aria-hidden="true">
          <Scooter />
        </div>
      </div>
    </section>
  );
}
