"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Car, Scooter } from "./Art";
import { deliveryPoints, sendables, washPoints } from "@/lib/brand";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".services__head .reveal > span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".services__head", start: "top 80%" },
      });
      gsap.from(".panel", {
        y: 120,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".panels", start: "top 85%" },
      });

      // Each panel's art drifts with the pointer while hovered.
      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
        const art = panel.querySelector(".panel__art");
        const ax = gsap.quickTo(art, "x", { duration: 0.8, ease: "power3" });
        const ay = gsap.quickTo(art, "y", { duration: 0.8, ease: "power3" });
        panel.addEventListener("pointermove", (e) => {
          const r = panel.getBoundingClientRect();
          ax(((e.clientX - r.left) / r.width - 0.5) * 50);
          ay(((e.clientY - r.top) / r.height - 0.5) * 30);
        });
        panel.addEventListener("pointerleave", () => {
          ax(0);
          ay(0);
        });
        panel.addEventListener("pointerenter", () => {
          gsap.fromTo(
            panel.querySelectorAll(".wheel"),
            { rotate: 0, transformOrigin: "50% 50%" },
            { rotate: 360, duration: 0.9, ease: "power2.out" },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="services">
      <div className="wrap services__head">
        <span className="mono eyebrow">What we do</span>
        <h2 className="h2">
          <span className="reveal"><span>Two services.</span></span>
          <span className="reveal"><span className="red">One local team.</span></span>
        </h2>
      </div>

      <div className="panels wrap">
        <article className="panel panel--black">
          <span className="mono panel__top">Parcel delivery</span>
          <h3 className="panel__title">
            Send a
            <br />
            parcel
          </h3>
          <p className="panel__lede">Collected from you and taken straight to the address.</p>
          <ul className="panel__points">
            {deliveryPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Scooter className="panel__art" />
          <a href="#book" className="btn btn--red" data-book="parcel">
            Send a parcel
          </a>
        </article>

        <article className="panel panel--red">
          <span className="mono panel__top">Mobile car wash</span>
          <h3 className="panel__title">
            Wash my
            <br />
            car
          </h3>
          <p className="panel__lede">We bring everything and wash your car where it&apos;s parked.</p>
          <ul className="panel__points">
            {washPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Car className="panel__art" id="panel-car" />
          <a href="#book" className="btn btn--black" data-book="wash">
            Book a car wash
          </a>
        </article>
      </div>

      <div className="sendables">
        <div className="wrap sendables__head">
          <span className="mono eyebrow">What we deliver</span>
        </div>
        <InfiniteMovingCards items={sendables} speed="slow" />
      </div>
    </section>
  );
}
