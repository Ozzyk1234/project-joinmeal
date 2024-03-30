"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (res.error) {
        setError("Wprowadzono nieprawidłowe dane!");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setError("Wystąpił błąd. Spróbuj ponownie później.");
      setLoading(false);
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
            name="email"
            value={credentials.email}
            placeholder="Podaj email..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
          />
          <label htmlFor="password" className="mt-3">
            Hasło:
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Podaj hasło..."
            className="border-2 py-2 px-4"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-[#0A390C] py-3 px-5 text-white font-bold rounded-lg mt-9 relative"
          >
            {loading ? "Ładowanie..." : "Zaloguj się!"}
            {loading && (
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            )}
          </button>
          {error && (
            <div className="bg-[#A92424] text-center text-white py-3 px-5 rounded-lg mt-3">
              {error}
            </div>
          )}
        </form>
        <p className="text-right mt-3">
          Nie utworzyłeś jeszcze konta?{" "}
          <a href="/register" className="underline">
            Zarejestruj się!
          </a>
        </p>
      </div>
    </div>
  );
}
