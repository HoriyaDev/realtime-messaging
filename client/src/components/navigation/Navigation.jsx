import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { CiSettings } from "react-icons/ci";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Profile from "../navigation components/profile";
import ChatList from "../navigation components/ChatList";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";

const Navigation = () => {
  const { selectedUser } = useChat();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
  <>
    {/* Hide navigation only on small screens when a user is selected */}
    <div className={`fixed inset-0 flex h-screen transition-all duration-300 
  ${selectedUser ? "hidden sm:flex" : "flex"}`}>

      {/* Navigation for Large Screens (Left Side) */}
      <div className="w-14 bg-slate-200 dark:bg-zinc-700 flex flex-col justify-start items-center gap-4">
        <ChatList />
        <button>
          <HiOutlineUserGroup size={30} className="dark:text-white" />
        </button>
        <CiSettings size={30} className="dark:text-white" />
        <Profile />
        <button type="button" onClick={toggleTheme}>
          {dark ? <LiaToggleOnSolid className="dark:text-white" /> : <LiaToggleOffSolid />}
        </button>
        <button type="button" onClick={handleSignOut}>Sign out</button>
      </div>

      {/* Navigation for Small Screens (Bottom) */}
      {!selectedUser && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-200 dark:bg-zinc-700 flex flex-row justify-around items-center gap-4 p-2 sm:hidden">
          <button>
            <HiOutlineUserGroup size={30} className="dark:text-white" />
          </button>
          <CiSettings size={30} className="dark:text-white" />
          <Profile />
          <button type="button" onClick={toggleTheme}>
            {dark ? <LiaToggleOnSolid className="dark:text-white" /> : <LiaToggleOffSolid />}
          </button>
          <button type="button" onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  </>
);
}

export default Navigation;
