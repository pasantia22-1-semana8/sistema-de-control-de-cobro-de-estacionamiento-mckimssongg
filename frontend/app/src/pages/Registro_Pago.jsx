import React from "react";
import Form from "../components/pagos/formPago";
import {Link} from "react-router-dom";

function FormPago() {
  return (
    <div>
      FormPago
      <Link to={'/pagos'}>
        registros de pagos
      </Link>
      <Form />
    </div>
  );
}

export default FormPago;
