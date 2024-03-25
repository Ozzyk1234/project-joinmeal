"use client";
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserData } from "@/app/Context";

export default function Profile() {
  const { data: session } = useSession();
  const { userData } = useUserData(); // Poprawione użycie hooka useUserData
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const ConvertFrom64 = async () => {
      if (userData) {
        const userImage = await userData.picture;
        const base64Image = Buffer.from(userImage).toString("base64");
        const encodedImage = atob(base64Image);
        setUserImage(encodedImage);
      }
    };
    ConvertFrom64();
  }, [userData]);

  const handlefileupload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", e.target.files[0]);

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      const result = reader.result;
      const response = await fetch(`/api/userImage/${session?.user?.id}`, {
        method: "POST",
        body: JSON.stringify({
          result,
        }),
      });
    };
  };

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen bg-gray-200 ml-[10%] flex flex-col">
        <div className="flex flex-row justify-between h-screen ">
          <div className=" border-r-2 border-black w-[30%] flex flex-col items-center mt-24">
            <label
              htmlFor="fileInput"
              className="cursor-pointer relative h-[240px] w-[240px]"
            >
              <div className="rounded-full border-2 border-black overflow-hidden">
                {userImage ? (
                  <div class="w-[240px] h-[240px] ">
                    <Image
                      src={userImage}
                      alt="user_photo"
                      width={245}
                      height={245}
                      className="ml-[.5px]"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center mt-2 h-[230px] w-[230px]">
                    <div className="w-[250px] h-[250px] bg-white rounded-full animate-ping">
                      {/* Placeholder */}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                id="fileInput"
                name="file"
                onChange={handlefileupload}
                className="hidden" // hide the input visually
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/50 opacity-100 transition-all duration-300 rounded-full">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Edytuj
                </div>
              </div>
            </label>
            {userData ? (
              <h1 className="font-bold text-2xl mt-9">
                Użytkownik : {userData.userName}
              </h1>
            ) : (
              <div className="flex justify-center mt-2 h-[20px] w-[250px]">
                <div className="w-[200px] h-[40px] bg-white rounded-full animate-ping border-2 mt-9">
                  {/* Placeholder */}
                </div>
              </div>
            )}
          </div>
          <div className="w-80% h-full flex flex-column">
            <h1 className="text-center text-3xl mt-24 items-center justify-center">
              Profil
            </h1>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
