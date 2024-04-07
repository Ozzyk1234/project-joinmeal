"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export default function ProfilInfo() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/userDetails/${session?.user?.id}`);
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
  }, [session?.user?.id]);

  return (
    <div className="w-full h-fit mx-auto items-center flex flex-col">
      <h1 className="text-center text-4xl mt-16">Profil</h1>
      {userData ? (
        <div className="flex md:flex-row flex-col md:w-[60%] justify-between gap-12 mx-auto mt-16">
          <ul className="flex flex-col gap-5">
            <li>Imię: {userData.firstName}</li>
            <li>Nazwisko: {userData.lastName}</li>
            <li>Wiek: {userData.age}</li>
          </ul>
          <ul className="flex flex-col gap-5">
            <li>Budynek: {userData.buildingName}</li>
            <li>Adres E-mail: {userData.email}</li>
            <li>Konto utworzone: {userData.createdAt}</li>
          </ul>
        </div>
      ) : (
        <div className=" border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 mt-16" />
      )}
      <h1 className="text-center text-4xl mt-16">Opis</h1>
      {userData ? (
        <div className="text-md mt-16 text-justify w-[70%]">
          {userData.description}
        </div>
      ) : (
        <div className="w-[500px] h-[100px] mt-16 bg-white rounded-full animate-ping"></div>
      )}
    </div>
  );
}
