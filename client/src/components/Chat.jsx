// import React, { useEffect, useState, useRef } from "react";
// import { IoMdSend } from "react-icons/io";
// import { IoCall, IoVideocam } from "react-icons/io5";
// import { useChat } from "../context/ChatContext";
// import { doc, setDoc } from "firebase/firestore"; 
// import { db } from "../firebase";

// const Chat = () => {
//   const [input, setInput] = useState({ message: "" });
//   const [messages, setMessages] = useState([]);
//   const { selectedUser } = useChat();
//   const {selectedUserUID} = useChat()
//   const messagesEndRef = useRef(null); // For auto-scroll

//   // Handle input changes
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle sending message
//   const handleClick = async  () => {
//     if (!input.message.trim()) return; // Prevent sending empty messages

//     setMessages((prevMessages) => [...prevMessages, { message: input.message }]);
//     setInput({ message: "" });


//     /// store messages to sub-collection 

//      await setDoc(doc(db ," messages"),{
//       text:input.message,
//      })


     
//   };

//   // Auto-scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // If no user is selected, show a message
//   if (!selectedUser) {
//     return (
//       <div className="w-2/3 ml-auto absolute right-0 flex items-center justify-center h-screen bg-slate-700">
//         <p className="text-gray-500 text-lg">Select a user to start chatting</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-2/3 ml-auto absolute right-0 flex flex-col justify-between h-screen bg-slate-700 dark:bg-orange-300">
//       {/* Header */}
//       <header className="bg-slate-200 dark:bg-zinc-700 flex justify-between items-center p-2">
//         <div className="flex items-center">
//           <img
//             src="Profile.jpg"
//             className="w-12 h-12 object-cover rounded-full"
//             alt="Profile"
//           />
//           <h1 className="text-black dark:text-white ml-2">{selectedUser.name}</h1>
//          {selectedUser.LoggedUserId}
//         </div>
//         <div className="flex items-center">
//           <IoCall size={25} className="text-black dark:text-white cursor-pointer mx-2" />
//           <IoVideocam size={25} className="text-black dark:text-white cursor-pointer" />
//         </div>
//       </header>

//       {/* Messages */}
//       <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto p-2">
//         {messages.map((msg, index) => (
//           <div key={index} className="p-2 bg-amber-600 w-fit max-w-xs rounded-md">
//             <p className="text-white">{msg.message}</p>
//           </div>
//         ))}
//         <div ref={messagesEndRef}></div> {/* Auto-scroll target */}
//       </div>

//       {/* Input Field */}
//       <div className="flex items-center p-2 bg-slate-200 dark:bg-zinc-700">
//         <input
//           type="text"
//           className="p-2 w-full border-2 rounded-md"
//           placeholder="Type a message"
//           name="message"
//           onChange={handleInput}
//           value={input.message}
//         />
//         <button className="p-3 bg-blue-500 text-white rounded-md ml-2" onClick={handleClick}>
//           <IoMdSend />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;





import React, { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { IoCall, IoVideocam } from "react-icons/io5";
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

const Chat = () => {
  const [input, setInput] = useState({ message: "" });
  const [messages, setMessages] = useState([]);
  const { selectedUser, selectedUserUID } = useChat();
  const messagesEndRef = useRef(null);

  // Chat room ID generate karo
  const generateChatRoom = (uid1, uid2) => {
    return [uid1, uid2].sort().join("_");
  };

  const chatRoomId = selectedUser ? generateChatRoom(auth.currentUser.uid, selectedUserUID) : null;

  // Messages Real-time Fetch Karna
  useEffect(() => {
    if (!chatRoomId) return;

    const q = query(collection(db, "chatRooms", chatRoomId, "messages"), orderBy("timestamp"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  // Input handle karna
  const handleInput = (e) => {
    setInput({ message: e.target.value });
  };

  // Message Send Karna
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

  if (!selectedUser) {
    return (
      <div className="w-2/3 ml-auto absolute right-0 flex items-center justify-center h-screen bg-slate-700">
        <p className="text-gray-500 text-lg">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 ml-auto absolute right-0 flex flex-col justify-between h-screen bg-slate-700">
      {/* Header */}
      <header className="bg-slate-200 flex justify-between items-center p-2">
        <div className="flex items-center">
          <img src="Profile.jpg" className="w-12 h-12 object-cover rounded-full" alt="Profile" />
          <h1 className="text-black ml-2">{selectedUser.name}</h1>
        </div>
        <div className="flex items-center">
          <IoCall size={25} className="text-black cursor-pointer mx-2" />
          <IoVideocam size={25} className="text-black cursor-pointer" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 w-fit max-w-xs rounded-md ${msg.senderId === auth.currentUser.uid ? "bg-blue-600 text-white ml-auto" : "bg-gray-400 text-black"}`}>
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Field */}
      <div className="flex items-center p-2 bg-slate-200">
        <input
          type="text"
          className="p-2 w-full border-2 rounded-md"
          placeholder="Type a message"
          name="message"
          onChange={handleInput}
          value={input.message}
        />
        <button className="p-3 bg-blue-500 text-white rounded-md ml-2" onClick={handleClick}>
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
