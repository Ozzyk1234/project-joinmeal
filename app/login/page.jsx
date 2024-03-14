"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Wprowadzono nieprawidłowe dane!");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#0A390C] w-[350px] md:w-[500px]">
        <h1 className="text-xl font-bold my-4">Podaj dane do zalogowania.</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            placeholder="Podaj email..."
            className="border-2 py-2 px-4"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="mt-3">
            Hasło:
          </label>
          <input
            type="password"
            placeholder="Podaj hasło..."
            className="border-2 py-2 px-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#0A390C] py-3 px-5 text-white font-bold rounded-lg mt-9"
          >
            Zaloguj się!
          </button>
          {error && (
            <div className="bg-[#A92424] text-center text-white py-3 px-5 rounded-lg mt-3">
              {error}
            </div>
          )}
          <Link href={"/register"} className="text-right mt-9">
            Nie utworzyłeś jeszcze konta?{" "}
            <span className="underline">Zarejestruj się!</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
