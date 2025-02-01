// import React, { useEffect, useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Chat from "./components/Chat";
// import Navigation from "./components/navigation/Navigation";

// const Home = () => {
//   const [userInfo, setUserInfo] = useState({ name: "", image: "" });
//   const [activeTab, setActiveTab] = useState('');

//     const handleIconClick = (tab) => {
//         setActiveTab(activeTab === tab ? '' : tab);
//     };

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedData = JSON.parse(userData); // Parse the JSON data
//       setUserInfo({ name: parsedData.name, image: parsedData.image }); // Set name and image
//     }
//   }, []);

//   return (
//     <div className="flex">
//       <Navigation onToggle={handleIconClick}/>
//        {activeTab === 'sidebar' && <Sidebar />}
//      <Chat />
//     </div>
//   );
// };

// export default Home;










import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Navigation from "./components/navigation/Navigation";

const Home = () => {
  const [userInfo, setUserInfo] = useState({ name: "", image: "" });
  const [activeTab, setActiveTab] = useState('');

  const handleIconClick = (tab) => {
    setActiveTab(activeTab === tab ? '' : tab); // Toggle the active tab
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData); // Parse the JSON data
      setUserInfo({ name: parsedData.name, image: parsedData.image }); // Set name and image
    }
  }, []);

  return (
    <div className="flex">
      <Navigation onToggle={handleIconClick} />
      <Sidebar /> 
      <Chat /> 
    </div>
  );
};

export default Home;