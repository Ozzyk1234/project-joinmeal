"use client";
import { useState, useEffect } from "react";

export default function JoinButton({ userId, roomId, Joinexit }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnswer = async () => {
      const res = await fetch(`/api/rooms/joinroom/${userId}/${roomId}`);
      const data = await res.json();
      setData(data);
    };
    fetchAnswer();
  }, [roomId, userId]);

  const checkJoining = () => {
    if (data) {
      if (data.message === false) {
        return (
          <button
            onClick={Joinexit}
            className="bg-[#0A390C] ml-9 mt-9 text-white rounded-lg  px-6 py-2"
          >
            Dołącz
          </button>
        );
      } else
        return (
          <button
            onClick={Joinexit}
            className="bg-[#A92424] ml-9 mt-9 text-white rounded-lg  px-6 py-2"
          >
            Zrezygnuj
          </button>
        );
    }
  };
  return <div>{checkJoining()}</div>;
}
