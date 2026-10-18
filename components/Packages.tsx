"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { washPackages } from "@/lib/brand";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

gsap.registerPlugin(ScrollTrigger);

export default function Packages() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".pkg-wrap", {
        y: 120,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".pkgs", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="packages">
      <div className="wrap">
        <div className="packages__head">
          <span className="mono eyebrow">Car wash packages</span>
          <h2 className="h2">Pick a package</h2>
          <p className="packages__sub">Not sure which one? Message us and we&apos;ll help you choose.</p>
        </div>
        <div className="pkgs">
          {washPackages.map((p) => {
            const featured = "featured" in p && p.featured;
            return (
              <div className="pkg-wrap" key={p.name}>
                <CardContainer className="w-full" containerClassName="w-full">
                  <CardBody className={`pkg ${featured ? "pkg--featured" : ""}`}>
                    <CardItem translateZ={30} className="pkg__tag mono">
                      {p.tag}
                    </CardItem>
                    <CardItem as="h3" translateZ={60}>
                      {p.name}
                    </CardItem>
                    <CardItem as="ul" translateZ={40} className="w-full">
                      {p.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </CardItem>
                    <CardItem translateZ={50} className="pkg__cta-wrap w-full">
                      <a href="#book" className="pkg__cta" data-book="wash" data-package={p.name}>
                        Book {p.name.toLowerCase()} <span>→</span>
                      </a>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
