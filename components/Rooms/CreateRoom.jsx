import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function CreateRoom({ onClose }) {
  const [formData, setFormData] = useState({});
  const { data: session } = useSession();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        const response = await fetch(
          `/api/rooms/createRoom/${session.user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          onClose(); // Close the form after updating data
        } else {
          console.error("Błąd podczas tworzenia pokoju");
        }
      } catch (error) {
        console.error("Błąd podczas wysyłania żądania:", error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:mt-9">
        <button onClick={onClose}>
          <IoMdArrowRoundBack className="md:ml-9 ml-4 -mt-24 md:mt-9 text-3xl" />
        </button>
        <form
          onSubmit={handleFormSubmit}
          className="md:w-[800px] md:h-[500px] w-[90%] h-[500px] bg-gray-200 rounded-xl mx-auto flex flex-col items-center justify-center mt-24 md:mt-0"
        >
          <label htmlFor="roomName">Nazwa pokoju</label>
          <input
            type="text"
            name="roomName"
            placeholder="..."
            value={formData.roomName}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg mb-5"
            required
          />
          <label htmlFor="slots">Liczba osób możliwych do dołączenia</label>
          <input
            type="text"
            name="slots"
            placeholder="..."
            value={formData.slots}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg mb-5"
            required
          />
          <label htmlFor="formattedDate">Czas zakończenia</label>
          <input
            type="datetime-local"
            name="formattedDate"
            placeholder="..."
            value={formData.formattedDate}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg mb-5"
            required
          />
          <label htmlFor="cost">Cena przygotowania posiłku</label>
          <input
            type="number"
            name="cost"
            placeholder="..."
            value={formData.cost}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 w-24 mt-12 h-12 text-white bg-[#0A390C] rounded-lg"
          >
            Utwórz
          </button>
        </form>
      </div>
    </>
  );
}
