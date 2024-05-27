"use client";
import React, { useState, useEffect } from "react";

export default function EditProfile({ userId }) {
  const IdUser = userId;
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/userDetails/${IdUser}`);
        const data = await res.json();
        setUserData(data);
        setFormData(data); // Update formData when userData is available
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [IdUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (IdUser) {
      try {
        const response = await fetch(`/api/updateProfile/${IdUser}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Błąd podczas aktualizacji danych");
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <h1 className="text-4xl mt-16 ml-16">Edytuj dane</h1>
      <div className="flex w-full mt-9 justify-center mx-auto">
        {userData && (
          <form
            onSubmit={handleFormSubmit}
            className="md:w-full md:h-fit w-[150%] p-9 md:p-16 bg-white rounded-xl flex flex-col md:pl-32"
          >
            <div className="flex flex-row gap-20">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <label htmlFor="firstName" className=" w-full my-auto">
                    Imię:{" "}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="..."
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="md:w-fit w-36 h-9 pl-2 rounded-lg border-black border-[1px]"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <label htmlFor="lastName" className="w-full my-auto">
                    Nazwisko:{" "}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="..."
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="md:w-fit w-36 h-9 pl-2 rounded-lg border-black border-[1px]"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <label htmlFor="userName" className=" my-auto">
                    Nazwa użytkownika:{" "}
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="..."
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="md:w-fit w-36 h-9 pl-2 rounded-lg border-black border-[1px]"
                  />
                </div>
              </div>
            </div>

            <label htmlFor="description" className="mt-9">
              Opis
            </label>
            <textarea
              name="description"
              placeholder="..."
              value={formData.description}
              onChange={handleInputChange}
              className="md:w-full md:h-[200px] pl-2 rounded-lg resize-none items-center mt-4 text-justify border-gray-300 border-[1px]"
            />
            <button
              type="submit"
              className="px-5 py-2 w-full mt-12 h-12 text-white bg-[#0A390C] rounded-lg"
            >
              Zapisz
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
