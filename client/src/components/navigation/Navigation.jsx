


import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { PiChatCircleTextLight } from "react-icons/pi";
import Profile from "../navigation components/profile";
import ChatList from "../navigation components/ChatList";


const Navigation = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="w-24 bg-slate-200 dark:bg-zinc-700 flex flex-col justify-start items-center gap-4">
     <ChatList />
      <button >
        <HiOutlineUserGroup size={30} className="dark:text-white" />
      </button>
      <CiSettings size={30} className="dark:text-white" />
      <Profile />
      <button type="button" onClick={toggleTheme}>
        {dark ? (
          <LiaToggleOnSolid className="dark:text-white" />
        ) : (
          <LiaToggleOffSolid />
        )}
      </button>
    </div>
  );
};

export default Navigation;