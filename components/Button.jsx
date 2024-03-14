import Link from "next/link";
import React, { useState } from "react";

export default function Button({ name, action }) {
  return (
    <div>
      <Link href={action}>
        <button className="bg-red-600 py-3 px-5 rounded-full hover:bg-white hover:text-red-600 transition-all duration-100">
          {name}
        </button>
      </Link>
    </div>
  );
}
