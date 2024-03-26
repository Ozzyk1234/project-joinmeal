import React from "react";
import { useUserData } from "@/app/Context";
export default function ProfilInfo() {
  const { userData } = useUserData();
  return (
    <div className="w-[100%] h-fit mx-auto items-center flex flex-col">
      <h1 className="text-center text-4xl mt-16">Profil</h1>
      {userData ? (
        <div className="flex flex-row w-[60%] justify-between gap-12 mx-auto mt-16">
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
