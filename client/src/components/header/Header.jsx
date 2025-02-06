import { IoCall, IoVideocam } from "react-icons/io5";

const Header = () => {
  return (
    <div className="w-2/3 ml-auto absolute flex items-center justify-between right-0 h-16 bg-slate-200 dark:bg-zinc-700 z-10">
   
      <div className="flex items-center">
        <img
          src="Profile.jpg"
          className="w-12 h-12 object-cover rounded-full p-2"
          alt="Profile"
        />
        <h1 className="text-black dark:text-white ml-2">Name</h1>
      </div>

      
      <div className="flex items-center mr-4">
        <IoCall size={25} className="text-black dark:text-white cursor-pointer" />
        <IoVideocam size={25} className="text-black dark:text-white ml-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;