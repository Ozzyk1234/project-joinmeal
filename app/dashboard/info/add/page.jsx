"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddInfo() {
  const router = useRouter();

  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    idUser: session?.user?.id,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/board/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push(`/dashboard`);
      } else {
        console.error("Błąd podczas dodawania produktu");
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
    }
  };
  return (
    <div>
      <DashboardLayout>
        <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] flex flex-col items-center justify-center">
          <form
            onSubmit={handleFormSubmit}
            className=" bg-gray-200 p-16 w-[50%] rounded-xl mx-auto flex flex-col items-center justify-center"
          >
            <label htmlFor="name" className="text-2xl">
              Treść ogłoszenia
            </label>
            <textarea
              name="message"
              placeholder="Treść"
              value={formData.message || ""}
              onChange={handleInputChange}
              className="w-full mt-2 h-52 p-2 rounded-lg mb-5 resize-none"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 w-24 mt-12 h-12 text-white bg-[#0A390C] rounded-lg"
            >
              Dodaj
            </button>
          </form>
        </div>
      </DashboardLayout>
    </div>
  );
}
