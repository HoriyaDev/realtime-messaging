


import React, { useState } from "react";
import { PiChatCircleTextLight } from "react-icons/pi";
import ChatListModal from "../modal/ChatListModal";

const ChatList = () => {
  const [open, setOpen] = useState(true); // Show by default
  
  // const handleToggleChat = () => {
  //   setOpen((prev) => !prev);
    
  // };

  return (
    <>
      <button type="button" >
        <PiChatCircleTextLight size={30} className="dark:text-white" />
      </button>
      <ChatListModal open={open} />
    </>
  );
};

export default ChatList;
