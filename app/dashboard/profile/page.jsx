"use client";
import DashboardLayout from "@/components/DashboardLayout";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

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
        <h1 className="text-5xl text-black text-center mt-24">Profil</h1>
        <div className="flex flex-row justify-between h-screen ">
          <div className=" border-r-2 border-black w-[30%] flex flex-col items-center">
            <Image
              src={"/user.jpg"}
              alt="user_photo"
              width={250}
              height={125}
              className="rounded-full border-2 border-black"
            />
            <input
              type="file"
              name="file"
              onChange={handlefileupload}
              className="text-blue-700 mt-4 hover:border-b-2 hover:border-blue-700"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
