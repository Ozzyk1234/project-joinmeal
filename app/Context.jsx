import React, { createContext, useState, useEffect } from "react";

// Step 1: Create a context to hold the user data
const UserDataContext = createContext();

// Step 2: Create a context provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Perform data fetching here
        const response = await fetch("/api/userData");
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, loading }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Step 3: Custom hook to access user data
export const useUserData = () => {
  return useContext(UserDataContext);
};
