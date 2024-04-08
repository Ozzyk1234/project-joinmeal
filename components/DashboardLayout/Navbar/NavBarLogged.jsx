"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NavbarPhoto from "./NavbarPhoto";
import Link from "next/link";

export default function NavBarLogged() {
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/userImage/${session?.user?.id}`);
      const data = await res.json();
      setUserImage(data);
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session?.user?.id]);

  return (
    <div className="flex w-full h-16 items-center justify-center fixed z-[20] ">
      <div className="flex flex-row items-center md:w-[80%] bg-white w-full h-16 border-b-2 shadow justify-between px-4">
        <div>
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-[#0A390C]">JoinMeal</h1>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-12 relative">
          <div className="w-10 h-10 items-center flex rounded-full">
            <NavbarPhoto userImage={userImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
