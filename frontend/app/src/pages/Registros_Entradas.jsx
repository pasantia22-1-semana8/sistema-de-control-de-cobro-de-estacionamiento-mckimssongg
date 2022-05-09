import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrosVista from "../components/registros/RegistrosVista";
import Search from "../components/home/search";
function Registros_Entradas() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const registros_entradaSearch = [];

  if (searchValue !== "") {
    data.map((item) => {
      if (item.vehiculo.toLowerCase().includes(searchValue.toLowerCase())) {
        registros_entradaSearch.push(item);
      }
    });
  } else {
    registros_entradaSearch.push(...data);
  }
  const getDataVehiculos = async () => {
    const data = await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada?estado=`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.reverse()
        setData(data);
      }
      );
  };

  React.useEffect(() => {
    getDataVehiculos();
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <div>
      <h3 className="text-center">Registro de entradas</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <RegistrosVista data={registros_entradaSearch} />
    </div>
  );
}

export default Registros_Entradas;
