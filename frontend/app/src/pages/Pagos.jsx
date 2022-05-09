import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PagosVista from "../components/pagos/PagosVista";
import Search from "../components/Search";

function Pagos() {
  const [pagos, setPagos] = React.useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");

  const pagosSearch = [];

  if (searchValue !== "") {
    pagos.map((item) => {
      if (
        item.registro_entrada.vehiculo
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        pagosSearch.push(item);
      }
    });
  } else {
    pagosSearch.push(...pagos);
  }

  const getPagos = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/registros/registro_pago/"
    );
    const data = await response.json();
    data.reverse();
    setPagos(data);
  };

  React.useEffect(() => {
    getPagos();
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <div>
      <h3 className="text-center">Registro de pagos</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="d-flex justify-content-evenly">
        <Link to={"/pagos/form"}>Hacer pago</Link>
        <Link to=''>Pagos de mes</Link>
      </div>
      <PagosVista data={pagosSearch} />
    </div>
  );
}

export default Pagos;
