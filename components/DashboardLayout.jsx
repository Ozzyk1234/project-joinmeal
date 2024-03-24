import React from "react";
import NavBarLogged from "@/components/NavBarLogged";
import SideBar from "@/components/SideBar";
import Messages from "@/components/Messages";
export default function DashboardLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <NavBarLogged />
      <SideBar />
      <Messages />
      {children}
    </div>
  );
}
