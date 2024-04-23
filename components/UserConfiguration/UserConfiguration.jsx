"use client";
import { useState } from "react";

const UserConfiguration = ({ userid }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Kobieta",
    building: "Bliźniak",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/userconfiguration?userId=${userid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50
     "block"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-50">
        <button className="absolute top-2 right-2">Close</button>
        <h2 className="text-xl font-bold mb-4">Uzupełnij dane</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="firstName">
              Imię
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="lastName">
              Nazwisko
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="birthDate">
              Data urodzenia
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="gender">
              Płeć
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option>Kobieta</option>
              <option>Mężczyzna</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="building">
              Budynek
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              id="building"
              name="building"
              value={formData.building}
              onChange={handleChange}
            >
              <option>Bliźniak</option>
              <option>Maluch</option>
              <option>Herkules</option>
              <option>Skrzat</option>
            </select>
          </div>
          <button
            className="bg-[#0A390C] text-white py-2 px-4 rounded hover:bg-[#19491b] mx-auto w-full"
            type="submit"
          >
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserConfiguration;
