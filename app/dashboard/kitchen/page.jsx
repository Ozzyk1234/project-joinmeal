"use client";
import React from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import Link from "next/link";

export default function Kitchen() {
  const [kitchen, setKitchen] = useState([]);

  useEffect(() => {
    const fetchKitchen = async () => {
      const data = await fetch(`/api/kitchen/list`);
      const response = await data.json();
      console.log(response);
      setKitchen(response);
    };

    fetchKitchen();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <h1 className="text-4xl text-center">Kuchnia</h1>
        <div className="grid grid-cols-2 grid-rows-2 w-[50%] gap-9 mt-[10%]">
          {kitchen &&
            kitchen.map((item) => (
              <Link href={`/dashboard/kitchen/${item.id}`} key={item.id}>
                <div className="px-20 py-9 border-[1px] border-black shadow-xl rounded-md hover:bg-[#0A390C] transition-all duration-200 hover:text-white hover:scale-[1.1]">
                  <h1 className="text-5xl text-center">{item.buildingName}</h1>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
