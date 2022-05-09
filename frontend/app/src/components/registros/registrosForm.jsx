import React from "react";
import swal from "sweetalert";

function RegistrosForm() {
  const mostrarAlerta = () => {
    swal({
      title: "¡Registro exitoso!",
      timer: 2000,
    });
  };
  const [vehiculos, setVehiculos] = React.useState([]);
  const [estacionamiento, setEstacionamiento] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  const [error, setError] = React.useState({
    state: false,
    message: "",
  });
  const [form, setForm] = React.useState({
    estado_de_salida: false,
    estacionamiento: null,
    vehiculo: null,
    a_cargo_de: JSON.parse(localStorage.getItem("dataSesion")).user.id,
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

  const getDataVehiculos = async () => {
    await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (res) => {
        let data = await getDataRegistros();
        data = data.map((itemR) => itemR.vehiculo);

        res = res.filter((item) => {
          return !data.includes(item.placa);
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

        data = data.map((itemR) => itemR.estacionamiento);
        res = res.filter((item) => {
          return !data.includes(item.nombre);
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
        if (
          typeof res.estacionamiento != "string" ||
          typeof res.vehiculo != "string"
        ) {
          return setError({
            state: true,
            message: "Invalid Credentials",
          });
        } else {
          mostrarAlerta()
          setOnChange(!onChange);
          setError({
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
    getDataVehiculos();
    getDataEstacionamiento();
  }, [onChange]);

  return (
    <div className="w-50">
      {error.state && (
        <div className="alert alert-danger text-center" role="alert">
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="">
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
          <ol className="breadcrumb">
            {JSON.parse(localStorage.getItem("dataSesion")).user.username}
          </ol>
        </div>
        <button type="submit" className="btn btn-primary  w-100">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default RegistrosForm;
