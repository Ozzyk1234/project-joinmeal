"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const dishes = [
  { id: 1, src: "/chicken.png", alt: "Dish 1" },
  { id: 2, src: "/Pasta.png", alt: "Dish 2" },
  { id: 3, src: "/Broccoli.png", alt: "Dish 3" },
  { id: 4, src: "/ramen.png", alt: "Dish 4" },
  { id: 5, src: "/Lasagne.png", alt: "Dish 5" },
  { id: 6, src: "/Ciacho.png", alt: "Dish 5" },
  { id: 7, src: "/Hamburger.png", alt: "Dish 5" },
  { id: 8, src: "/Taco.png", alt: "Dish 5" },
];

const categories = [
  { category: "Wszystkie" },
  { category: "Azjatycka" },
  { category: "Włoska" },
  { category: "Francuska" },
  { category: "Hiszpańska" },
  { category: "Brytyjska" },
  { category: "Amerykańska klasyczna" },
  { category: "Meksykańska" },
  { category: "Turecka" },
  { category: "Afrykańska" },
  { category: "Wegetariańska" },
  { category: "Wegańska" },
  { category: "Inne..." },
];

const mealType = [
  { type: "Wszystkie" },
  { type: "Śniadanie" },
  { type: "Drugie śniadanie" },
  { type: "Lunch" },
  { type: "Podwieczorek" },
  { type: "Kolacja" },
  { type: "Przekąski" },
];

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
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [selectedType, setSelectedType] = useState("Wszystkie");

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

  const handleCategoryRadioChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTypeRadioChange = (e) => {
    setSelectedType(e.target.value);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const generateImage = (id) => {
    try {
      return (
        <Image
          src={dishes[id - 1].src}
          alt="Dishes Image"
          width={100}
          height={100}
        />
      );
    } catch (e) {
      return "Error";
    }
  };
  const filteredData = rooms.filter((room) => {
    if (selectedCategory === "Wszystkie" && selectedType === "Wszystkie") {
      return true;
    }
    if (selectedCategory === "Wszystkie") {
      return room.type === selectedType;
    }
    if (selectedType === "Wszystkie") {
      return room.category === selectedCategory;
    }
    return room.category === selectedCategory && room.type === selectedType;
  });
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[25%]">
        <div className="flex flex-col w-[100%] border-r-2 border-gray-400">
          <h1 className="text-center text-xl font-bolder">Kategorie</h1>
          <div className="flex flex-col ml-9 mt-4">
            {categories.map((category) => (
              <label key={category.category}>
                <input
                  type="radio"
                  value={category.category}
                  checked={selectedCategory === category.category}
                  onChange={handleCategoryRadioChange}
                  className="mr-2 mb-3"
                />
                {category.category}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[100%] border-r-2 border-gray-400">
          <h1 className="text-center text-xl font-bolder">Typ posiłku</h1>
          <div className="flex flex-col ml-9 mt-4">
            {mealType.map((mealType) => (
              <label key={mealType.type}>
                <input
                  type="radio"
                  value={mealType.type}
                  checked={selectedType === mealType.type}
                  onChange={handleTypeRadioChange}
                  className="mr-2 mb-3"
                />
                {mealType.type}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto h-fit flex flex-col justify-between ">
        <h1 className="text-4xl text-center mb-4">Dostępne pokoje</h1>

        {loading ? (
          <div className="w-[100%]">
            <div className=" border-gray-300 h-9 w-9 animate-spin mx-auto rounded-full border-8 border-t-blue-600 mt-16" />
          </div>
        ) : (
          <>
            <div className="md:grid md:grid-cols-4 mx-auto lg: md:gap-6 flex flex-col gap-5">
              {filteredData.map((room) => (
                <Link key={room.id} href={`/dashboard/room/${room.id}`}>
                  <div
                    key={room.id}
                    className="w-36 h-48 flex flex-col justify-between border-2 border-gray-600 bg-white shadow-2xl items-center rounded-lg"
                  >
                    <h1 className="text-center mt-2">{room.name}</h1>
                    {generateImage(room.dishimage)}
                    <h2 className="text-center">Cena: {room.cost} zł</h2>
                  </div>
                </Link>
              ))}
            </div>
            <div className="absolute bottom-2 m-0 p-0 left-[58%] -z-2">
              <button
                onClick={prevPage}
                hidden={currentPage === 1}
                className="px-3 py-1 mr-2 bg-[#0A390C] text-white rounded -z-1"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextPage}
                hidden={rooms.length < pageSize}
                className="px-3 py-1 bg-[#0A390C] text-white rounded -z-1"
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
