import React, { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { IoCall, IoVideocam } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { useChat } from "../context/ChatContext";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react"


const Chat = () => {
  const [input, setInput] = useState({ message: "" });
  const [messages, setMessages] = useState([]);
  const { selectedUser, selectedUserUID , setSelectedUser } = useChat();
  const messagesEndRef = useRef(null);

  // Generate Chat Room ID
  const generateChatRoom = (uid1, uid2) => [uid1, uid2].sort().join("_");

  const chatRoomId = selectedUser ? generateChatRoom(auth.currentUser.uid, selectedUserUID) : null;

  // Fetch Messages in Real-time
  useEffect(() => {
    if (!chatRoomId) return;

    const q = query(collection(db, "chatRooms", chatRoomId, "messages"), orderBy("timestamp"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  // Handle Input
  const handleInput = (e) => {
    setInput({ message: e.target.value });
  };

  // Send Message
  const handleClick = async () => {
    if (!input.message.trim() || !chatRoomId) return;

    try {
      await addDoc(collection(db, "chatRooms", chatRoomId, "messages"), {
        message: input.message,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });

      setInput({ message: "" });
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleBack = () =>{
 
  
  setSelectedUser(null);
}
 
   

  return (
    <>
  <div className={`absolute sm:static w-full sm:w-[912px]  ml-28 flex flex-col h-screen 
  bg-slate-700 transition-all duration-300 
  ${selectedUser ? "block right-0" : "hidden sm:block sm:right-0"}`}>


          {/* Header */}
          <header className="bg-slate-200 flex justify-between items-center p-2">
            <div className="flex items-center">
              {selectedUser && (
                <>
                <button className="block sm:hidden" onClick={handleBack}><FaArrowLeft /></button>
                  <img
                    src="Profile.jpg"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
                    alt={selectedUser.name || "User"}
                  />
                  <h1 className="text-black ml-2">{selectedUser.name || "Unknown"}</h1>
                </>
              )}
            </div>
            <div className="flex items-center">
              <IoCall size={25} className="text-black cursor-pointer mx-2" />
              <IoVideocam size={25} className="text-black cursor-pointer" />
            </div>
          </header>
  
          {/* Messages */}
          <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto p-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 w-fit max-w-xs break-words rounded-md  z-10 ${
                  msg.senderId === auth.currentUser.uid
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-400 text-black"
                }`}
              >
                <p>{msg.message}</p>
                
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
  
          {/* Input Field */}
          <div className="flex items-center p-2 bg-slate-200">
            <input
              type="text"
              className="p-2 w-full border-2 rounded-md z-10"
              placeholder="Type a message"
              onChange={handleInput}
              value={input.message}
            />
            <button className="p-3 bg-blue-500 text-white rounded-md ml-2 z-10" onClick={handleClick}>
              <IoMdSend />
            </button>
          </div>
        </div>
   
    </>
  );
  
}
  

export default Chat;
