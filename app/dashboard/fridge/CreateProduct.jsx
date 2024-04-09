import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateProduct({ onClose }) {
  const [isAdded, setIsAdded] = useState(false);
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    idUser: session.user.id,
    name: "",
    expiryDate: "",
    cost: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "cost" ? parseInt(value) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/fridge/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setIsAdded(true);
        setFormData({ idUser: 1, name: "", expiryDate: "", cost: 0 });
      } else {
        console.error("Błąd podczas dodawania produktu");
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania żądania:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-9">
        <button onClick={onClose}>
          <IoMdArrowRoundBack className="ml-9 text-3xl" />
        </button>
        <form
          onSubmit={handleFormSubmit}
          className="relative w-[800px] h-[500px] bg-gray-200 rounded-xl mx-auto flex flex-col items-center justify-center"
        >
          <label htmlFor="name">Nazwa produktu</label>
          <input
            type="text"
            name="name"
            placeholder="..."
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg mb-5"
            required
          />
          <label htmlFor="expiryDate">Data ważności</label>
          <input
            type="datetime-local"
            name="expiryDate"
            placeholder="..."
            value={formData.expiryDate || ""}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg mb-5"
            required
          />

          <label htmlFor="cost">Cena</label>
          <input
            type="number"
            name="cost"
            placeholder="..."
            value={formData.cost || 0}
            onChange={handleInputChange}
            className="w-56 h-9 pl-2 rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 w-24 mt-12 h-12 text-white bg-[#0A390C] rounded-lg"
          >
            Dodaj
          </button>
          {isAdded && (
            <p className=" absolute bottom-10 text-center text-green-500">
              Produkt został dodany!
            </p>
          )}
        </form>
      </div>
    </>
  );
}
