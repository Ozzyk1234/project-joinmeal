"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function FriendList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [userFriendlist, setUserFriendlist] = useState([]);

  const convertImage = (picture) => {
    const base64Image = Buffer.from(picture).toString("base64");
    const encodedImage = atob(base64Image);
    return (
      <Image
        className="border-[1px] border rounded-full"
        src={encodedImage}
        alt="Zdjecie profilu"
        width={52}
        height={52}
      />
    );
  };

  useEffect(() => {
    const fetchFriendlist = async () => {
      if (userId) {
        const friends = await fetch(`/api/friends/${userId}`);
        const response = await friends.json();
        setUserFriendlist(response);
        console.log(response);
      }
    };
    fetchFriendlist();
  }, [userId]);
  return (
    <DashboardLayout>
      <div className="w-[100%] h-screen bg-gray-1 items-center flex flex-col pt-16">
        <div className="flex flex-col h-screen md:w-[80%] w-full md:border-r-[1px] md:border-l-[1px] md:border-gray-300 items-center">
          <h1 className="text-4xl text-center w-full mt-16">Lista znajomych</h1>

          {userFriendlist && (
            <div className="w-[80%] grid grid-cols-4 mt-16 gap-32 h-fit p-12 items-center justify-center">
              {userFriendlist.map((item) => (
                <Link
                  key={item.id}
                  href={`/dashboard/profile/${item.friend.id}`}
                  className="w-72 h-24 border border-[1px] rounded-lg border-gray-200 shadow shadow-lg flex flex-row items-center p-4 transition-all hover:scale-105 duration-100"
                >
                  <div className="flex flex-row mr-5">
                    {convertImage(item.friend.picture)}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl text-gray-900">
                      {item.friend.userName}
                    </h1>
                    <h2 className="text-sm text-gray-800">
                      {item.friend.firstName} {item.friend.lastName}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
