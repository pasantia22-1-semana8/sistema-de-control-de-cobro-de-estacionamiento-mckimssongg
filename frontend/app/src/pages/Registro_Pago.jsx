import React from "react";
import Form from "../components/pagos/formPago";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormPago() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return (
    <div className="container p-2">
      <h3 className="text-center">Registro de Pagos</h3>
      <Form />
      <Link to={"/pagos"} className="m-2">Volver a pagos</Link>
    </div>
  );
}

export default FormPago;
