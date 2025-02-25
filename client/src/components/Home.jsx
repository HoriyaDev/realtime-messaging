import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Navigation from "./navigation/Navigation";
import { ChatProvider } from "../context/ChatContext";
import { useChat } from "../context/ChatContext";

const Home = () => {
  const { selectedUser } = useChat(); // Selected user from context
  const [userInfo, setUserInfo] = useState({ name: "", image: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserInfo({ name: parsedData.name, image: parsedData.image });
    }
  }, []);

  return (
  
      <div className="flex h-screen">
        {/* Navigation: Hide on small screens if user is selected */}
        <div className={`${selectedUser ? "hidden sm:block" : "block"} w-1/4`}>
          <Navigation />
        </div>

        {/* Chat: Show only if a user is selected */}
        <div className={` ${selectedUser ? "block" : "hidden sm:block"} flex-1 `}>
          {selectedUser ? <Chat /> :  <div className="w-2/3 ml-auto absolute right-0 flex items-center justify-center h-screen bg-slate-700">
        <p className="text-gray-500 text-lg">Select a user to start chatting</p>
      </div>}
        </div>
      </div>
  
  );
};

export default Home;
