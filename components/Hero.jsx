"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center text-black">
      <div className="w-[90%] h-fit flex md:flex-row flex-col mt-18 md:mt-0 justify-between">
        <div className="flex flex-col items-center justify-center md:max-w-[40%] md:ml-28 mt-[-20px]">
          <div className="flex flex-col text-left ">
            <AnimatePresence mode="wait">
              <motion.h2
                className="text-2xl font-semibold text-center md:text-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Pysznie, tanio, wspólnie...
              </motion.h2>

              <motion.h1
                transition={{ duration: 1, delay: 1.5 }}
                className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black text-8xl font-semibold mt-4 text-center md:text-start"
              >
                JoinMeal
              </motion.h1>
              <motion.h3
                className="text-xl text-justify mt-9 md:text-start"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Jesteś mieszkańcem domu publicznego takiego jak akademik?
                Szukasz wspólnika do przygotowania wspólnego posiłku, lub chcesz
                dołączyć się do przygotowania jakiegoś dania? W takim wypadku
                dobrze trafiłeś! Aplikacja Joinmeal umożliwia wszystkie
                wcześniej wymienione czynności!
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Image
                src="/tlo.png"
                alt="Pizza"
                width={1200}
                height={400}
                className="hidden md:inline-block"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero;
