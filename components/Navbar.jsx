"use client";
import React, { useState } from "react";
import NAV_LINKS from "@/consts/Navbar";
import Button from "./Buttons/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [Open, setOpen] = useState(true);
  return (
    <div className="fixed top-0 left-0 w-full">
      <nav className="flex md:flex-row flex-col w-full h-[80px] md:items-center px-9 justify-between font-semibold border-b-2 shadow-lg z-20 bg-white">
        <div className="w-auto">
          <Link href={"/"}>
            <Image
              src="/logo1.png"
              alt="Logo"
              width={50}
              height={10}
              className="text-left mt-3 ml-[-10px] md:ml-0 md:mt-0"
            />
          </Link>
        </div>
        <div className="md:flex md:flex-row">
          <div
            onClick={() => setOpen(!Open)}
            className="cursor-pointer text-3xl absolute right-0 top-0 mt-6 mr-4 flex items-center md:hidden"
          >
            {Open ? <RxHamburgerMenu /> : <IoMdClose />}
          </div>
          <ul
            className={`flex flex-col md:flex-row gap-9 pt-9 md:pt-9 pb-9 md:pb-9 md:text-black md:items-center md:static absolute left-0 bg-white md:bg-transparent w-full pl-9 duration-300 transition-all ease-in z-[-10] md:z-0 ${
              Open ? "top-[-500px]" : "top-20"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="cursor-pointer">
                {link.label}
              </li>
            ))}

            {session ? (
              <div className="flex flex-row items-center">
                <Link href={"/dashboard"} className="mr-9">
                  <li>Kokpit</li>
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
      </nav>
    </div>
  );
}
