"use client";

import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";
import EditProfile from "../../../components/Profile/EditProfile";
import ProfilPhoto from "../../../components/Profile/ProfilPhoto";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="w-[100%] h-screen bg-gray-1 items-center flex flex-col pt-16">
        <div className="flex flex-row h-screen md:w-[80%] w-full md:border-r-[1px] md:border-l-[1px] md:border-gray-300">
          <ProfilPhoto />

          <EditProfile />
        </div>
      </div>
    </DashboardLayout>
  );
}
