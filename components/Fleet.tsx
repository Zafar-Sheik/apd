"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Scooter, Van } from "./Art";

gsap.registerPlugin(ScrollTrigger);

const fleet = {
  bike: {
    name: "The Bike",
    kicker: "Two wheels",
    blurb: "Slips through traffic and parks anywhere. Our go-to for anything that fits in the box.",
    specs: [
      ["Best for", "Documents, envelopes, small parcels"],
      ["Superpower", "Beats the traffic"],
      ["Ideal run", "Quick hops across town"],
    ],
  },
  van: {
    name: "The Van",
    kicker: "Four wheels",
    blurb: "Room for the big stuff. Bulk orders, bulky boxes and multi-drop routes in one go.",
    specs: [
      ["Best for", "Large boxes, bulk & multi-drop"],
      ["Superpower", "Fits what bikes can't"],
      ["Ideal run", "Business collections"],
    ],
  },
} as const;

type Key = keyof typeof fleet;

export default function Fleet() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Key>("bike");
  const busy = useRef(false);
  const { contextSafe } = useGSAP(
    () => {
      gsap.from(".fleet__stage", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".fleet__stage", start: "top 80%" },
      });
      gsap.from(".fleet__veh--bike", {
        xPercent: -150,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.6,
        scrollTrigger: { trigger: ".fleet__stage", start: "top 80%" },
      });
      gsap.set(".fleet__veh--van", { xPercent: -200, autoAlpha: 0 });
      gsap.to(".fleet__ground", { backgroundPositionX: "-=200px", duration: 0.8, ease: "none", repeat: -1 });
    },
    { scope: root },
  );

  const swap = contextSafe((next: Key) => {
    if (next === active || busy.current) return;
    busy.current = true;
    const out = `.fleet__veh--${active}`;
    const inn = `.fleet__veh--${next}`;
    gsap
      .timeline({ onComplete: () => void (busy.current = false) })
      .to(out, { xPercent: 220, duration: 0.7, ease: "power3.in" })
      .to(`${out} .wheel`, { transformOrigin: "50% 50%", rotate: "+=540", duration: 0.7, ease: "power3.in" }, 0)
      .to(".fleet__info > *", { y: -20, autoAlpha: 0, stagger: 0.04, duration: 0.3 }, 0)
      .add(() => setActive(next))
      .set(out, { autoAlpha: 0 })
      .fromTo(inn, { xPercent: -220, autoAlpha: 1 }, { xPercent: 0, duration: 1, ease: "expo.out" })
      .fromTo(`${inn} .wheel`, { transformOrigin: "50% 50%", rotate: -720 }, { rotate: 0, duration: 1, ease: "expo.out" }, "<")
      .fromTo(".fleet__info > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6 }, "<0.2");
  });

  const v = fleet[active];

  return (
    <section ref={root} id="fleet" className="fleet">
      <div className="wrap fleet__grid">
        <div>
          <span className="mono eyebrow">The fleet</span>
          <h2 className="h2">
            Pick your
            <br />
            <span className="red">ride.</span>
          </h2>
          <div className="toggle" role="tablist" aria-label="Vehicle">
            {(Object.keys(fleet) as Key[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={active === k}
                className={active === k ? "on" : ""}
                onClick={() => swap(k)}
              >
                {k === "bike" ? "Bike" : "Van"}
              </button>
            ))}
            <i className={`toggle__pill toggle__pill--${active}`} />
          </div>
          <div className="fleet__info">
            <span className="mono">{v.kicker}</span>
            <h3>{v.name}</h3>
            <p>{v.blurb}</p>
            <dl>
              {v.specs.map(([k, val]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="fleet__stage" data-cursor={active === "bike" ? "Vroom" : "Honk"}>
          <span className="fleet__bigword" aria-hidden="true">
            {active === "bike" ? "BIKE" : "VAN"}
          </span>
          <div className="fleet__veh fleet__veh--bike">
            <Scooter />
          </div>
          <div className="fleet__veh fleet__veh--van">
            <Van />
          </div>
          <div className="fleet__ground" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
