import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { IoCall, IoVideocam } from "react-icons/io5";
import { useChat } from "../context/ChatContext";


const Chat = () => {
  const [input, setInput] = useState({ message: "" });
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useChat();

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // If no user is selected, show a message
  if (!selectedUser) {
    return (
      <div className="w-2/3 ml-auto absolute right-0 flex items-center justify-center h-screen bg-slate-700">
        <p className="text-gray-500 text-lg">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 ml-auto absolute right-0 flex flex-col justify-between h-screen bg-slate-700 dark:bg-orange-300">
      {/* Header */}
      <header className="bg-slate-200 dark:bg-zinc-700 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="Profile.jpg"
            className="w-12 h-12 object-cover rounded-full p-2"
            alt="Profile"
          />
          <h1 className="text-black dark:text-white ml-2">{selectedUser.name}</h1>
        </div>
        <div className="flex items-center mr-4">
          <IoCall size={25} className="text-black dark:text-white cursor-pointer" />
          <IoVideocam size={25} className="text-black dark:text-white ml-4 cursor-pointer" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded-md">
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center">
        <input
          type="text"
          className="p-2 w-full border-2 rounded-md"
          placeholder="Type a message"
          name="message"
          onChange={handleInput}
          value={input.message}
        />
        <button className="p-3 bg-blue-500 text-white rounded-md ml-2">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
