"use client";
import Image from "next/image";
import Notifications from "./Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect, createContext, useContext } from "react";
import { useSession } from "next-auth/react";

export default function NavBarLogged() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        const fetchImage = await fetch(`/api/userImage/${session.user.id}`, {
          method: "GET",
        });
        const userImage = await fetchImage.json();
        setUserImage(userImage);
      }
    };
    fetchUserData();
  }, [session?.user?.id]);

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
          <div className="bg-red-600 text-center text-[12px] text-white rounded-full border-2 border-[#0A390C] absolute top-[-3px] left-[20%] w-7 h-5">
            1
          </div>
          <div className="border-2 border-[#0A390C] rounded-full w-10 h-10">
            <Link href={"/dashboard/profile"}>
              {userImage && (
                <Image
                  src={userImage}
                  alt="Image"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
