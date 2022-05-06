import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vehiculos from "./pages/Vehiculos";
import Registros_Entradas from "./pages/Registros_Entradas";
import RegistrosForm_Entradas from "./pages/RegistrosForm_Entradas";
import Pagos from "./pages/Pagos";
import Layout from "./layouts/Layout";
import FormPago from "./pages/Registro_Pago";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/registros_entradas" element={<Registros_Entradas />} />
          <Route
            path="/registros_entradas/form"
            element={<RegistrosForm_Entradas />}
          />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/pagos/form" element={<FormPago />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
