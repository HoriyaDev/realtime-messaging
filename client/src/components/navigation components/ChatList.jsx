import React from 'react'
import { useState } from 'react';
import { PiChatCircleTextLight } from "react-icons/pi";
import ChatListModal from '../modal/ChatListModal';
const ChatList = () => {

  const [open, setOpen] = useState(false);
  
    const handleToggleChat = () => {
      setOpen((prev) => !prev);
    };
  return (
    <>
    <button type="button" onClick={handleToggleChat } >
        <PiChatCircleTextLight size={30} className="dark:text-white" />
    </button>

    <ChatListModal open={open} />



    
    </>
  )
}

export default ChatList