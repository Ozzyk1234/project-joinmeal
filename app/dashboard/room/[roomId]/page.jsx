"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import JoinButton from "../../../../components/Buttons/JoinButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function Room({ params }) {
  const [data, setData] = useState();
  const [remainingTime, setRemainingTime] = useState("");
  const [intervalId, setIntervalId] = useState(null); // Dodajemy stan do przechowywania ID interwału
  const roomId = params.roomId;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3000/api/rooms/getRoom/${roomId}`
      );
      const data = await res.json();
      setData(data.room);
      startTimer(data.room.time); // Rozpoczynamy odliczanie po pobraniu danych
    };

    fetchData();

    // Zatrzymujemy odliczanie po opuszczeniu komponentu
    return () => clearInterval(intervalId);
  }, [roomId]);

  // Funkcja rozpoczynająca odliczanie czasu
  const startTimer = (endTime) => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end - now;

      // Jeśli czas upłynął, zatrzymujemy odliczanie
      if (difference <= 0) {
        clearInterval(interval);
        setRemainingTime("Czas minął");
      } else {
        // Konwersja różnicy czasu na godziny, minuty i sekundy
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    setIntervalId(interval); // Zapisujemy ID interwału w stanie komponentu
  };

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleJoining = async () => {
    const isJoined = await fetch(
      `http://localhost:3000/api/rooms/joinroom/${userId}/${roomId}`,
      { method: "POST", headers: { "Content-Type": "application/json" } }
    );
    if (isJoined.ok) {
      window.location.reload();
      return "success";
    }
  };

  return (
    <>
      {data && (
        <div className="bg-gray-200 w-full h-screen flex flex-col mx-auto relative overflow-hidden">
          <div>
            <h1 className="text-4xl text-center mt-16">Pokoj {data.name} </h1>
            <div className="w-full md:flex md:flex-row justify-end">
              <div className="text-2xl flex justify-center items-center pt-16 pr-16 text-white bg-[#0A390C] absolute md:-top-24 md:-right-24 -top-24 -right-24 w-52 h-52 6 border-2 border-white rounded-full">
                {data.useSlots}/{data.slots}
              </div>
            </div>
            <Link
              href={`/dashboard`}
              className="absolute top-0 left-0 mt-9 ml-9 text-4xl bg-white rounded-full border-2 border-black"
            >
              <IoMdArrowRoundBack />
            </Link>
            <div className="text-2xl ml-9">Cena: {data.cost} zł </div>
            <JoinButton
              roomId={roomId}
              userId={userId}
              Joinexit={handleJoining}
            />
            <div className="absolute bottom-0 left-0 mb-9 ml-9">
              <div>Utworzono {formatDate(data.createdAt)} </div>
              <div>Data Zakończenia: {formatDate(data.time)} </div>
              <div>Pozostały czas: {remainingTime}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
