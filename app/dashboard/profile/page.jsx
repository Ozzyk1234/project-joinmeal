"use client";

import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import EditProfile from "../../../components/Profile/EditProfile";
import ProfilInfo from "../../../components/Profile/ProfilInfo";
import ProfilPhoto from "../../../components/Profile/ProfilPhoto";
import ProfileSettings from "../../../components/Profile/ProfileSettings";
import { useState } from "react";

import { FaGears } from "react-icons/fa6";

export default function Profile() {
  const [profileSettings, OpenProfileSettings] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const HandleClose = () => {
    setOpenEdit(false);
  };

  const HandleOpen = async () => {
    setOpenEdit(true);
  };

  return (
    <DashboardLayout>
      <div className="w-[100%] h-screen bg-gray-1 items-center flex flex-col pt-16">
        <div className="flex flex-row h-screen md:w-[80%] w-full md:border-r-[1px] md:border-l-[1px] md:border-gray-300">
          <button
            onClick={() =>
              profileSettings
                ? OpenProfileSettings(false)
                : OpenProfileSettings(true)
            }
          >
            <FaGears className="absolute md:mt-20 md:mr-52 mt-20 mr-5 text-3xl top-0 right-0" />
          </button>

          {profileSettings && <ProfileSettings onOpen={HandleOpen} />}
          <ProfilPhoto />

          {openEdit ? <EditProfile onClose={HandleClose} /> : <ProfilInfo />}
        </div>
      </div>
    </DashboardLayout>
  );
}
