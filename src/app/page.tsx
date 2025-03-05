import Core from "@/components/landing/Core";
import HasilInspeksi from "@/components/landing/HasilInspeksi";
import Hero from "@/components/landing/Hero";
import "./globals.css";
import HowTo from "@/components/landing/HowTo";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <HowTo />
      <Core />
      <HasilInspeksi />
    </div>
  );
}
