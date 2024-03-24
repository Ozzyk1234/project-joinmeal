"use client";
import Image from "next/image";
import Notifications from "./Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Fetchuser from "@/components/NavBarLogged";

export default function NavBarLogged() {
  const { data: session } = useSession();
  const [openNotifiactions, setOpenNotifications] = useState(false);

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
              openNotifiactions
                ? setOpenNotifications(false)
                : setOpenNotifications(true)
            }
          >
            <IoIosNotificationsOutline className="w-8 h-8 text-[#0A390C]" />
          </button>
          {openNotifiactions ? <Notifications /> : ""}
          <div className="bg-red-600 text-center text-[12px] text-white rounded-full border-2 border-[#0A390C] absolute top-[-3px] left-[20%] w-7 h-5">
            1
          </div>
          <div className="border-2 border-[#0A390C] rounded-full w-10 h-10">
            <Link href={"/dashboard/profile"}>
              <Image
                src="/"
                alt="user_photo"
                width={50}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
