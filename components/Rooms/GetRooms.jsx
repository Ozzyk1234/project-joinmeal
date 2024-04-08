"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const getRooms = async (page, pageSize) => {
  try {
    const res = await fetch(`/api/rooms/getRooms/${page}/${pageSize}`);
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
          <div className="md:grid md:grid-cols-4 mx-auto md:gap-16 flex flex-col gap-5">
            {rooms.map((room) => (
              <Link key={room.id} href={`/dashboard/room/${room.id}`}>
                <div
                  key={room.id}
                  className="w-32 h-32 flex flex-col bg-gray-300 justify-center items-center rounded-full"
                >
                  <h1 className="text-center">{room.name}</h1>
                  <h2 className="text-center">{room.cost}</h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-2 m-0 p-0 left-0 w-full flex justify-center -z-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-[#0A390C] text-white rounded -z-1"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextPage}
              disabled={rooms.length < pageSize}
              className="px-3 py-1 bg-[#0A390C] text-white rounded -z-1"
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
