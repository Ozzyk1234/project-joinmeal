"use client";
import React, { useState } from "react";
import GetRooms from "./GetRooms";
import CreateRoom from "./CreateRoom";
export default function MainContent() {
  const [isCreateMode, setCreateMode] = useState(false);
  const handleClose = async () => {
    setCreateMode(false);
  };
  const handleOpen = async () => {
    setCreateMode(true);
  };
  return (
    <div className="md:w-[80%] w-full h-screen border-r-[1px] border-l-[1px] border-gray-200 md:ml-[10%] pt-24 flex flex-col">
      {isCreateMode ? (
        <div>
          <h1 className="text-4xl text-center mt-16">Utwórz pokój</h1>
          <CreateRoom onClose={handleClose} />
        </div>
      ) : (
        <div>
          <div className="flex flex-row w-full h-fit items-center justify-end gap-2 pr-7">
            <button
              onClick={handleOpen}
              className="rounded-lg text-white bg-[#0A390C] py-2 px-3"
            >
              Utwórz pokój
            </button>
          </div>
          <h1 className="text-4xl text-center mt-9">Dostępne pokoje</h1>
          <GetRooms />
        </div>
      )}
    </div>
  );
}
