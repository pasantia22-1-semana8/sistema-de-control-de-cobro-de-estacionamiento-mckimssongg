import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PagosVista from "../components/pagos/PagosVista";
import Search from "../components/home/Search";

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
      Pagos
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Link to={'/pagos/form'}>
          Hacer pago
      </Link>
      <button>
        Pagos de mes
      </button>
      <PagosVista data={pagosSearch} />
    </div>
  );
}

export default Pagos;
