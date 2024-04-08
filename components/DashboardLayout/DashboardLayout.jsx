import NavBarLogged from "./Navbar/NavBarLogged";
import SideBar from "./SideBar";
import Messages from "./Messages";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <NavBarLogged />
      <SideBar />
      <Messages />
      {children}
    </div>
  );
};

export default DashboardLayout;
