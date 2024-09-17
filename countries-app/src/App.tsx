import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CountryExplorer from "./pages/Country";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/explorer" element={<CountryExplorer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
