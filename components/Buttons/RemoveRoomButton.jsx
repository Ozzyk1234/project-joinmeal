import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RemoveRoomButton({ roomId, userId }) {
  const router = useRouter();
  const RemoveRoom = async () => {
    const removeRoom = await fetch(
      `/api/rooms/removeRoom?userId=${userId}&roomId=${roomId}`
    );
    if (removeRoom) {
      router.push("/dashboard");
    }
  };
  return (
    <button
      onClick={RemoveRoom}
      className="bg-[#A92424] ml-9 mt-9 text-white rounded-lg  px-6 py-2"
    >
      Usuń Pokój
    </button>
  );
}
