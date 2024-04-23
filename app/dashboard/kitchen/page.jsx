"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Kitchen() {
  const { data: session } = useSession();
  const [getKitchen, setgetKitchen] = useState([]);
  const [userBuilding, setUserBuilding] = useState([]);

  useEffect(() => {
    const getUserBuilding = async () => {
      const userbuilding = await fetch(
        `/api/kitchen/userBuilding/${session?.user?.id}`
      );
      const response = await userbuilding.json();
      setUserBuilding(response);
    };
    getUserBuilding();
    const getAllFloors = async () => {
      const getFloors = await fetch(
        `/api/kitchen/floorlist/${userBuilding.buildingName}`
      );
      const response = await getFloors.json();
      setgetKitchen(response);
    };
    getAllFloors();
  }, [session?.user?.id, userBuilding]);
  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <h1 className="text-4xl text-center">Wybierz piętro</h1>
        <div className="grid grid-cols-3 gap-6 mt-16">
          {getKitchen &&
            getKitchen.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/kitchen/${item.id}`}
                className="w-32 h-32 border-black flex flex-col justify-center border-[1px] shadow-2xl rounded-lg hover:scale-110 transition-all"
              >
                <h1 className="text-3xl text-center ">{item.floor}</h1>
              </Link>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
