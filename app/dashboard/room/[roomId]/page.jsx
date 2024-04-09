"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import JoinButton from "../../../../components/Buttons/JoinButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import RemoveRoomButton from "../../../../components/Buttons/RemoveRoomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Room({ params }) {
  const [data, setData] = useState();
  const roomId = params.roomId;
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isOwner, setIsOwner] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/rooms/getRoom/${roomId}`);
      const data = await res.json();
      setData(data.room);

      const checkOwner = async () => {
        if (data) {
          const roomOwner = data.room.UserCreated.id;
          setIsOwner(roomOwner === userId);
        }
      };
      const checkSlots = async () => {
        if (data) {
          const usedslots = data.room.useSlots;
          const awailableslots = data.room.slots;
          setIsFree(usedslots < awailableslots);
        }
      };
      checkOwner();
      checkSlots();
    };

    fetchData();
  }, [roomId, userId]);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0") - 2;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleJoining = async () => {
    const isJoined = await fetch(`/api/rooms/joinroom/${userId}/${roomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (isJoined.ok) {
      window.location.reload();
      return "success";
    }
  };

  const handleBack = async () => {
    router.push("/dashboard");
  };

  const handleslots = () => {
    if (data.useSlots >= data.slots) {
      return (
        <div className="text-2xl flex justify-center items-center pt-16 pr-16 text-white bg-[#A92424] absolute md:-top-24 md:-right-24 -top-24 -right-24 w-52 h-52 6 border-2 border-white rounded-full">
          {data.useSlots}/{data.slots}
        </div>
      );
    } else {
      return (
        <div className="text-2xl flex justify-center items-center pt-16 pr-16 text-white bg-[#0A390C] absolute md:-top-24 md:-right-24 -top-24 -right-24 w-52 h-52 6 border-2 border-white rounded-full">
          {data.useSlots}/{data.slots}
        </div>
      );
    }
  };

  return (
    <>
      {data && (
        <div className="bg-gray-200 w-full h-screen flex flex-col mx-auto relative overflow-hidden">
          <div>
            <h1 className="text-4xl text-center mt-16">Pokoj {data.name} </h1>
            <div className="w-full md:flex md:flex-row justify-end">
              {handleslots()}
            </div>
            <button
              onClick={handleBack}
              className="absolute top-0 left-0 mt-9 ml-9 text-4xl bg-white rounded-full border-2 border-black"
            >
              <IoMdArrowRoundBack />
            </button>
            {isOwner ? (
              <RemoveRoomButton roomId={roomId} userId={userId} />
            ) : (
              isFree && (
                <JoinButton
                  roomId={roomId}
                  userId={userId}
                  Joinexit={handleJoining}
                />
              )
            )}
            <div className="text-2xl ml-9 text-center mt-16">
              Cena: {data.cost} zł{" "}
            </div>
            <div className="absolute bottom-0 left-0 mb-9 ml-9">
              <div>Utworzono {formatDate(data.createdAt)} </div>
              <div>Data Zakończenia: {formatDate(data.time)} </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
