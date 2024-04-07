"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center text-black">
      <div className="md:w-[90%] w-full h-fit flex md:flex-row flex-col mt-18 md:mt-0 justify-between">
        <div className="flex flex-col items-center justify-center w-[80%] md:max-w-[40%] md:ml-28 mt-[-20px] mx-auto">
          <div className="flex flex-col md:text-left text-center">
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
              className="animate-typing overflow-hidden whitespace-nowrap md:border-r-4 md:border-r-black text-7xl md:text-8xl font-semibold md:mt-4 text-center md:text-start"
            >
              JoinMeal
            </motion.h1>
            <motion.h3
              className="text-md md:text-xl text-justify mt-9 md:text-start"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Jesteś mieszkańcem domu publicznego takiego jak akademik? Szukasz
              wspólnika do przygotowania wspólnego posiłku, lub chcesz dołączyć
              się do przygotowania jakiegoś dania? W takim wypadku dobrze
              trafiłeś! Aplikacja Joinmeal umożliwia wszystkie wcześniej
              wymienione czynności!
            </motion.h3>
            <div className="w-full mt-9 text-end">
              <motion.button
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#0A390C] px-7 py-4 text-white font-semibold  border-2 rounded-lg"
              >
                Czytaj dalej...
              </motion.button>
            </div>
          </div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
