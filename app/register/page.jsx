"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rpassword: "",
    username: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, rpassword, username } = formData;

    if (!email || !password || !rpassword || !username) {
      setError("Nie wypełniono wszystkich pól!");
      return;
    }

    if (password !== rpassword) {
      setError("Hasła nie są identyczne!");
      return;
    }

    if (password.length < 8) {
      setError("Hasło jest za krótkie!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          email: "",
          password: "",
          rpassword: "",
          username: "",
        });
        setError("");
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      console.error("Podczas rejestracji wystąpił błąd: ", error);
      setError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#0A390C] w-[350px] md:w-[500px] bg-white">
        <h1 className="text-xl font-bold my-4">Podaj dane dla nowego konta.</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="username" className="mt-3">
            Nazwa użytkownika:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            placeholder="Nazwa użytkownika..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="email" className="mt-3">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="password" className="mt-3">
            Hasło:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Hasło..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
            autoComplete="off"
          />
          <label htmlFor="rpassword" className="mt-3">
            Powtórz Hasło:
          </label>
          <input
            type="password"
            id="rpassword"
            name="rpassword"
            value={formData.rpassword}
            placeholder="Powtórz hasło..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-[#0A390C] py-3 px-5 text-white font-bold rounded-lg mt-9"
          >
            Zarejestruj się!
          </button>
          {error && (
            <div className="bg-[#A92424] text-center text-white py-3 px-5 rounded-lg mt-3">
              {error}
            </div>
          )}
        </form>
        <p className="text-right mt-3">
          Posiadasz już konto?{" "}
          <a href="/login" className="underline">
            Zaloguj się!
          </a>
        </p>
      </div>
    </div>
  );
}
