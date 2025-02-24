import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import CategoryTab from '../category/CategoryTab';
import AllChat from '../chatlistCategory/AllChat';

const ChatListModal = () => {
  return (
    <>
      <div className="fixed top-0 left-0 sm:left-[56px]  w-full sm:w-[399px] h-96 sm:h-96">
        <div className="relative bg-white w-full sm:w-[399px] dark:bg-zinc-800 h-[calc(100vh-56px)] sm:h-screen p-4 mx-auto">
          {/* Title */}
          <p className="dark:text-white font-semibold text-2xl">Chats</p>

          {/* Search Bar */}
          <div className="flex items-center mt-3 px-4 py-2 rounded-md border:none dark:bg-zinc-700 bg-slate-200 overflow-hidden max-w-md mx-auto dark:text-white">
            <IoSearchOutline />
            <input
              type="search"
              placeholder="Search"
              className="w-full outline-none bg-transparent text-gray-600 text-sm pl-4 dark:text-white"
            />
          </div>

          {/* Category Tabs */}
          <CategoryTab />

          {/* All Chats */}
          <AllChat />
        </div> 
      </div> {/* Close this div properly */}
    </>
  )
}

export default ChatListModal
