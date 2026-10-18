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

export const deliveryServices = [
  {
    title: "Bike courier",
    copy: "Envelopes, documents and small parcels zipped across town on two wheels. Built for traffic, built for speed.",
  },
  {
    title: "Van delivery",
    copy: "Bigger boxes, bulk drops and multi-stop runs. When it won't fit on a bike, the van takes it.",
  },
  {
    title: "Same-day runs",
    copy: "Need it there today? Message us, we collect, we deliver. No call centres, no runaround.",
  },
  {
    title: "Business drops",
    copy: "Regular collections for shops, online sellers and offices. One local crew you actually know.",
  },
];

export const washPackages = [
  {
    name: "Exterior",
    tag: "Quick shine",
    items: ["Hand wash & rinse", "Wheels & tyres", "Windows outside", "Tyre shine"],
  },
  {
    name: "Interior",
    tag: "Fresh inside",
    items: ["Full vacuum", "Dash & console wipe", "Windows inside", "Mats cleaned"],
  },
  {
    name: "Full valet",
    tag: "The works",
    featured: true,
    items: ["Everything in Exterior", "Everything in Interior", "Door shuts & trims", "Finishing detail"],
  },
];

export const journey = [
  { n: "01", title: "Message us", copy: "DM on Instagram or TikTok with your pickup, drop-off and what you're sending." },
  { n: "02", title: "We collect", copy: "A rider or van heads straight to you. Bike for small stuff, van for the big stuff." },
  { n: "03", title: "On the road", copy: "Your parcel goes direct. No depots, no sorting centres, no detours." },
  { n: "04", title: "Delivered", copy: "Handed over at the door, and we let you know the moment it lands." },
];
