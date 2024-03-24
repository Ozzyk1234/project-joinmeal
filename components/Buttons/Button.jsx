import Link from "next/link";
import React from "react";

export default function Button({ name, action }) {
  return (
    <div>
      <Link href={action}>
        <button className="bg-[#0A390C] py-3 px-5 rounded-full hover:bg-white hover:text-[#0A390C] transition-all duration-100">
          {name}
        </button>
      </Link>
    </div>
  );
}
