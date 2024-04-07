import React from "react";
import MainContent from "../../components/Rooms/MainContent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
export default function Dashboard() {
  return (
    <div className="w-full h-screen">
      <DashboardLayout>
        <MainContent />
      </DashboardLayout>
    </div>
  );
}
