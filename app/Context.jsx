// "use client";
// import React, { createContext, useState, useEffect, useMemo } from "react";
// import { useSession } from "next-auth/react";

// const UserDataContext = createContext();

// export const UserDataProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (session?.user?.id) {
//           const userId = session.user.id;
//           const response = await fetch(`/api/userDetails/${userId}`);
//           if (!response.ok) {
//             throw new Error("Failed to fetch user data");
//           }
//           const userData = await response.json();
//           setUserData(userData);
//           setError(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setError("Error fetching user data");
//       }
//     };

//     fetchUserData();
//   }, [session?.user?.id]);

//   const cachedUserData = useMemo(() => userData, [userData]);

//   return (
//     <UserDataContext.Provider value={{ userData: cachedUserData, error }}>
//       {children}
//     </UserDataContext.Provider>
//   );
// };

// export const useUserData = () => {
//   return React.useContext(UserDataContext);
// };
