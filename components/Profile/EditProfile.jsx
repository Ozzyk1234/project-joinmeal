"use client";
import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSession } from "next-auth/react";

export default function EditProfile({ onClose }) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/userDetails/${session.user.id}`);
        const data = await res.json();
        setUserData(data);
        setFormData(data); // Update formData when userData is available
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [session?.user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/updateProfile/${session.user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Dane zaktualizowane:", data);
          onClose(); // Close the form after updating data
        } else {
          console.error("Błąd podczas aktualizacji danych");
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error);
      }
    }
  };

  return (
    <div className="w-full h-full mx-auto items-center flex flex-col">
      <button onClick={onClose}>
        <IoMdArrowRoundBack className="absolute top-[8%] left-[29%] text-3xl" />
      </button>
      <h1 className="text-center text-4xl mt-16">Edytuj dane</h1>
      <div className="flex w-3/5 mt-9 justify-center mx-auto">
        {userData && (
          <form
            onSubmit={handleFormSubmit}
            className="w-[800px] h-[700px] bg-gray-200 rounded-xl mx-auto flex flex-col items-center justify-center"
          >
            <div className=" flex flex-row gap-20 items-center justify-center ">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="-mb-2">
                  Imię:{" "}
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="..."
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
                <label htmlFor="lastName" className="-mb-2">
                  Nazwisko:{" "}
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="..."
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
                <label htmlFor="userName" className="-mb-2">
                  Nazwa użytkownika:{" "}
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="..."
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="-mb-2">
                  E-mail:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
                <label htmlFor="sex" className="-mb-2">
                  Płeć
                </label>
                <input
                  type="text"
                  name="sex"
                  placeholder="..."
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
                <label htmlFor="age" className="-mb-2">
                  Wiek:
                </label>
                <input
                  type="text"
                  name="age"
                  placeholder="..."
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-56 h-9 pl-2 rounded-lg"
                />
              </div>
            </div>
            <label htmlFor="buildingName" className="mt-2">
              Budynek:{" "}
            </label>
            <input
              type="text"
              name="buildingName"
              placeholder="..."
              value={formData.buildingName}
              onChange={handleInputChange}
              className="w-56 h-9 pl-2 rounded-lg"
            />
            <label htmlFor="description" className="mt-9">
              Opis
            </label>
            <textarea
              name="description"
              placeholder="..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-[600px] h-[200px] pl-2 rounded-lg resize-none text-justify"
            />
            <button
              type="submit"
              className="px-5 py-2 w-24 mt-12 h-12 text-white bg-[#0A390C] rounded-lg"
            >
              Zapisz
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
