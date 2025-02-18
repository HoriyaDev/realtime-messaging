// import React, { useEffect, useState } from "react";
// import Chat from "./components/Chat";
// import Navigation from "./components/navigation/Navigation";
// import ChatListModal from "./components/modal/ChatListModal"; // Import ChatListModal
// import Sidebar from "./components/Sidebar";
// import Header from "./components/header/Header";

// const Home = () => {
//   const [userInfo, setUserInfo] = useState({ name: "", image: "" });

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedData = JSON.parse(userData); // Parse the JSON data
//       setUserInfo({ name: parsedData.name, image: parsedData.image }); // Set name and image
//     }
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Navigation />
     
//       <div>
 
//       <Header />
//       <Chat />
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Navigation from "./navigation/Navigation";
import ChatListModal from "./modal/ChatListModal"; // Import ChatListModal
import Sidebar from "./Sidebar";
import Header from "./header/Header";

const Home = () => {
  const [userInfo, setUserInfo] = useState({ name: "", image: "" });

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse the JSON data
      setUserInfo({ name: parsedData.name, image: parsedData.image }); // Set name and image
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 flex ">
        <Header />
        <div className="flex-1">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;