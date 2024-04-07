"use client";
import React, { useState } from "react";
import NAV_LINKS from "../../consts/Navbar";
import Button from "../Buttons/Button";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex md:flex-row flex-col w-full h-[80px] md:items-center px-9 justify-between font-semibold border-b-2 shadow-lg z-20 bg-white"
      >
        <div className="w-auto">
          <Link href={"/"}>
            <Image
              src="/logo1.png"
              alt="Logo"
              width={40}
              height={40}
              className="text-left mt-3 ml-[-10px] md:ml-0 md:mt-0"
            />
          </Link>
        </div>
        <div className="md:flex md:flex-row">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-3xl absolute right-0 top-0 mt-6 mr-4 flex items-center md:hidden"
          >
            {open ? (
              <React.Suspense fallback={null}>
                <RxHamburgerMenu />
              </React.Suspense>
            ) : (
              <IoMdClose />
            )}
          </div>
          <ul
            className={`flex flex-col md:flex-row gap-9 pt-9 md:pt-9 pb-9 md:pb-9 md:text-black md:items-center md:static absolute left-0 bg-white md:bg-transparent w-full pl-9 duration-300 transition-all ease-in z-[-10] md:z-0 ${
              open ? "top-[-500px]" : "top-20"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <li className="cursor-pointer relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                  {link.label}
                </li>
              </Link>
            ))}

            {session ? (
              <div className="flex flex-row items-center">
                <Link href={"/dashboard"} className="mr-9">
                  <li className="relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                    Kokpit
                  </li>
                </Link>
                <li
                  className="cursor-pointer bg-[#A92424] text-white py-3 px-5 rounded-full hover:bg-white hover:text-[#A92424] transition-all duration-100"
                  onClick={() => signOut()}
                >
                  Wyloguj się
                </li>
              </div>
            ) : (
              <div className="flex flex-row gap-5 md:ml-7 text-white">
                <Button name="Zaloguj się" action="/login" />
                <Button name="Rejestracja" action="/register" />
              </div>
            )}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
