import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Home from "./Home";
import { BrowserRouter ,  Routes, Route } from "react-router-dom";
import SignUp from "./login/SignUp";
import SignIn from "./login/SignIn";
import { UserProvider } from "./context/UserContext";

function App() {
 

  return (
    <>
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  );
}

export default App;
