import React from "react";
import GetRooms from "../components/Rooms/GetRooms";
export default function MainContent() {
  return (
    <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col">
      <div className="flex flex-row w-full h-fit items-center justify-end gap-2 pr-2">
        <button className="rounded-lg text-white bg-[#0A390C] py-2 px-3">
          Utwórz pokój
        </button>
        <button className="rounded-lg text-white bg-[#0A390C] py-2 px-3">
          Twoje pokoje
        </button>
      </div>
      <h1 className="text-4xl text-center mt-9">Dostępne pokoje</h1>
      <GetRooms />
    </div>
  );
}
