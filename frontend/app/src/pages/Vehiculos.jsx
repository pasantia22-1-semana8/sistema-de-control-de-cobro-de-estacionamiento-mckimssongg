import React from "react";
import { useNavigate } from "react-router-dom";
import FormVehiculos from "../components/vehiculos/formVehiculos";



function Vehiculos() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return(
    <div>
        <h1>Vehiculos</h1>
        <FormVehiculos />
    </div>
  );
}

export default Vehiculos;
