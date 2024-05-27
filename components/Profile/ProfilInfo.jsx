"use client";
import { useState, useEffect } from "react";
export default function ProfilInfo({ userId }) {
  const IdUser = userId;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/userDetails/${IdUser}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
        // Update user image state after fetching user data
        if (data.picture) {
          setUserImage(data.picture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [IdUser]);

  const handleAge = () => {
    if (userData) {
      const date = new Date();
      const date2 = new Date(userData.age);
      const year = date.getFullYear();

      const year2 = date2.getFullYear();
      const currentAge = year - year2;
      return (
        <ul className="flex flex-col gap-5 text-sm">
          <li className="text-gray-600">
            Wiek
            <p className="text-lg text-black">{currentAge}</p>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-lg p-5 rounded-lg border-t-4 border-[#0A390C]">
      <h1 className="text-4xl mt-16">Profil</h1>
      <h1 className="text-xl text-gray-700 mt-2">Informacje ogólne</h1>
      {userData ? (
        <div className="flex md:flex-col flex-col md:w-[60%] justify-between gap-4 mt-9">
          <div className="flex md:flex-row flex-col gap-6">
            <ul className="flex flex-col gap-5 text-sm">
              <li className="text-gray-600">
                Imię <br />
                <p className="text-lg text-black">{userData.firstName}</p>
              </li>
            </ul>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="text-gray-600">
                Nazwisko <br />
                <p className="text-lg text-black">{userData.lastName}</p>
              </li>
            </ul>

            {handleAge()}
          </div>
          <ul className="flex flex-col gap-5 text-sm">
            <li className="text-gray-600">
              Budynek <br />
              <p className="text-lg text-black">{userData.buildingName}</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-5 text-sm">
            <li className="text-gray-600">
              Adres E-mail <br />
              <p className="text-lg text-black">{userData.email}</p>
            </li>
          </ul>
        </div>
      ) : (
        <div className=" border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 mt-16 mx-auto" />
      )}
      <h1 className="text-xl text-gray-700 mt-4">Opis</h1>
      {userData && (
        <div className="text-md mt-4 text-justify w-[70%]">
          {userData.description}
        </div>
      )}
    </div>
  );
}
