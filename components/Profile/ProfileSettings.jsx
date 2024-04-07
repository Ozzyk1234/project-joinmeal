import React, { useState } from "react";

export default function ProfileSettings({ onOpen }) {
  const [isModelOpen, setOpenModal] = useState(false);
  return (
    <div className="absolute bg-gray-300 w-[150px] h-[130px] top-0 right-0 mr-9 mt-28 md:mr-60 md:mt-28 rounded-lg flex flex-col justify-between p-4">
      <button
        onClick={onOpen}
        className="py-2 px-2 w-28 rounded-lg text-white bg-[#0A390C]"
      >
        Edytuj
      </button>
      <button className="py-2 px-2 w-28 rounded-lg text-white bg-[#A92424]">
        Usuń
      </button>
    </div>
  );
}
