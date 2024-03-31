"use client";
import React, { useState, useEffect } from "react";

const getRooms = async (page, pageSize) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/rooms/getRooms/${page}/${pageSize}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch rooms data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    return [];
  }
};

export default function GetRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms(currentPage, pageSize);
        setRooms(data.rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-[90%] mx-auto h-fit flex flex-col justify-between mt-16">
      {loading ? (
        <div className="w-[100%]">
          <div className=" border-gray-300 h-9 w-9 animate-spin mx-auto rounded-full border-8 border-t-blue-600 mt-16" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 mx-auto gap-16">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="w-32 h-32 flex flex-col justify-center items-center rounded-lg"
              >
                <h1 className="text-center">{room.name}</h1>
                <h2 className="text-center">{room.cost}</h2>
              </div>
            ))}
          </div>
          <div className="absolute top-[70%] left-[45%] flex justify-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={rooms.length < pageSize}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
