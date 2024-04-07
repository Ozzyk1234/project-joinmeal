"use client";
import Navbar from "../components/HomePage/Navbar";
import Hero from "../components/HomePage/Hero";
import AboutProject from "../components/HomePage/AboutProject";
import Services from "../components/HomePage/Services";
import Contact from "../components/HomePage/Contact";
import Footer from "../components/HomePage/Footer";
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
