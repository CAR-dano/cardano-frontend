"use client";

import Core from "@/components/landing/Core";
import HasilInspeksi from "@/components/landing/HasilInspeksi";
import Hero from "@/components/landing/Hero";
import HowTo from "@/components/landing/HowTo";
import Slogan from "@/components/landing/Slogan";
import About from "@/components/landing/About";
import { Layout } from "@/components/layout";
import BackToTop from "@/components/landing/BackToTop";

export default function Home() {
  return (
    <div className="w-full relative">
      <Layout>
        <BackToTop />
        <Hero />
        <Slogan />
        <About />
        <HowTo />
        <Core />
        <HasilInspeksi />
      </Layout>
    </div>
  );
}