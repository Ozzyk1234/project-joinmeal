"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

export default function Messages({ isOpen }) {
  const [open, setOpen] = useState(isOpen);
  return (
    <div>
      <div
        className={`md:w-[10%] w-[40%] h-screen bg-black fixed top-0 right-0 text-white flex flex-col items-center border-r-2 border-black transition-all duration-500 z-30 ${
          open ? "" : "hidden"
        }`}
      >
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={() => setOpen(false)}
        >
          <ImCross />
        </button>
        <h1 className="mt-20 text-2xl border-b-2 border-white">Wiadomości</h1>
        <ul className="mt-12 flex flex-col gap-6">
          <li className="bg-white text-black rounded-lg flex flex-row items-center pr-12 justify-between cursor-pointer">
            <Image
              src={"/user.jpg"}
              alt="user_photo"
              width={50}
              height={30}
              className="rounded-full"
            />
            <p className="text-center">Mariusz</p>
          </li>
          <li className="bg-white text-black rounded-lg flex flex-row items-center pr-12 justify-between cursor-pointer">
            <Image
              src={"/user.jpg"}
              alt="user_photo"
              width={50}
              height={30}
              className="rounded-full"
            />
            <p className="text-center">Tadeusz</p>
          </li>
          <li className="bg-white text-black rounded-lg flex flex-row items-center pr-12 justify-between cursor-pointer">
            <Image
              src={"/user.jpg"}
              alt="user_photo"
              width={50}
              height={30}
              className="rounded-full"
            />
            <p className="text-center">Sławek</p>
          </li>
        </ul>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-0 right-0 mb-4 mr-4 p-4 rounded-full text-black border text-2xl border-black"
      >
        <FaRegMessage />
      </button>
    </div>
  );
}
