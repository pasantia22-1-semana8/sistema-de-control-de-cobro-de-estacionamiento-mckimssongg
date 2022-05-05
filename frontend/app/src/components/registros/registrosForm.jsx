import React from "react";

function RegistrosForm() {
  const [empleados, setEmpleados] = React.useState([]);
  const [vehiculos, setVehiculos] = React.useState([]);
  const [estacionamiento, setEstacionamiento] = React.useState([]);
  const [error, setError] = React.useState({
    state: false,
    message: "",
  });
  const [form, setForm] = React.useState({
    estado_de_salida: false,
    estacionamiento: null,
    vehiculo: null,
    a_cargo_de: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const getDataEmpleados = async () => {
    await fetch("http://127.0.0.1:8000/users/userlist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setEmpleados(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDataVehiculos = async () => {
    await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setVehiculos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDataEstacionamiento = async () => {
    await fetch("http://127.0.0.1:8000/estacionamiento/areas/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setEstacionamiento(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const DATA = fetch("http://127.0.0.1:8000/registros/registro_entrada/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    DATA.then((res) => res.json())
      .then((res) => {
        if (!res.auth) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getDataEmpleados();
    getDataVehiculos();
    getDataEstacionamiento();
  }, []);
  return (
    <div>
      <h1>Registro de Entrada</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="estacionamiento">Estacionamiento</label>
          <select
            className="form-control"
            name="estacionamiento"
            onChange={handleChange}
            value={form.estacionamiento}
          >
            <option value="">Seleccione un Estacionamiento</option>
            {estacionamiento.map((estacionamiento) => (
              <option key={estacionamiento.id} value={estacionamiento.id}>
                {estacionamiento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vehiculo">Vehiculo</label>
          <select
            className="form-control"
            name="vehiculo"
            onChange={handleChange}
            value={form.vehiculo}
          >
            <option value="">Seleccione un Vehiculo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>
                {vehiculo.placa}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="a_cargo_de">A Cargo de</label>
          <select
            className="form-control"
            name="a_cargo_de"
            onChange={handleChange}
            value={form.a_cargo_de}
          >
            <option value="">Seleccione un Empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="estado_de_salida">Estado de Salida</label>
          <select
            className="form-control"
            name="estado_de_salida"
            onChange={handleChange}
            value={form.estado_de_salida}
          >
            <option value="">Seleccione un Estado</option>
            <option value={false}>No Salida</option>
            <option value={true}>Salida</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrosForm;
