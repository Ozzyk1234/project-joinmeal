"use client";
import { useState, useEffect } from "react";
import MainContent from "../../components/Rooms/MainContent";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { useSession } from "next-auth/react";
import UserConfiguration from "../../components/UserConfiguration/UserConfiguration";
export default function Dashboard() {
  const [isConfigurated, setIsConfigurated] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchuserConfiguration = async () => {
      if (userId) {
        const userConfiguration = await fetch(
          `/api/userconfiguration?userId=${userId}`
        );
        const data = await userConfiguration.json();
        setIsConfigurated(data.isConfigured);
        console.log(data);
      }
    };
    fetchuserConfiguration();
  }, [userId]);

  return (
    <div className="w-full h-screen">
      {isConfigurated ? (
        <DashboardLayout>
          <MainContent />
        </DashboardLayout>
      ) : (
        <UserConfiguration userid={userId} />
      )}
    </div>
  );
}
