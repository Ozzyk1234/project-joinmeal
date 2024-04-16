"use client";
import React from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import Link from "next/link";

export default function Kitchen() {
  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <h1 className="text-4xl text-center">Kuchnia</h1>
        <div className="grid grid-cols-2 grid-rows-2 w-[50%] gap-9 mt-[10%]">
          <Link
            href={`/dashboard/kitchen/blizniak`}
            className="px-20 py-9 border-[1px] border-black shadow-xl rounded-md hover:bg-[#0A390C] transition-all duration-200 hover:text-white hover:scale-[1.1]"
          >
            <h1 className="text-5xl text-center">Bliźniak</h1>
          </Link>
          <Link
            href={`/dashboard/kitchen/maluch`}
            className="px-20 py-9 border-[1px] border-black shadow-xl rounded-md hover:bg-[#0A390C] transition-all duration-200 hover:text-white hover:scale-[1.1]"
          >
            <h1 className="text-5xl text-center">Maluch</h1>
          </Link>
          <Link
            href={`/dashboard/kitchen/skrzat`}
            className="px-20 py-9 border-[1px] border-black shadow-xl rounded-md hover:bg-[#0A390C] transition-all duration-200 hover:text-white hover:scale-[1.1]"
          >
            <h1 className="text-5xl text-center">Skrzat</h1>
          </Link>
          <Link
            href={`/dashboard/kitchen/herkules`}
            className="px-20 py-9 border-[1px] border-black shadow-xl rounded-md hover:bg-[#0A390C] transition-all duration-200 hover:text-white hover:scale-[1.1]"
          >
            <h1 className="text-5xl text-center">Herkules</h1>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
