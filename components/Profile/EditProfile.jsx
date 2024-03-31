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
        if (!session?.user?.id) {
          return; // Return early if session user id is undefined
        }
        const res = await fetch(`/api/userDetails/${session.user.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
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
        <IoMdArrowRoundBack className="absolute top-0 left-0 ml-12 mt-12 text-3xl" />
      </button>
      <h1 className="text-center text-4xl mt-16">Edytuj dane</h1>
      <div className="flex w-3/5 mt-9 justify-center mx-auto">
        {userData && (
          <form
            onSubmit={handleFormSubmit}
            className="w-full h-[700px] bg-gray-200 rounded-xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Form Inputs */}
          </form>
        )}
      </div>
    </div>
  );
}
