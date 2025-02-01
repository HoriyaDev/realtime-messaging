import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Navigation from "./components/navigation/Navigation";
import ChatListModal from "./components/modal/ChatListModal"; // Import ChatListModal
import Sidebar from "./components/Sidebar";

const Home = () => {
  const [userInfo, setUserInfo] = useState({ name: "", image: "" });

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse the JSON data
      setUserInfo({ name: parsedData.name, image: parsedData.image }); // Set name and image
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Navigation />
     
      <Chat />
    </div>
  );
};

export default Home;
