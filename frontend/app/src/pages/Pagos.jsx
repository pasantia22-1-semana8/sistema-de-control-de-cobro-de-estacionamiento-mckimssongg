import React from "react";
import {useNavigate } from "react-router-dom";
import PagosVista from "../components/pagos/PagosVista";
import Search from "../components/Search";
import { ContextGlobal} from "../context/Context";

function Pagos() {

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  const { searchValue, setSearchValue, pagosSearch } = React.useContext(ContextGlobal);
  
  return (
    <div>
      <h3 className="text-center">Registro de pagos</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <PagosVista data={pagosSearch} />
    </div>
  );
}

export default Pagos;
