import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../context/Context";
import TablaVehiculos from "../components/vehiculos/TablaVehiculos";
import Search from "../components/Search";
function Vehiculos() {
  const navigate = useNavigate();
  const { searchValue, setSearchValue, vehiculosSearch } =
    React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return (
    <div className="container">
      <h3 className="text-center">Registro de vehiculos</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Link to="/registros_vehiculos">
        <button className="btn btn-primary mb-4">Agregar vehiculo</button>
      </Link>
      <TablaVehiculos data={vehiculosSearch} />
    </div>
  );
}

export default Vehiculos;
