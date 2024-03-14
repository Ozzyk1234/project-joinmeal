"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-[500px] border rounded-lg shadow-lg bg-gray-300 p-9">
      <h1 className="text-xl mb-3">
        Witaj, <span className="text-black">{session?.user?.userName}</span>
      </h1>

      <p>
        Adres e-mail: <span className="text-black">{session?.user?.email}</span>
      </p>
      <p>
        Id: <span className="text-black">{session?.user?.id}</span>
      </p>
      <button
        onClick={() => signOut()}
        className="items-center mt-6 bg-[#A92424] text-white rounded-lg px-6 py-2"
      >
        Wyloguj się!
      </button>
    </div>
  );
}
