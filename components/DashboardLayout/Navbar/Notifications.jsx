import React from "react";

export default function Notifications() {
  return (
    <div className="absolute w-80 h-96 bg-gray-300/70 border-black border-[1px] top-0 right-0 mr-28 mt-9 rounded-lg backdrop-blur-sm flex flex-col gap-7 p-4 z-[1000]">
      <div className="bg-gray-100 border-b-2 border-black px-2 py-4 rounded-2xl flex flex-col justify-between gap-2 z-[1000]">
        <h1 className="text-2xl">Lodowka</h1>
        <h2 className="text-sm">Konczy sie termin wazności produktu!</h2>
      </div>
      <div className="bg-gray-100 border-b-2 border-black px-2 py-4 rounded-2xl flex flex-col justify-between gap-2 z-[1000]">
        <h1 className="text-2xl">Lodowka</h1>
        <h2 className="text-sm">Konczy sie termin wazności produktu!</h2>
      </div>
      <div className="bg-gray-100 border-b-2 border-black px-2 py-4 rounded-2xl flex flex-col justify-between gap-2 z-[1000]">
        <h1 className="text-2xl">Lodowka</h1>
        <h2 className="text-sm">Konczy sie termin wazności produktu!</h2>
      </div>
    </div>
  );
}
