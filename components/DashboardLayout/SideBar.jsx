"use client";
import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiCookingPot } from "react-icons/pi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SideBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handlefridge = async () => {
    router.push(`/dashboard/fridge`);
  };
  return (
    <div
      className={`md:w-[10%] w-[40%] h-screen bg-black fixed top-0 text-white flex flex-col items-center border-r-2 border-black transition-all duration-500 z-30  ${
        open ? "left-0" : "md:left-[-10%] left-[-40%]"
      }`}
    >
      <h1 className="mt-20 text-2xl border-b-2 border-white">Menu</h1>
      <ul className="flex flex-col gap-8 mt-12">
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <IoHomeOutline />
          Strona główna
        </li>
        <button
          onClick={() => handlefridge()}
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <RiFridgeFill />
          Lodówka
        </button>
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <CgProfile />
          Profil
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <LiaUserFriendsSolid />
          Znajomi
        </li>
        <li className="flex flex-row gap-2 items-center cursor-pointer">
          <PiCookingPot />
          Przepisy
        </li>
        {open ? (
          <MdOutlineArrowBackIosNew
            className=" cursor-pointer absolute top-[50%] left-[92%] w-9 h-9 p-1  text-xl bg-white rounded-full text-black"
            onClick={() => setOpen(false)}
          />
        ) : (
          <MdOutlineArrowForwardIos
            className=" cursor-pointer absolute top-[50%] left-[110%] w-9 h-9 p-1  text-xl bg-white rounded-full text-black"
            onClick={() => setOpen(true)}
          />
        )}
      </ul>
      <button
        onClick={() => signOut()}
        className="absolute bottom-0 mb-20 bg-white text-center text-black py-3 px-5 rounded-lg mt-3 hover:bg-black hover:text-white transition-all duration-200 "
      >
        Wyloguj się!
      </button>
    </div>
  );
}
