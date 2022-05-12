import React from "react";
import { ContextGlobal } from "../../context/Context";

function ModalRoles() {
  const {
    setOpenModal2,
    setOnChange,
    onChange,
    mostrarAlerta,
    error,
    setError,
  } = React.useContext(ContextGlobal);

  const [data, setData] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/users/roles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.id) {
          setError({
            state: true,
            message: "Invalid Credentials",
          });
        } else {
          mostrarAlerta();
          setOnChange(!onChange);
          setOpenModal2(false);
          setError({
            state: false,
            message: "",
          });
        }
      });
  };


  return (
    <div className=" form-bg bg-primary d-flex flex-column align-items-center w-50">
      <h3 className="title text-center m-4">Registro de nuevos roles</h3>
      {error.state && (
        <div className="alert alert-danger text-center" role="alert">
          {error.message}
        </div>
      )}
      <form
        method="POST"
        onSubmit={sendData}
        className="form-horizontal d-flex flex-column "
        style={{ width: "80%", maxWidth: "600px" }}
      >
        <div className="form-group m-2 ">
          <label>Nombre del nuevo rol*</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group m-2">
          <label>Descripcion *</label>
          <input
            className="form-control"
            type="text"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary m-3 w-50 ">Registrar</button>
          <button
            onClick={() => {
              setOpenModal2(false);
            }}
            type="button"
            className=" m-3 w-50 btn btn-danger"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalRoles;
