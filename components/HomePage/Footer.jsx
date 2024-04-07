import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-gray-300 w-full mt-9">
        <p className="text-center">
          &copy; {new Date().getFullYear()} JoinMeal. Wszelkie prawa
          zastrzeżone.
        </p>
      </footer>
    </>
  );
}
