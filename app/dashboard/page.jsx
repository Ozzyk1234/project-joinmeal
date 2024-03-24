import React from "react";
import MainContent from "@/components/MainContent";
import DashboardLayout from "@/components/DashboardLayout";
export default function Dashboard() {
  return (
    <div className="w-full h-screen">
      <DashboardLayout>
        <MainContent />
      </DashboardLayout>
    </div>
  );
}
