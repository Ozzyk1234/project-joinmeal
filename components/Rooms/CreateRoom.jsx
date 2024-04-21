import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const dishes = [
  { id: 1, src: "/chicken.png", alt: "Dish 1" },
  { id: 2, src: "/Pasta.png", alt: "Dish 2" },
  { id: 3, src: "/Broccoli.png", alt: "Dish 3" },
  { id: 4, src: "/ramen.png", alt: "Dish 4" },
  { id: 5, src: "/Lasagne.png", alt: "Dish 5" },
  { id: 6, src: "/Ciacho.png", alt: "Dish 5" },
  { id: 7, src: "/Hamburger.png", alt: "Dish 5" },
  { id: 8, src: "/Taco.png", alt: "Dish 5" },
];

export default function CreateRoom({ onClose }) {
  const [formData, setFormData] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);

  const { data: session } = useSession();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const selectDish = (id) => {
    setSelectedDish(id);
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
          onClose();
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
          <IoMdArrowRoundBack className="md:ml-9 ml-4 -mt-24 md:-mt-32 text-3xl" />
        </button>
        <form
          onSubmit={handleFormSubmit}
          className="md:w-fit md:h-fit w-[90%] p-16 h-[500px] bg-gray-200 rounded-xl mx-auto flex flex-col items-center justify-center mt-24 md:mt-0"
        >
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex flex-col items-center justify-center w-[300px] h-[230px]">
              <label htmlFor="roomName">Nazwa pokoju</label>
              <input
                type="text"
                name="roomName"
                placeholder="..."
                value={formData.roomName}
                onChange={handleInputChange}
                className="w-56 h-9 pl-2 rounded-lg"
                required
              />
              <label htmlFor="slots">Liczba miejsc</label>
              <input
                type="text"
                name="slots"
                placeholder="..."
                value={formData.slots}
                onChange={handleInputChange}
                className="w-56 h-9 pl-2 rounded-lg"
                required
              />
              <label htmlFor="formattedDate">Czas zakończenia</label>
              <input
                type="datetime-local"
                name="formattedDate"
                placeholder="..."
                value={formData.formattedDate}
                onChange={handleInputChange}
                className="w-56 h-9 pl-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center w-[300px] h-[230px]">
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
              <label className="block" htmlFor="dishtype">
                Typ posiłku
              </label>
              <select
                className="w-56 h-9 pl-2 rounded-lg"
                id="dishtype"
                name="dishtype"
                value={formData.dishtype}
                onChange={handleInputChange}
              >
                <option>Śniadanie</option>
                <option>Drugie śniadanie</option>
                <option>Lunch</option>
                <option>Podwieczorek</option>
                <option>Kolacja</option>
                <option>Przekąski</option>
              </select>
              <label className="block" htmlFor="categoryofMeal">
                Typ posiłku
              </label>
              <select
                className="w-56 h-9 pl-2 rounded-lg"
                id="categoryofMeal"
                name="categoryofMeal"
                value={formData.categoryofMeal}
                onChange={handleInputChange}
              >
                <option>Azjatycka</option>
                <option>Włoska</option>
                <option>Francuska</option>
                <option>Hiszpańska</option>
                <option>Brytyjska</option>
                <option>Amerykańska klasyczna</option>
                <option>Meksykańska</option>
                <option>Turecka</option>
                <option>Afrykańska</option>
                <option>Wegetariańska</option>
                <option>Wegańska</option>
                <option>Inne...</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 w-full gap-12 items-center justify-center">
            {dishes.map((dish) => (
              <Image
                key={dish.id}
                src={dish.src}
                alt={dish.alt}
                width={75}
                height={75}
                onClick={() => selectDish(dish.id)}
                className={
                  selectedDish === dish.id
                    ? "border-4 border-b-gray-400"
                    : "dish"
                }
              />
            ))}
          </div>

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
