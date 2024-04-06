"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutProject from "../components/AboutProject";
import Services from "../components/Services";
export default function Home() {
  return (
    <main className="w-full h-screen">
      <Navbar />
      <Hero />
      <AboutProject />
      <Services />
    </main>
  );
}
