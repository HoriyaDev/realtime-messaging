import React from "react";
import { IoSearchOutline } from "react-icons/io5";
const Sidebar = ({ name, image }) => {
  return (
    <>
      <div className="w-2/5 h-screen bg-slate-400 ">

      <p className="font-semibold text-2xl p-2">Chats</p>

      <div class="flex px-4 py-2 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
      <IoSearchOutline />
        <input type="email" placeholder="Search Something..." class="w-full outline-none bg-transparent text-gray-600 text-sm" />
      </div>
        <div className="flex gap-3 items-center mx-4  ">
          
          <img src={image}  className="w-10 h-10 rounded-full object-cover mt-3 "/>
          <p className="font-semibold text-xl "> {name}</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
