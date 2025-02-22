import { createContext, useState, useContext } from "react";

// Create Chat Context
const ChatContext = createContext();

// Provider Component to wrap your app
export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserUID , setSelectedUserUID] = useState(null)


  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser , selectedUserUID , setSelectedUserUID }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook to use Chat Context
export const useChat = () => {
  return useContext(ChatContext);
};
