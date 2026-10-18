"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Car, Scooter } from "./Art";
import { deliveryServices } from "@/lib/brand";

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
      gsap.from(".panel__list li", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".panels", start: "top 60%" },
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
          gsap.fromTo(panel.querySelectorAll(".wheel"), { transformOrigin: "50% 50%", rotate: 0 }, { rotate: 360, duration: 0.9, ease: "power2.out" });
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
          <span className="reveal"><span>Two crews.</span></span>
          <span className="reveal"><span className="red">One name.</span></span>
        </h2>
      </div>

      <div className="panels wrap">
        <article className="panel panel--black" data-cursor="Send">
          <div className="panel__top">
            <span className="mono">01 / Deliveries</span>
            <span className="mono">@aboos_parcel_deliveries</span>
          </div>
          <h3 className="panel__title">
            Parcel
            <br />
            Deliveries
          </h3>
          <ul className="panel__list">
            {deliveryServices.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span>{s.copy}</span>
              </li>
            ))}
          </ul>
          <Scooter className="panel__art" />
          <a href="#book" className="btn btn--red">
            Send a parcel
          </a>
        </article>

        <article className="panel panel--red" data-cursor="Wash">
          <div className="panel__top">
            <span className="mono">02 / Car wash</span>
            <span className="mono">@apd_mobilecarwash</span>
          </div>
          <h3 className="panel__title">
            Mobile
            <br />
            Car Wash
          </h3>
          <ul className="panel__list">
            <li>
              <b>We come to you</b>
              <span>Home, office or wherever you&apos;re parked. You carry on with your day.</span>
            </li>
            <li>
              <b>Inside & out</b>
              <span>From a quick exterior shine to a full valet that makes it feel brand new.</span>
            </li>
            <li>
              <b>Hand-finished</b>
              <span>Washed, dried and detailed by hand — no brushes scratching your paint.</span>
            </li>
          </ul>
          <Car className="panel__art" id="panel-car" />
          <a href="#wash" className="btn btn--black">
            Book a wash
          </a>
        </article>
      </div>
    </section>
  );
}
