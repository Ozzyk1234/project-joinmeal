"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";

export default function Info() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const messages = await fetch(`/api/board/showAll`);
        if (!messages.ok) {
          throw new Error("Failed to fetch data");
        }
        const response = await messages.json();
        setData(response);
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInfo();
  }, []);

  const handleInfo = async () => {
    router.push(`/dashboard/info/add`);
  };

  return (
    <div>
      <DashboardLayout>
        <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
          <h1 className="text-4xl text-center">Tablica ogłoszeń</h1>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          <div className="w-full flex flex-row justify-end">
            <button
              onClick={handleInfo}
              className="rounded-lg text-white bg-[#0A390C] py-2 px-3 mt-4 mr-9"
            >
              Dodaj wpis!
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 w-[80%] h-fit mt-9 ">
            {data.map((item) => (
              <div key={item.idd} className="text-justify p-4 border-2">
                <p>{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
