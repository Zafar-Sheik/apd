"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "#services", label: "Services" },
  { href: "#journey", label: "How it works" },
  { href: "#fleet", label: "Fleet" },
  { href: "#wash", label: "Car wash" },
  { href: "#book", label: "Book" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.to(".progress i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      const hide = gsap.to(root.current, { yPercent: -120, duration: 0.4, ease: "power3.inOut", paused: true });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          root.current?.classList.toggle("nav--solid", self.scroll() > 40);
          if (self.scroll() < 200) hide.reverse();
          else if (self.direction === 1) hide.play();
          else hide.reverse();
        },
      });
    },
    { scope: root },
  );

  useGSAP(() => {
    if (open) {
      gsap.fromTo(
        ".menu a",
        { yPercent: 120 },
        { yPercent: 0, stagger: 0.06, duration: 0.7, ease: "power4.out", delay: 0.15 },
      );
    }
  }, [open]);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i />
      </div>
      <header ref={root} className="nav">
        <a href="#top" className="nav__logo" aria-label="APD home">
          <b>APD</b>
          <span className="mono">Parcels · Wash</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="ulink">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#book" className="btn btn--red btn--sm nav__cta">
          Book now
        </a>
        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <i />
          <i />
        </button>
      </header>
      <div className={`menu ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
        {links.map((l) => (
          <span key={l.href} className="menu__item">
            <a href={l.href}>{l.label}</a>
          </span>
        ))}
      </div>
    </>
  );
}
