"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { AnimatePresence } from "framer-motion";
export default function Home() {
  return (
    <main className="w-full h-screen">
      <AnimatePresence mode={"wait"}>
        <Navbar />
        <Hero />
      </AnimatePresence>
    </main>
  );
}
