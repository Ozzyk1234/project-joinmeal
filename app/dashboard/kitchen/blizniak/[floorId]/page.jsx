"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../../components/DashboardLayout/DashboardLayout";
import Image from "next/image";

export default function KitchenSelected({ params }) {
  const floorId = params.floorId;
  console.log(floorId);
  const [usersInKitchen, setUsersInKitchen] = useState([]);
  const [isAvailable, setIsAvailable] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetch(`/api/kitchen/floorlist/${floorId}`);
      const response = await users.json();
      setUsersInKitchen(response);
      setIsAvailable(new Array(response.length).fill(true)); // Initialize availability state
      console.log(response);
    };

    fetchUsers();
  }, [floorId]);

  const toggleReservation = (index) => {
    // Create a copy of the isAvailable array
    const updatedAvailability = [...isAvailable];
    // Toggle the availability of the slot at the given index
    updatedAvailability[index] = !updatedAvailability[index];
    // Update the state with the new availability
    setIsAvailable(updatedAvailability);
  };

  const getKitchens = () => {
    const kitchenImages = [];

    if (usersInKitchen[0]) {
      for (let i = 0; i < usersInKitchen[0].slots; i++) {
        kitchenImages.push(
          <div key={i}>
            <div
              className={`border-black border-[1px] rounded-full w-9 h-9 ${
                isAvailable[i] ? "bg-[#317c35]" : "bg-[#9c2c2c]"
              }`}
              onClick={() => toggleReservation(i)} // Call toggleReservation on click
            />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
          </div>
        );
      }
    }

    return kitchenImages;
  };

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        {usersInKitchen[0] && <div>3/{usersInKitchen[0].slots}</div>}
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
          <div className="grid grid-cols-2">{getKitchens()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
