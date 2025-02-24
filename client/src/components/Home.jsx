import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Navigation from "./navigation/Navigation";
import Header from "./header/Header";
import { ChatProvider } from "../context/ChatContext";

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
 <ChatProvider>

<div className="flex h-screen">
  <Navigation />
  
  <div className="flex-1 hidden sm:block"> {/* Hide on small screens, show on larger screens */}
    <Chat />
  </div>
</div>
 </ChatProvider>
  );
};

export default Home;