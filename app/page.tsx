import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import Fleet from "@/components/Fleet";
import Wash from "@/components/Wash";
import Packages from "@/components/Packages";
import Reasons from "@/components/Reasons";
import Booking from "@/components/Booking";
import Socials from "@/components/Socials";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee items={["Bikes", "Vans", "Same-day", "Door to door", "Car wash", "We come to you"]} />
        <Services />
        <Journey />
        <Fleet />
        <Wash />
        <Packages />
        <Reasons />
        <Booking />
        <Socials />
      </main>
      <Footer />
      <Dock />
    </>
  );
}
