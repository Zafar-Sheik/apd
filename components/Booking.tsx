"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socials, washPackages } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

type Mode = "parcel" | "wash";

const sizes = ["Envelope", "Small box", "Large box", "Multiple items"];
const whens = ["ASAP", "Later today", "Tomorrow", "Pick a date"];
const vehicles = ["Hatchback", "Sedan", "SUV", "Van / Truck"];

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="chips">
      {options.map((o) => (
        <button key={o} type="button" className={`chip ${value === o ? "on" : ""}`} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function Booking() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("parcel");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [size, setSize] = useState(sizes[1]);
  const [when, setWhen] = useState(whens[0]);
  const [pkg, setPkg] = useState(washPackages[2].name);
  const [vehicle, setVehicle] = useState(vehicles[1]);
  const [where, setWhere] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    if (mode === "parcel") {
      return [
        "Hi APD! I'd like to send a parcel.",
        `Pickup: ${from || "…"}`,
        `Drop-off: ${to || "…"}`,
        `Size: ${size}`,
        `When: ${when}`,
      ].join("\n");
    }
    return [
      "Hi APD Mobile Car Wash! I'd like to book a wash.",
      `Package: ${pkg}`,
      `Vehicle: ${vehicle}`,
      `Location: ${where || "…"}`,
      `When: ${when}`,
    ].join("\n");
  }, [mode, from, to, size, when, pkg, vehicle, where]);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(".book__card", {
        y: 100,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".book__card", start: "top 85%" },
      });
      gsap.from(".book__title .reveal > span", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".book__title", start: "top 85%" },
      });
    },
    { scope: root },
  );

  const switchMode = contextSafe((m: Mode) => {
    if (m === mode) return;
    gsap.to(".book__fields", {
      autoAlpha: 0,
      x: m === "wash" ? -30 : 30,
      duration: 0.25,
      onComplete: () => {
        setMode(m);
        gsap.fromTo(".book__fields", { autoAlpha: 0, x: m === "wash" ? 30 : -30 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" });
      },
    });
  });

  const send = contextSafe(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard may be blocked; the message is still visible to copy by hand.
    }
    gsap.fromTo(".book__send", { scale: 0.94 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const href = mode === "parcel" ? socials.parcelsInstagram.href : socials.washInstagram.href;
    window.open(href, "_blank", "noopener");
  });

  return (
    <section ref={root} id="book" className={`book book--${mode}`}>
      <div className="wrap book__grid">
        <div>
          <span className="mono eyebrow">Book in 30 seconds</span>
          <h2 className="h2 book__title">
            <span className="reveal"><span>Let&apos;s get</span></span>
            <span className="reveal"><span className="red">moving.</span></span>
          </h2>
          <p className="book__copy">
            Build your request, we&apos;ll write the message. Hit send and it&apos;s copied — just paste it into
            our Instagram DMs and we&apos;ll come back to you with a quote.
          </p>
        </div>

        <div className="book__card">
          <div className="toggle toggle--light" role="tablist" aria-label="Booking type">
            <button role="tab" aria-selected={mode === "parcel"} className={mode === "parcel" ? "on" : ""} onClick={() => switchMode("parcel")}>
              Parcel
            </button>
            <button role="tab" aria-selected={mode === "wash"} className={mode === "wash" ? "on" : ""} onClick={() => switchMode("wash")}>
              Car wash
            </button>
            <i className={`toggle__pill toggle__pill--${mode === "parcel" ? "bike" : "van"}`} />
          </div>

          <div className="book__fields">
            {mode === "parcel" ? (
              <>
                <div className="field-row">
                  <label className="field">
                    <span className="mono">Pickup</span>
                    <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Street / area" />
                  </label>
                  <label className="field">
                    <span className="mono">Drop-off</span>
                    <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Street / area" />
                  </label>
                </div>
                <div className="field">
                  <span className="mono">What are you sending?</span>
                  <Chips options={sizes} value={size} onChange={setSize} />
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <span className="mono">Package</span>
                  <Chips options={washPackages.map((p) => p.name)} value={pkg} onChange={setPkg} />
                </div>
                <div className="field">
                  <span className="mono">Vehicle</span>
                  <Chips options={vehicles} value={vehicle} onChange={setVehicle} />
                </div>
                <label className="field">
                  <span className="mono">Where&apos;s the car?</span>
                  <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Home / office address" />
                </label>
              </>
            )}
            <div className="field">
              <span className="mono">When</span>
              <Chips options={whens} value={when} onChange={setWhen} />
            </div>
          </div>

          <div className="book__preview">
            <span className="mono">Your message</span>
            <pre>{message}</pre>
          </div>

          <button type="button" className="btn btn--red book__send" onClick={send} data-cursor="DM">
            {copied ? "Copied — paste in DMs ✓" : "Copy & open Instagram"}
          </button>
        </div>
      </div>
    </section>
  );
}
