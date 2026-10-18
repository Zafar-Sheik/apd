import {
  IconBike,
  IconBrandInstagram,
  IconBell,
  IconMapPin,
  IconRoute,
  IconUsers,
} from "@tabler/icons-react";
import { reasons } from "@/lib/brand";
import { HoverEffect } from "./ui/card-hover-effect";

const icons = [IconUsers, IconRoute, IconBike, IconMapPin, IconBrandInstagram, IconBell];

export default function Reasons() {
  return (
    <section className="reasons">
      <div className="wrap">
        <span className="mono eyebrow">Why APD</span>
        <h2 className="h2">
          Simple, local, <span className="red">reliable.</span>
        </h2>
        <HoverEffect
          className="reasons__grid"
          items={reasons.map((r, i) => {
            const Icon = icons[i];
            return { ...r, icon: <Icon size={22} stroke={1.8} /> };
          })}
        />
      </div>
    </section>
  );
}
