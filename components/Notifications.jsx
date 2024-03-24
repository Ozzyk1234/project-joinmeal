import React from "react";

export default function Notifications() {
  return (
    <div className="absolute w-80 h-96 bg-black/10 top-0 right-0 mr-28 mt-9 border-2 border-white rounded-lg backdrop-blur-md flex flex-col p-4 transition-all duration-200">
      <div className="bg-gray-100 border-b-2 border-black px-2 py-4 rounded-2xl shadow flex flex-col justify-between gap-2">
        <h1 className="text-2xl">Lodowka</h1>
        <h2 className="text-sm">Konczy sie termin wazności produktu!</h2>
      </div>
    </div>
  );
}
