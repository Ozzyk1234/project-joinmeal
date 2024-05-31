"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DashboardLayout from "../../../../components/DashboardLayout/DashboardLayout";
import Image from "next/image";
import { useSession } from "next-auth/react";
Modal.setAppElement("#root");

export default function Room({ params }) {
  const kitchenId = params.kitchenId;
  const [kitchens, setKitchens] = useState([]);
  const [usedSlots, setUsedSlots] = useState(null);
  const [isAvailable, setIsAvailable] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { data: session } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    const getKitchen = async () => {
      const fetchData = await fetch(`/api/kitchen/onefloor/${kitchenId}`);
      const data = await fetchData.json();
      setKitchens(data);
      setIsAvailable(new Array(data.slots).fill(true));
    };
    getKitchen();
    const getusedslots = async () => {
      const fetchData = await fetch(`/api/kitchen/countUser/${kitchenId}`);
      const data = await fetchData.json();
      setUsedSlots(data);
    };

    getusedslots();
  }, [kitchenId]);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen); // Odwróć stan modala
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleform = async (e) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        const requestData = {
          ...formData,
          userId: session.user.id, // Dodaj ID użytkownika do danych formularza
          kitchenId: kitchenId, // Dodaj ID kuchni do danych formularza
        };

        const response = await fetch(`/api/kitchen/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        console.log(response.status);
        if (response.ok) {
          window.location.reload();
        } else if (response.status === 500) {
          setError("Użytkownik posiada już rezerwację!");
        } else {
          console.error("Błąd podczas aktualizacji danych");
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error);
      }
    }
  };

  const getKitchens = () => {
    const kitchenImages = [];
    if (kitchens && usedSlots) {
      for (let j = 0; j < usedSlots.count; j++) {
        isAvailable[j] = false;
      }

      for (let i = 0; i < kitchens.slots; i++) {
        kitchenImages.push(
          <div key={i}>
            <div
              className={`border-black border-[1px] rounded-full w-9 h-9 ${
                isAvailable[i] ? "bg-[#317c35]" : "bg-[#9c2c2c]"
              }`}
            />
            <Image src={"/Stove.png"} alt="Kuchenka" width={300} height={70} />
          </div>
        );
      }
    }

    return kitchenImages;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const currentDate = getCurrentDate();

  const getMaxReservationDate = () => {
    const today = new Date();
    today.setHours(today.getHours() + 2); // Dodaj 2 godziny
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const maxReservationDate = getMaxReservationDate();

  return (
    <DashboardLayout>
      <div className="w-[80%] h-screen border-r-[1px] border-l-[1px] border-gray-200 ml-[10%] pt-24 flex flex-col items-center">
        {usedSlots && kitchens && (
          <div className="w-full h-fit">
            <h1 className="text-center text-4xl mt-9">
              Kuchnia: Piętro {kitchens.floor}
            </h1>

            <div className="mt-9 text-2xl w-full flex flex-row justify-between">
              <button
                className="bg-[#0A390C] text-white text-xl ml-9 px-4 border-white border-[1px] rounded-lg"
                onClick={toggleModal}
              >
                Zarezerwuj!
              </button>
              <h2 className=" bg-[#0A390C] w-16 h-16 p-2 items-center flex justify-center mr-9 text-white rounded-full border-white border-[1px]">
                {usedSlots.count}/{kitchens.slots}
              </h2>
            </div>
            <div className="w-[100%] flex flex-col items-center justify-center ml-0 mr-0">
              <div className="grid grid-cols-2 w-[50%]">{getKitchens()}</div>
            </div>
          </div>
        )}
        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Kolor tła modalu
            },
            content: {
              width: "50%", // Szerokość modala
              height: "50%", // Wysokość modala
              margin: "auto", // Wyśrodkowanie modala
            },
          }}
        >
          <h2 className="text-center">Wybierz czas rezerwacji</h2>
          <form
            onSubmit={handleform}
            className="w-full flex flex-col justify-center mt-9 items-center"
          >
            <input
              type="datetime-local"
              min={currentDate}
              max={maxReservationDate}
              name="time"
              className="text-2xl"
              onChange={handleInputChange}
            />
            <input type="hidden" name="userId" value={session?.user?.id} />
            <input type="hidden" name="kitchenId" value={kitchenId} />
            <button type="submit" className="text-xl mt-9">
              Zarezerwuj!
            </button>
          </form>
          {error && (
            <h1 className="text-xl bg-red-700 text-white p-2 text-center mt-9">
              {error}
            </h1>
          )}
          <div className="w-full flex flex-row justify-center">
            <button
              onClick={toggleModal}
              className="flex flex-row justify-center mt-16 "
            >
              Anuluj
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
