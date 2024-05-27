"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useRouter } from "next/navigation";

export default function Info() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let random = Math.floor(Math.random() * 10000)+1;
        const response = await fetch(`/api/board/showAll/${random}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleInfo = () => {
    router.push(`/dashboard/info/add`);
  };

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        <h1 className="text-4xl text-center">Tablica ogłoszeń</h1>

        <div className="w-full flex flex-row justify-end">
          <button
            onClick={handleInfo}
            className="rounded-lg text-white bg-[#0A390C] py-2 px-3 mt-4 mr-9"
          >
            Dodaj wpis!
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 w-[80%] h-fit mt-9">
            {data.map((item) => (
              <div key={item.id} className="text-justify p-4 border-2">
                <p>{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
