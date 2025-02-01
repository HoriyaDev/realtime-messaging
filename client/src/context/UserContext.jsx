import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
