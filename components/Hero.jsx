import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="h-screen w-full flex items-center justify-center text-black">
      <div className="w-[90%] h-fit flex md:flex-row flex-col mt-18 md:mt-0 justify-between">
        <div className="flex flex-col items-center justify-center md:max-w-[40%] md:ml-28 mt-[-20px]">
          <div className="flex flex-col text-left ">
            <h2 className="text-2xl font-semibold text-center md:text-start">
              Pysznie, tanio, wspólnie...
            </h2>
            <h1 className="text-8xl font-semibold mt-4 text-center md:text-start">
              JoinMeal
            </h1>
            <h3 className="text-xl text-justify mt-9 md:text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              incidunt quisquam dignissimos, mollitia deleniti eum adipisci ipsa
              placeat modi asperiores, expedita blanditiis. Distinctio itaque
              non quas maiores mollitia perspiciatis qui!
            </h3>
          </div>
        </div>
        <div>
          <Image
            src="/tlo.png"
            alt="Pizza"
            width={1200}
            height={400}
            className="hidden md:inline-block"
          ></Image>
        </div>
      </div>
    </div>
  );
}
