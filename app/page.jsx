"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutProject from "../components/AboutProject";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main className="w-full h-screen">
      <Navbar />
      <Hero />
      <AboutProject />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
