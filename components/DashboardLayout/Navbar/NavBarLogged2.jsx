"use client";
import Image from "next/image";
import Notifications from "./Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NavBarLogged() {
  const { data: session } = useSession();

  const [userData, setUserData] = useState(null);
  const [openNotifications, setOpenNotifications] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/userImage/${session?.user?.id}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchUserData();
  }, [session?.user?.id]);

  const renderUserImage = () => {
    if (!userData) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
        </div>
      );
    }

    const userImage = userData.picture;
    const base64Image = Buffer.from(userImage).toString("base64");
    const encodedImage = atob(base64Image);

    return (
      <div className="w-10 h-10 overflow-hidden rounded-full">
        <Image
          src={encodedImage}
          alt="User Image"
          width={50}
          height={50}
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <div className="flex w-full h-16 items-center justify-center fixed">
      <div className="flex flex-row items-center w-[80%] h-16 border-b-2 shadow justify-between px-4">
        <div>
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-[#0A390C]">JoinMeal</h1>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-12 relative">
          <button onClick={() => setOpenNotifications(!openNotifications)}>
            <IoIosNotificationsOutline className="w-8 h-8 text-[#0A390C]" />
          </button>
          {openNotifications && <Notifications />}
          <div className="bg-red-600 text-center text-[12px] text-white rounded-full border-[1px] border-[#0A390C] absolute top-[-3px] left-[20%] w-7 h-5">
            3
          </div>
          <div className="w-10 h-10 items-center flex rounded-full">
            <Link href="/dashboard/profile">{renderUserImage()}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
