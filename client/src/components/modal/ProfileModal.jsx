import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { FaCheck } from "react-icons/fa6";

const ProfileModal = ({ open, onClose }) => {
  const { name } = useUser();
  const [input, setInput] = useState("");
  const [count, setCount] = useState(50);

  // Load bio from local storage when component mounts
  useEffect(() => {
    const storedBio = JSON.parse(localStorage.getItem("bio"));
    if (storedBio) {
      setInput(storedBio);
      setCount(50 - storedBio.length); // Adjust count based on stored value
    }
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setInput(value);
      setCount(50 - value.length);
    }
  };

  const handleSave = () => {
    localStorage.setItem("bio", JSON.stringify(input));
    console.log("Saved:", input);
  };

  return (
    <>
      {open && (
        <div className="fixed top-0 left-[61px] z-50 w-[433px] h-full">
          <div className="relative bg-white w-[373px] dark:bg-zinc-800 h-screen">
            <p className="dark:text-white font-semibold text-2xl p-4">
              Profile
            </p>

            <div className=" py-5 flex justify-center items-center">
              <img
                src="/Profile.jpg"
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>

            <p className="dark:text-white mt-10 font-medium text-xl pl-4">
              Your name
            </p>
            <p className="dark:text-white font-medium text-lg pl-4">{name}</p>

            

            <div className=" p-6 mt-5 dark:text-slate-300">
              <p>This name will be visible to your contacts</p>
            </div>

            <p className="dark:text-white mt-10 font-medium text-xl pl-4">
              About
            </p>

            <div className="relative w-[95%] mx-auto">
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="w-full pr-14 py-3 outline-none border-b-2 dark:bg-zinc-800 dark:text-white border-green-500"
                placeholder="Bio"
              />
            
              <p className="absolute right-10 inset-y-3 text-gray-500 dark:text-gray-300">
                {count}
              </p>

         
              <button
                type="button"
                onClick={handleSave}
                className="absolute inset-y-3 right-2 text-gray-500 dark:text-gray-300"
              >
                <FaCheck size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
