// All site copy that is likely to change lives here.

export const socials = {
  parcelsInstagram: {
    label: "Instagram",
    handle: "@aboos_parcel_deliveries",
    href: "https://www.instagram.com/aboos_parcel_deliveries/",
  },
  washInstagram: {
    label: "Instagram",
    handle: "@apd_mobilecarwash",
    href: "https://www.instagram.com/apd_mobilecarwash/",
  },
  tiktok: {
    label: "TikTok",
    handle: "@aboosparceldeliveries",
    href: "https://www.tiktok.com/@aboosparceldeliveries",
  },
} as const;

export const deliveryPoints = ["Bike for small parcels", "Van for big or bulk orders", "Same-day when you need it"];

export const washPoints = ["We come to your home or work", "Inside, outside or both", "Washed and dried by hand"];

export const sendables = [
  { tag: "Bike", title: "Documents", copy: "Contracts, letters and anything that needs a signature." },
  { tag: "Bike", title: "Small parcels", copy: "Online orders, gifts and things that fit in our box." },
  { tag: "Van", title: "Large boxes", copy: "Too big for a bike? The van takes it." },
  { tag: "Van", title: "Bulk orders", copy: "Several boxes or several stops in one trip." },
  { tag: "Bike or van", title: "Shop orders", copy: "Regular pickups for shops and online sellers." },
  { tag: "Bike or van", title: "Same-day", copy: "Message us early and it can arrive today." },
];

export const washPackages = [
  {
    name: "Exterior",
    tag: "Outside",
    items: ["Hand wash and rinse", "Wheels and tyres", "Outside windows", "Tyre shine"],
  },
  {
    name: "Interior",
    tag: "Inside",
    items: ["Full vacuum", "Dashboard and console", "Inside windows", "Mats cleaned"],
  },
  {
    name: "Full valet",
    tag: "Most popular",
    featured: true,
    items: ["Everything in Exterior", "Everything in Interior", "Door frames and trims", "Final detailing"],
  },
];

export const journey = [
  { n: "01", title: "Message us", copy: "Tell us where to collect, where it's going and what it is." },
  { n: "02", title: "We collect", copy: "A bike or van comes to you." },
  { n: "03", title: "On the way", copy: "Straight to the address. No depots in between." },
  { n: "04", title: "Delivered", copy: "Handed over, and we let you know." },
];

export const reasons = [
  { title: "Local team", description: "You deal with the same people every time." },
  { title: "Direct delivery", description: "Your parcel goes straight from A to B." },
  { title: "Right vehicle", description: "Bike for speed, van for size." },
  { title: "We come to you", description: "Car washed where it's parked. No queues." },
  { title: "Easy booking", description: "Send one message on Instagram. That's it." },
  { title: "Clear updates", description: "We tell you when it's collected and delivered." },
];
