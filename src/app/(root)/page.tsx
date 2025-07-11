import { NavbarDemo } from "../nav";
import Features from "./_components/Features";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";

export default function Home() {
  return (
    <div>
      <NavbarDemo />
      <div>
        <Hero />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Testimonials />
      </div>
    </div>
  );
}
