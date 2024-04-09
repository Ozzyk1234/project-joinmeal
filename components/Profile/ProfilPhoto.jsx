import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ProfilPhoto() {
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState("");
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/userImage/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();

        if (data.picture) {
          const userImage = data.picture;
          const base64Image = Buffer.from(userImage).toString("base64");
          const encodedImage = atob(base64Image);
          setUserImage(encodedImage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [session?.user?.id]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async function (event) {
      const image = event.target.result;

      try {
        const response = await fetch(`/api/userImage/${session?.user?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ picture: image }), // Sending the image as JSON data
        });
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        // Handle success if needed
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
    reader.readAsDataURL(file);
    window.location.reload();
  };

  return (
    <div className="border-r-[1px] border-gray-500 bg-gray-200 flex flex-col md:w-[30%] w-[40%] items-center">
      <label
        htmlFor="fileInput"
        className="cursor-pointer md:relative md:h-[240px] md:w-[240px] -z-1"
      >
        <div className="rounded-full border-2 border-black overflow-hidden mt-16 w-[100px] h-[100px] md:w-fit md:h-fit">
          {userImage ? (
            <div className="md:w-[240px] md:h-[240px]">
              <Image
                src={userImage}
                alt="user_photo"
                width={245}
                height={245}
                priority
                className="hidden md:inline"
              />
              <Image
                src={userImage}
                alt="user_photo"
                width={100}
                height={100}
                priority
                className="md:hidden"
              />
            </div>
          ) : (
            // <div className="w-[250px] h-[250px] bg-white rounded-full animate-ping"></div>
            <p></p>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="fileInput"
          name="file"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/50 opacity-100 transition-all duration-300 rounded-full md:w-[240px] md:h-[242px] w-[100px] h-[100px] md:top-16 top-32 md:ml-[1%] ml-[4%]">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
            Edytuj
          </div>
        </div>
      </label>
    </div>
  );
}
