import React from "react";
import NavBarLogged from "./Navbar/NavBarLogged";
import SideBar from "./SideBar";
import Messages from "./Messages";

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
