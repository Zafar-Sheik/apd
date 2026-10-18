"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socials, washPackages } from "@/lib/brand";
import { Tabs } from "./ui/tabs";
import { BackgroundBeams } from "./ui/background-beams";
import { TextGenerateEffect } from "./ui/text-generate-effect";

gsap.registerPlugin(ScrollTrigger);

type Mode = "parcel" | "wash";

const sizes = ["Envelope", "Small box", "Large box", "Several items"];
const whens = ["As soon as possible", "Later today", "Tomorrow", "Another day"];
const vehicles = ["Hatchback", "Sedan", "SUV", "Van / Truck"];

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="field">
      <legend className="mono">{label}</legend>
      <div className="chips">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            className={`chip ${value === o ? "on" : ""}`}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
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
  const [copied, setCopied] = useState<"idle" | "ok" | "manual">("idle");

  // Any link with data-book="parcel|wash" opens the form on that tab.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-book]");
      if (!el) return;
      setMode(el.dataset.book === "wash" ? "wash" : "parcel");
      if (el.dataset.package) setPkg(el.dataset.package);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const message = useMemo(() => {
    if (mode === "parcel") {
      return [
        "Hi APD! I'd like to send a parcel.",
        `Collect from: ${from || "…"}`,
        `Deliver to: ${to || "…"}`,
        `Size: ${size}`,
        `When: ${when}`,
      ].join("\n");
    }
    return [
      "Hi APD! I'd like to book a car wash.",
      `Package: ${pkg}`,
      `Car: ${vehicle}`,
      `Address: ${where || "…"}`,
      `When: ${when}`,
    ].join("\n");
  }, [mode, from, to, size, when, pkg, vehicle, where]);

  useGSAP(
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("ok");
    } catch {
      setCopied("manual");
    }
    setTimeout(() => setCopied("idle"), 4000);
  };

  const dm = mode === "parcel" ? socials.parcelsInstagram : socials.washInstagram;

  return (
    <section ref={root} id="book" className="book">
      <BackgroundBeams />
      <div className="wrap book__grid">
        <div className="book__intro">
          <span className="mono eyebrow">Book</span>
          <h2 className="h2 book__title">
            <span className="reveal"><span>Book in</span></span>
            <span className="reveal"><span className="red">a minute.</span></span>
          </h2>
          <TextGenerateEffect
            className="book__copy"
            words="Fill in the form and we'll write your message. Send it to us on Instagram and we'll reply with a price."
          />
          <ol className="book__steps">
            <li>Fill in the details</li>
            <li>Tap the button to copy your message</li>
            <li>Paste it in our Instagram DMs</li>
          </ol>
        </div>

        <form className="book__card" onSubmit={(e) => e.preventDefault()}>
          <Tabs
            light
            className="book__tabs"
            label="What do you need?"
            layoutId="book-tab"
            value={mode}
            onChange={setMode}
            tabs={[
              { value: "parcel", title: "Send a parcel" },
              { value: "wash", title: "Car wash" },
            ]}
          />

          <div className="book__fields">
            {mode === "parcel" ? (
              <>
                <div className="field-row">
                  <label className="field" htmlFor="book-from">
                    <span className="mono">Collect from</span>
                    <input id="book-from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Street or area" />
                  </label>
                  <label className="field" htmlFor="book-to">
                    <span className="mono">Deliver to</span>
                    <input id="book-to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Street or area" />
                  </label>
                </div>
                <Chips label="Size" options={sizes} value={size} onChange={setSize} />
              </>
            ) : (
              <>
                <Chips label="Package" options={washPackages.map((p) => p.name)} value={pkg} onChange={setPkg} />
                <Chips label="Car" options={vehicles} value={vehicle} onChange={setVehicle} />
                <label className="field" htmlFor="book-where">
                  <span className="mono">Where is the car?</span>
                  <input id="book-where" value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Home or work address" />
                </label>
              </>
            )}
            <Chips label="When" options={whens} value={when} onChange={setWhen} />
          </div>

          <div className="book__preview">
            <span className="mono">Your message</span>
            <pre>{message}</pre>
          </div>

          <div className="book__actions">
            <button type="button" className="btn btn--black" onClick={copy}>
              {copied === "ok" ? "Copied ✓" : copied === "manual" ? "Select the text above to copy" : "1. Copy message"}
            </button>
            <a href={dm.href} target="_blank" rel="noreferrer" className="btn btn--red">
              2. Open Instagram
            </a>
          </div>
          <p className="book__handle mono">Sends to {dm.handle}</p>
        </form>
      </div>
    </section>
  );
}
