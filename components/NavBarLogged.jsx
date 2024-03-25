"use client";
import Image from "next/image";
import Notifications from "./Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserData } from "@/app/Context";

export default function NavBarLogged() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const { userData } = useUserData(); // Poprawione użycie hooka useUserData

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

  return (
    <div className="flex w-full h-16 items-center justify-center fixed">
      <div className="flex flex-row items-center w-[80%]  h-16 border-b-2 shadow justify-between px-4">
        <div>
          <Link href={"/dashboard"}>
            <h1 className="text-2xl font-bold text-[#0A390C]">JoinMeal</h1>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-12 relative">
          <button
            onClick={() =>
              openNotifications
                ? setOpenNotifications(false)
                : setOpenNotifications(true)
            }
          >
            <IoIosNotificationsOutline className="w-8 h-8 text-[#0A390C]" />
          </button>
          {openNotifications ? <Notifications /> : ""}
          <div className="bg-red-600 text-center text-[12px] text-white rounded-full border-[1px] border-[#0A390C] absolute top-[-3px] left-[20%] w-7 h-5">
            1
          </div>
          <div className="w-10 h-10 justify-center items-center flex">
            <Link href={"/dashboard/profile"}>
              {userImage ? (
                <Image
                  src={userImage}
                  alt="Image"
                  className="border-2 border-black rounded-full w-9 h-9"
                  fill
                />
              ) : (
                <div className="flex justify-center h-screen mt-2">
                  <div className="w-6 h-6 bg-white rounded-full animate-ping">
                    {/* Placeholder */}
                  </div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
