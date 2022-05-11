import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../modal/index";
// import { ContextGlobal } from "../context/Context";
import Estacionamiento from "../assets/img/estacionamiento.png";
import roles from "../assets/img/roles.png";
import usuarios from "../assets/img/verificar.png";

function Settings() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);

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
        <div
          className="col col-lg-2  HoverStandar p-4"
          onClick={() => {
            setOpenModal((prevState) => !prevState);
          }}
        >
          Registrar usuarios
          <img src={usuarios} className="img-fluid" />
          {!!openModal && (
            <Modal>
              <button onClick={() => {}}>Regresar</button>
            </Modal>
          )}
        </div>
        <div
          className="col col-lg-2   HoverStandar  p-4"
          onClick={() => {
            setOpenModal2((prevState) => !prevState);
          }}
        >
          Administrar Roles
          <img src={roles} className="img-fluid" />
          {!!openModal2 && (
            <Modal>
              <button onClick={() => {}}>Regresar2</button>
            </Modal>
          )}
        </div>
        <div
          className="col-7 col-sm-4 col-lg-2  HoverStandar p-4"
          onClick={() => {
            setOpenModal3((prevState) => !prevState);
          }}
        >
          Administrar Estacionamientos y areas
          <img src={Estacionamiento} className="img-fluid" />
          {!!openModal3 && (
            <Modal>
              <button onClick={() => {}}>Regresar3</button>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
