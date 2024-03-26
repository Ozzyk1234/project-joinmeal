import React, { useState, useEffect } from "react";
import { useUserData } from "@/app/Context";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ProfilPhoto() {
  const { data: session } = useSession();
  const { userData } = useUserData();
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
    <div className=" border-r-[1px] border-gray-500 bg-gray-200 flex flex-col w-[30%] items-center">
      <label
        htmlFor="fileInput"
        className="cursor-pointer relative h-[240px] w-[240px]"
      >
        <div className="rounded-full border-2 border-black overflow-hidden mt-16">
          {userImage ? (
            <div className="w-[240px] h-[240px] ">
              <Image
                src={userImage}
                alt="user_photo"
                width={245}
                height={245}
              />
            </div>
          ) : (
            <div className="w-[250px] h-[250px] bg-white rounded-full animate-ping"></div>
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
        <div className="absolute inset-0 bg-black/0 hover:bg-black/50 opacity-100 transition-all duration-300 rounded-full w-[240px] h-[242px]  top-16 ">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
            Edytuj
          </div>
        </div>
      </label>
      {userData ? (
        <h1 className="font-bold text-2xl mt-24">
          Użytkownik : {userData.userName}
        </h1>
      ) : (
        <div className="w-[200px] h-[40px] bg-white rounded-full animate-ping border-2 mt-24" />
      )}
    </div>
  );
}
