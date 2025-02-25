import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Home from "./components/Home";
import { BrowserRouter ,  Routes, Route } from "react-router-dom";
import SignUp from "./login/SignUp";
import SignIn from "./login/SignIn";
import { ChatProvider } from "./context/ChatContext";
// import { UserProvider } from "./context/UserContext";

function App() {
 

  return (
    <>
      {/* <UserProvider> */}
     <ChatProvider>


     <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
     </ChatProvider>
    {/* </UserProvider> */}
    </>
  );
}

export default App;
