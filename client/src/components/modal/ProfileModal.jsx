import React, { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCameraSharp } from "react-icons/io5";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProfileModal = ({ open }) => {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(50);
  const [image, setImage] = useState("/default-user.png");
  const [userName, setUserName] = useState(""); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No user is logged in.");
        return;
      }

      console.log("Current User UID:", currentUser.uid);
      const q = query(
        collection(db, "users"),
        where("LoggedUserId", "==", currentUser.uid)
      );

      const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("Fetched User:", userData);
          setUserName(userData.name);
        }
      });

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const storedBio = JSON.parse(localStorage.getItem("bio"));
    if (storedBio) {
      setInput(storedBio);
      setCount(50 - storedBio.length);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setInput(value);
      setCount(50 - value.length);
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("bio", JSON.stringify(input));
    console.log("Saved:", input);
  };

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 sm:left-[56px]  w-full sm:w-[399px] h-96 sm:h-96">
          <div className="relative bg-white w-full sm:w-[399px] dark:bg-zinc-800 h-[calc(100vh-56px)] sm:h-screen p-4 mx-auto">
            <p className="dark:text-white font-semibold text-2xl p-4">
              Profile
            </p>

            <div className="py-5 flex flex-col items-center">
              <div
                className="relative w-44 h-44 rounded-full overflow-hidden"
                onClick={handleClick}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-full">
                  <span className="text-white text-sm font-semibold flex flex-col justify-center items-center text-center">
                    <IoCameraSharp className="mx-auto text-xl" />
                    <p className="mt-3">
                      <span className="block">CHANGE</span>
                      <span className="block">PROFILE PHOTO</span>
                    </p>
                  </span>
                </div>

                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt="User Profile"
                />
              </div>

              <input
                type="file"
                className="mt-4 hidden pointer"
                onChange={handleImage}
                ref={fileInputRef}
              />
            </div>

            <p className="dark:text-white mt-10 font-medium text-xl pl-4">
              Your name
            </p>
            {/* ✅ Show current logged-in user's name */}
            <p className="dark:text-white font-medium text-lg pl-4">
              {userName || "Loading..."}
            </p>

            <div className="p-6 mt-5 dark:text-slate-300">
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
