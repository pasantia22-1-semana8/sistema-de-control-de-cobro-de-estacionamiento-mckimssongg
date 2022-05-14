import React from "react";
const ContextGlobal = React.createContext();

import {
  getDataVehiculosActivos,
  getDataVehiculos,
  mostrarAlerta,
  getDataTipos,
  getDataRegistrosEntradas,
  getDataEstacionamiento,
  getDataVehiculosEntrada,
  getPagos,
  getRole,
} from "../services/Api";

function ContextGlobalProvider(props) {
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [tipos, setTipos] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
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

  const [vehiculosActivos, setVehiculosActivos] = React.useState([]);
  const vehiculosActivosSearch = [];

  if (searchValue !== "") {
    vehiculosActivos.map((item) => {
      if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
        vehiculosActivosSearch.push(item);
      }
    });
  } else {
    vehiculosActivosSearch.push(...vehiculosActivos);
  }

  const cambiarEstado = async (item) => {
    // cambiar estado de un vehiculo para borrarlo
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
      getDataVehiculos(setData);
      setOnChange(!onChange);
    });
  };

  // Formulario para registrar vehiculos ( estados )
  const [form, setForm] = React.useState({
    placa: "",
    tipo_vehiculo: "",
    descripcion: "",
    estado: true,
    tipo_residencia: null,
  });

  const [error, setError] = React.useState({
    state: false,
    message: "",
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

  const sendData = async (e) => {
    // enviar datos del formulario de registro de nuevo vehiculo
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

  // Registros de entradas y Formulario de entrada ( estados )
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

  // Formulario Registros de entradas ( estados )
  const [vehiculos, setVehiculos] = React.useState([]);
  const [estacionamiento, setEstacionamiento] = React.useState([]);

  const [User, setUser] = React.useState({
    // de momento no me acuerdo para que hice esto
    id: "",
    username: "",
    email: "",
    role: "",
  });

  const user = () => {
    if (JSON.parse(localStorage.getItem("dataSesion"))) {
      const UserData = JSON.parse(localStorage.getItem("dataSesion")).user;
      return setUser(UserData);
    } else {
      return "";
    }
  };

  const [formEntrada, setFormEntrada] = React.useState({
    estado_de_salida: false,
    estacionamiento: null,
    vehiculo: null,
    a_cargo_de: null,
  });

  const handleChangeEntrada = (e) => {
    setFormEntrada({
      ...formEntrada,
      [e.target.name]: e.target.value,
      a_cargo_de: User.id,
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

  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    getDataVehiculosActivos(setVehiculosActivos);
    getPagos(setPagos);
    getDataVehiculosEntrada(setVehiculos);
    getDataEstacionamiento(setEstacionamiento);
    getDataRegistrosEntradas(setDataEntrada);
    getDataTipos(setTipos);
    getDataVehiculos(setData);
    user();
    getRole(setRole);
  }, [onChange, setOnChange, formEntrada]);

  return (
    <ContextGlobal.Provider
      value={{
        User,
        vehiculosActivosSearch,
        setUser,
        searchValue,
        setSearchValue,
        vehiculosSearch,
        onChange,
        setOnChange,
        cambiarEstado,
        openModal,
        setOpenModal,
        openModal2,
        setOpenModal2,
        openModal3,
        setOpenModal3,
        role,
        data,

        // form Vehiculos
        tipos,
        error,
        setError,
        form,
        handleChange,
        sendData,
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
