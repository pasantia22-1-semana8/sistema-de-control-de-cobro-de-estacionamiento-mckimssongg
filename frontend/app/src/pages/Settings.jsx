import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../modal/index";
import { ContextGlobal } from "../context/Context";
import Estacionamiento from "../assets/img/estacionamiento.png";
import roles from "../assets/img/roles.png";
import usuarios from "../assets/img/verificar.png";

function Settings() {
  const navigate = useNavigate();

  const { setOpenModal, openModal } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    } else {
      if (
        JSON.parse(localStorage.getItem("dataSesion")).user.role !== "admin"
      ) {
        return navigate("/");
      }
    }
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mt-2">Configuración</h3>
      <div className="row text-center justify-content-evenly align-items-center mt-5">
        <div className="col col-lg-2  HoverStandar p-4">
          Registrar usuarios
          <img src={usuarios} className="img-fluid" />
        </div>
        <div className="col col-lg-2   HoverStandar  p-4">
          Administrar Roles
          <img src={roles} className="img-fluid" />
        </div>
        <div className="col-7 col-sm-4 col-lg-2  HoverStandar p-4">
          Administrar Estacionamientos y areas
          <img src={Estacionamiento} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
