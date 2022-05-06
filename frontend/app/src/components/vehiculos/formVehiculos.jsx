import React from "react";

function FormVehiculos() {
  const [tipos, setTipos] = React.useState([]);
  const [error, setError] = React.useState({
    state: false,
    message: "",
  });
  const [form, setForm] = React.useState({
    placa: "",
    tipo_vehiculo: "",
    descripcion: "",
    estado: true,
    tipo_residencia: null,
  });

  setTimeout(() => {
    setError({
      state: false,
      message: "",
    });
  }, 3000);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getDataTipos = async () => {
    await fetch("http://127.0.0.1:8000/vehiculos/tipos/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setTipos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getDataTipos();
  }, []);

  const sendData = async (e) => {
    e.preventDefault();

    const DATA = await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await DATA.json();
    if (
      typeof data.descripcion != "string" ||
      typeof data.placa != "string" ||
      typeof data.tipo_residencia != "string" ||
      typeof data.tipo_vehiculo != "string"
    ) {
      return setError({
        state: true,
        message: "Invalid Credentials",
      });
    } else {
      return setError({
        state: false,
        message: "",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="vh form-bg d-flex flex-column align-items-center ">
        <h3 className="title text-center m-4">Registro de Vehiculos</h3>
        {error.state && <p style={{ color: "red" }}>{error.message}</p>}
        <form onSubmit={sendData}>
          <div className="form-group">
            <label>Placa</label>
            <input
              type="text"
              className="form-control"
              id="placa"
              name="placa"
              onChange={handleChange}
              value={form.placa}
            />

            <label>Tipo de Vehiculo</label>
            <input
              type="text"
              className="form-control"
              id="tipo_vehiculo"
              name="tipo_vehiculo"
              onChange={handleChange}
              value={form.tipo_vehiculo}
            />

            <label>Descripcion</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              onChange={handleChange}
              value={form.descripcion}
            />

            <label>Estado</label>
            <select
              className="form-control"
              id="estado"
              name="estado"
              onChange={handleChange}
              value={form.estado}
            >
              <option value="">Seleccione una opcion</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>

            <label>Tipo de Residencia</label>
            <select
              className="form-control"
              id="tipo_residencia"
              name="tipo_residencia"
              onChange={handleChange}
              value={form.tipo_residencia}
            >
              <option value="">Seleccione una opcion</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default FormVehiculos;
