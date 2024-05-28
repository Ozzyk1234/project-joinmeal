"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import EditProfile from "../../../../components/Profile/EditProfile";
import ProfilPhoto from "../../../../components/Profile/ProfilPhoto";
import { useSession } from "next-auth/react";
import { IoPersonAddSharp } from "react-icons/io5";

export default function Profile({ params }) {
  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;
  const userId = params.userId;
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [addtoFriends, setAddtoFriends] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionUserId) {
      if (parseInt(userId) === parseInt(sessionUserId)) {
        setIsOwnProfile(true);
        setAddtoFriends(false);
      } else {
        setAddtoFriends(true);
      }
    }
  }, [userId, sessionUserId]);

  const handleAddFriend = async () => {
    const addfriend = await fetch(`/api/friends/${sessionUserId}/${userId}`);
    const response = await addfriend.json();
    console.log(response);
    setMessage(response);
  };
  return (
    <DashboardLayout>
      <div className="w-[100%] h-screen bg-gray-1 items-center flex flex-col pt-16">
        <div className="flex flex-row h-screen md:w-[80%] w-full md:border-r-[1px] md:border-l-[1px] md:border-gray-300">
          <ProfilPhoto userId={userId} />
          {isOwnProfile && <EditProfile userId={userId} />}
          {addtoFriends && (
            <button
              onClick={handleAddFriend}
              className="cursor-pointer absolute top-[45%] left-[70%] w-64 h-16 border-[1px] rounded-lg border-gray-200 shadow-lg flex flex-row items-center justify-between p-4 transition-all hover:scale-105 duration-100"
            >
              <IoPersonAddSharp className="text-4xl" />
              <p className="flex flex-col">
                <p>Dodaj do znajomych!</p>
                <p className="text-sm text-gray-500">{message}</p>
              </p>
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
