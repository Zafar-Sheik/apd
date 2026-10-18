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
import Booking from "@/components/Booking";
import Socials from "@/components/Socials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee items={["Bikes", "Vans", "Same-day", "Door to door", "Foam", "Shine", "We come to you"]} />
        <Services />
        <Journey />
        <Fleet />
        <Wash />
        <Packages />
        <Marquee dark reverse items={["Book a drop", "Book a wash", "DM us", "Red", "Black", "White", "APD"]} />
        <Booking />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
