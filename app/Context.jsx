"use client";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
// Step 1: Create a context to hold the user data
const UserDataContext = createContext();

// Step 2: Create a context provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserData = async () => {
        const userId = await session.user.id;
        const response = await fetch(`/api/userDetails/${userId}`);
        const userData = await response.json();
        setUserData(userData);
      };
      fetchUserData();
    }
  }, [session?.user?.id]);
  const cachedUserData = useMemo(() => userData, [userData]);

  return (
    <UserDataContext.Provider value={{ userData: cachedUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return React.useContext(UserDataContext);
};
