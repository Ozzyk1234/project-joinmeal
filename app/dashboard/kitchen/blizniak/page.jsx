"use client";
import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import Link from "next/link";

export default function Floor() {
  const floorId1 = 1;
  const floorId2 = 2;
  const floorId3 = 3;
  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <h1 className="text-4xl mt-9">Wybierz piętro</h1>
        <div className="flex flex-row items-center w-[50%] mt-9 gap-12">
          <Link
            href={`/dashboard/kitchen/blizniak/${floorId1}`}
            className="text-4xl border-black border-[1px] rounded-full shadow-xl w-56 h-56 flex justify-center items-center hover:bg-[#0A390C] hover:text-white transition-all duration-100"
          >
            Piętro 1
          </Link>
          <Link
            href={`/dashboard/kitchen/blizniak/${floorId2}`}
            className="text-4xl border-black border-[1px] rounded-full shadow-xl w-56 h-56 flex justify-center items-center hover:bg-[#0A390C] hover:text-white transition-all duration-100"
          >
            Piętro 2
          </Link>
          <Link
            href={`/dashboard/kitchen/blizniak/${floorId3}`}
            className="text-4xl border-black border-[1px] rounded-full shadow-xl w-56 h-56 flex justify-center items-center hover:bg-[#0A390C] hover:text-white transition-all duration-100"
          >
            Piętro 3
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
