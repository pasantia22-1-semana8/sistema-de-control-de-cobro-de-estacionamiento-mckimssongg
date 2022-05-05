import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vehiculos from "./pages/Vehiculos";
import Registros_Entradas from "./pages/Registros_Entradas";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/registros_entradas" element={<Registros_Entradas />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
