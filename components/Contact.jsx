import React from "react";

export default function Contact() {
  return (
    <>
      <div id="contact" className="-mt-40" />
      <div className="w-full h-fit mt-40">
        <h1 className="text-center text-5xl pt-16">Kontakt</h1>
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#0A390C] w-[350px] md:w-[500px] bg-white mx-auto mt-16">
          <h1 className="text-xl font-bold my-4 text-center">Napisz do nas!</h1>
          <form onSubmit={""} className="flex flex-col">
            <label htmlFor="email" className="mt-3">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
              className="border-2 py-2 px-4"
            />
            <label htmlFor="email" className="mt-3">
              Wiadomość:
            </label>
            <textarea
              rows={10}
              type="email"
              id="email"
              name="email"
              placeholder="Wiadomość"
              className="border-2 py-2 px-4"
              style={{ resize: "none" }}
            />
            <button
              type="submit"
              className="bg-[#0A390C] py-3 px-5 text-white font-bold rounded-lg mt-9"
            >
              Wyślij!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
