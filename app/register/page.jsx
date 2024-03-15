"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !rpassword || !username) {
      setError("Nie wypełniono wszystkich pól!");
      return;
    }

    if (password !== rpassword) {
      setError("Hasła nie są identyczne!");
      return;
    }

    if (!(password.length >= 8)) {
      setError("Hasło jest za krótkie!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setError("");
      } else {
        const message = await res.json();
        setError(message.message);
      }
    } catch (error) {
      console.log("Podczas rejestracji wystąpił błąd: " + error);
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
            placeholder="Nazwa użytkownika..."
            className="border-2 py-2 px-4"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="false"
          />
          <label htmlFor="email" className="mt-3">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email..."
            className="border-2 py-2 px-4"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="false"
          />
          <label htmlFor="password" className="mt-3">
            Hasło:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Hasło..."
            className="border-2 py-2 px-4"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="false"
          />
          <label htmlFor="rpassword" className="mt-3">
            Powtórz Hasło:
          </label>
          <input
            type="password"
            id="rpassword"
            placeholder="Powtórz hasło..."
            className="border-2 py-2 px-4"
            onChange={(e) => setRPassword(e.target.value)}
            autoComplete="false"
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
          <Link href={"/login"} className="text-right mt-9">
            Posiadasz już konto? <span className="underline">Zaloguj się!</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
