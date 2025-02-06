import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import CategoryTab from '../category/CategoryTab';
import AllChat from '../chatlistCategory/AllChat';

const ChatListModal = ({open}) => {


  return (
    <>
    {open && (

        <div className="fixed top-0 left-[56px] z-50 w-[433px] h-full">
          
          <div className="relative bg-white w-[399px] dark:bg-zinc-800 h-screen p-4">
          <p className="dark:text-white font-semibold text-2xl ">
              Chats
            </p>

            <div class="flex items-center mt-3 px-4 py-2 rounded-md border:none dark:bg-zinc-700 bg-slate-200 overflow-hidden max-w-md mx-auto  dark:text-white">
                  <IoSearchOutline   />
                    <input type="search" placeholder="Search " class="w-full outline-none bg-transparent text-gray-600 text-sm pl-4 dark:text-white" />
                  </div>


<CategoryTab />

<AllChat />
                  
          </div>
          </div>
    )}
    </>
  )
}

export default ChatListModal