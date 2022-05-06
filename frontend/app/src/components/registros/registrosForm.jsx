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

  const getDataRegistros = async () => {
    const data = await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada?estado=false`,
      {
        method: "GET",
      }
    );
    return await data.json();
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
      .then(async (res) => {

        let data = await getDataRegistros();
        res = res.filter((item) => {
          return item.placa != data.map((itemR) => itemR.vehiculo);
        });

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
      .then(async (res) => {
        let data = await getDataRegistros();

        res = res.filter((item) => {
          return item.nombre != data.map((itemR) => itemR.estacionamiento);
        });

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
        console.log(res);
        if (
          typeof res.estacionamiento != "string" ||
          typeof res.vehiculo != "string"
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
      {error.state && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Estacionamiento</label>
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
          <label>Vehiculo</label>
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
          <label>A Cargo de</label>
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
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrosForm;
