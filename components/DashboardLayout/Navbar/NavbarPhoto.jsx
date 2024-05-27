import Image from "next/image";
import Link from "next/link";

export default function NavbarPhoto({ userImage, userId }) {
  const renderUserImage = () => {
    if (!userImage) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
        </div>
      );
    }

    const base64Image = Buffer.from(userImage.picture).toString("base64");
    const encodedImage = atob(base64Image);
    return (
      <div className="w-10 h-10 overflow-hidden rounded-full border-black border-[1px]">
        <Image
          src={encodedImage}
          alt="User Image"
          width={50}
          height={50}
          className="object-cover"
        />
      </div>
    );
  };

  return <Link href={`/dashboard/profile/${userId}`}>{renderUserImage()}</Link>;
}
