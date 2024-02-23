import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import {Login, Register, ConnectFB, AgentScreen, DisconnectPage} from './components/index.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connectfb" element={<ConnectFB />} />
          <Route path="/page-integration/:pid" element={<DisconnectPage />} />
          <Route path="/agent" element={<AgentScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
