import { BrowserRouter, Routes, Route } from "react-router-dom";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

import "./styles/App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profil from "./pages/Profil";
import ModifProfil from "./pages/ModifProfil";
import Messages from "./pages/Messages";
import AddAvatar from "./pages/AddAvatar";
import NotExist from "./pages/NotExist";

import { CurrentUserContextProvider } from "./contexts/userContext";
import { CurrentResponsiveContextProvider } from "./contexts/responsiveContext";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CurrentResponsiveContextProvider>
          <CurrentUserContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/profil/:id" element={<Profil />} />
              <Route path="/modifprofil" element={<ModifProfil />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/avatar" element={<AddAvatar />} />
              <Route path="*" element={<NotExist />} />
            </Routes>
          </CurrentUserContextProvider>
        </CurrentResponsiveContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
