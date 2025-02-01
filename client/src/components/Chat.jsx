import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

const Chat = () => {
  const [input, setInput] = useState({ message: "" });
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("room1"); // Example room name (dynamic for one-to-one)

  // Join the room on initial render
  useEffect(() => {
    socket.emit("joinRoom", room);
    console.log(`Joined room: ${room}`);
  }, [room]);

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (input.message.trim()) {
      socket.emit("client", { room, message: input.message }); // Include room and message
      setMessages((prev) => [...prev, { id: socket.id, message: input.message }]); // Add locally
      setInput({ message: "" }); // Clear input
    }
  };

  // Set up socket listeners
  useEffect(() => {
    socket.on("server", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("server");
    };
  }, []);

  return (
    <div className="flex flex-col w-full p-4 bg-slate-700 dark:bg-orange-300" >
      <div className="flex flex-col gap-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.id === socket.id
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
            <p className="text-sm">
              <strong>{msg.id === socket.id ? "You" : "Client"}</strong>
            </p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          className="p-2 w-full border-2 rounded-md"
          placeholder="Type a message"
          name="message"
          onChange={handleInput}
          value={input.message}
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-md ml-2"
          onClick={handleSendMessage}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
