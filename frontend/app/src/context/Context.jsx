import React from "react";
import swal from "sweetalert";
const ContextGlobal = React.createContext();

function ContextGlobalProvider(props) {
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [tipos, setTipos] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [onPrint, setOnPrint] = React.useState({
    id: null,
    fecha_pago: "",
    importe_total: 0,
    registro_entrada: {},
  });
  const [actualizarVehiculo, setActualizarVehiculo] = React.useState({});
  const vehiculosSearch = [];

  if (searchValue !== "") {
    data.map((item) => {
      if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
        vehiculosSearch.push(item);
      }
    });
  } else {
    vehiculosSearch.push(...data);
  }
  const getDataVehiculos = async () => {
    await fetch(
      "http://127.0.0.1:8000/vehiculos/vehiculos/filter?estado=True",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.reverse();
        setData(data);
      });
  };

  const cambiarEstado = async (item) => {
    await fetch(`http://127.0.0.1:8000/vehiculos/vehiculos/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placa: item.placa,
        tipo_vehiculo: item.tipo_vehiculo,
        descripcion: item.descripcion,
        estado: false,
        tipo_residencia: tipos.find(
          (tipo) => tipo.nombre === item.tipo_residencia
        ).id,
      }),
    }).then(() => {
      getDataVehiculos();
      setOnChange(!onChange);
    });
  };

  // form Vehiculos

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

  const mostrarAlerta = () => {
    swal({
      title: "¡Registro exitoso!",
      timer: 2000,
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
      mostrarAlerta();
      setOnChange(!onChange);
      return setError({
        state: false,
        message: "",
      });
    }
  };

  // Registros de entradas y Formulario de entrada

  const [dataEntradas, setDataEntrada] = React.useState([]);

  const registros_entradaSearch = [];

  if (searchValue !== "") {
    dataEntradas.map((item) => {
      if (item.vehiculo.toLowerCase().includes(searchValue.toLowerCase())) {
        registros_entradaSearch.push(item);
      }
    });
  } else {
    registros_entradaSearch.push(...dataEntradas);
  }
  const getDataRegistrosEntradas = async () => {
    await fetch(`http://127.0.0.1:8000/registros/registro_entrada?estado=`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.reverse();
        setDataEntrada(data);
      });
  };

  // form Registros de entradas

  const [vehiculos, setVehiculos] = React.useState([]);
  const [estacionamiento, setEstacionamiento] = React.useState([]);

  const user = () => {
    if (JSON.parse(localStorage.getItem("dataSesion"))) {
      return JSON.parse(localStorage.getItem("dataSesion")).user;
    } else {
      return "";
    }
  };
  const [formEntrada, setFormEntrada] = React.useState({
    estado_de_salida: false,
    estacionamiento: null,
    vehiculo: null,
    a_cargo_de: user().id,
  });

  setTimeout(() => {
    setError({
      state: false,
      message: "",
    });
  }, 3000);

  const handleChangeEntrada = (e) => {
    setFormEntrada({
      ...formEntrada,
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

  const getDataVehiculosEntrada = async () => {
    await fetch(
      "http://127.0.0.1:8000/vehiculos/vehiculos/filter?estado=True",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        let data = await getDataRegistros();
        data = data.map((itemR) => itemR.vehiculo);

        res = res.filter((item) => {
          return !data.includes(item.placa);
        });

        res.reverse();
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
      body: JSON.stringify(formEntrada),
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
          mostrarAlerta();
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

  //Tabla de pagos

  const [pagos, setPagos] = React.useState([]);

  const pagosSearch = [];

  if (searchValue !== "") {
    pagos.map((item) => {
      if (
        item.registro_entrada.vehiculo
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ) {
        pagosSearch.push(item);
      }
    });
  } else {
    pagosSearch.push(...pagos);
  }

  const getPagos = async () => {
    const response = await fetch(
      "http://localhost:8000/registros/registro_entrada_activos"
    );
    const data = await response.json();
    data.reverse();
    setPagos(data);
  };

  React.useEffect(() => {
    getPagos();
    getDataVehiculosEntrada();
    getDataEstacionamiento();
    getDataRegistrosEntradas();
    getDataTipos();
    getDataVehiculos();
  }, [onChange, setOnChange]);

  return (
    <ContextGlobal.Provider
      value={{
        searchValue,
        setSearchValue,
        vehiculosSearch,
        onChange,
        setOnChange,
        cambiarEstado,
        openModal,
        setOpenModal,
        // form Vehiculos
        tipos,
        error,
        setError,
        form,
        handleChange,
        sendData,
        getDataTipos,
        registros_entradaSearch,
        actualizarVehiculo,
        setActualizarVehiculo,

        // Registros de entradas
        handleChangeEntrada,
        handleSubmit,
        mostrarAlerta,
        estacionamiento,
        vehiculos,
        formEntrada,
        user,

        // Tabla de pagos
        pagosSearch,
        setOnPrint,
        onPrint,
      }}
    >
      {props.children}
    </ContextGlobal.Provider>
  );
}

export { ContextGlobal, ContextGlobalProvider };
