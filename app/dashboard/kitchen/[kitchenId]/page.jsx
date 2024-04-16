"use client";
import React from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function KitchenSelected({ params }) {
  const kitchenId = params.kitchenId;
  const [usersInKitchen, setusersInKitchen] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      const users = await fetch(`/api/kitchen/userList/${kitchenId}`);
      const response = await users.json();
      setusersInKitchen(response);
    };

    fetchusers();
  }, [kitchenId]);

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <div>
          {usersInKitchen.length}\{}
        </div>
        <div className="w-[100%] flex justify-end">
          <button className="bg-[#0A390C] px-4 py-2 text-white rounded-lg flex mr-9 ">
            Zarezerwuj miejsce
          </button>
        </div>

        <h1 className="text-4xl">Kuchnia - </h1>
        {usersInKitchen &&
          usersInKitchen.map((item) => (
            <div key={item.id}>
              <div>{item.idKitchen}</div>
              <div>{item.idUser}</div>
              <div>{item.timeEnd}</div>
            </div>
          ))}
        <div className="flex flex-col mt-9 gap-9">
          <div className="flex flex-row">
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
          </div>
          <div className="flex flex-row">
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
