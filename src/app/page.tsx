import Core from "@/components/landing/Core";
import HasilInspeksi from "@/components/landing/HasilInspeksi";
import Hero from "@/components/landing/Hero";
import "./globals.css";
import HowTo from "@/components/landing/HowTo";
import Slogan from "@/components/landing/Slogan";
import About from "@/components/landing/About";

export default function Home() {
  return (
    <div className="w-full relative">
      <Hero />
      <Slogan />
      <About />
      <HowTo />
      <Core />
      <HasilInspeksi />
    </div>
  );
}
