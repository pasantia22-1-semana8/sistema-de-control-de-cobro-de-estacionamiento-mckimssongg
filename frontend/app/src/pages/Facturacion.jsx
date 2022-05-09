import React from "react";
import ReactToPrint from "react-to-print";
import { ContextGlobal } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Facturacion() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <div className="container">
        prueba
        <Link to='/pagos'>
            Regresar a pagos
        </Link>
    </div>

  );
}

export default Facturacion;
