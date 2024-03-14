"use client";
import React, { useState } from "react";
import NAV_LINKS from "@/consts/Navbar";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="flex flex-row w-full h-[70px] items-center px-9 justify-between font-semibold">
      <div className="w-auto">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-yellow-500 cursor-pointer">
          JoinMeal
        </h1>
      </div>
      <div className="flex flex-row">
        <ul className="flex flex-row gap-5 items-center justify-center mx-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="cursor-pointer">
              {link.label}
            </li>
          ))}
        </ul>
        <div className="flex flex-row gap-5 ml-7 text-white">
          <Button name="Zaloguj się" action="/login" />
          <Button name="Rejestracja" action="/register" />
        </div>
      </div>
    </nav>
  );
}
