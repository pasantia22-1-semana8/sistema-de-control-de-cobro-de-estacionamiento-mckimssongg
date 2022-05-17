const URL = "http://localhost:8000/";

import swal from "sweetalert";

export const mostrarAlerta = () => {
  swal({
    title: "¡Registro exitoso!",
    timer: 2000,
  });
};

/**
 * @description Función que permite obtener el usuario autenticado actualmente
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const user = (setData) => {
  if (JSON.parse(localStorage.getItem("dataSesion"))) {
    const UserData = JSON.parse(localStorage.getItem("dataSesion")).user;
    return setData(UserData);
  } else {
    return "";
  }
};

// Metodos GET

/**
 * @description Función que permite obtener todos los vehiculos que tengan
 * un registro de entrada activo en el sistema
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataVehiculosActivos = async (setData) => {
  const response = await fetch(`${URL}vehiculos/vehiculos/entrada`);
  setData((await response.json()).reverse());
};

/**
 * @description Función que permite obtener todos los vehiculos que tengan un estado true
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataVehiculos = async (setData) => {
  const response = await fetch(`${URL}vehiculos/vehiculos/filter?estado=True`);
  setData((await response.json()).reverse());
};

/**
 * @description Función que permite obtener todos los registros de entrada activos
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataRegistrosEntradas = async (setData) => {
  const response = await fetch(`${URL}registros/registro_is_activate`);
  setData((await response.json()).reverse());
};

// refactorizar desde el backend

/**
 * @description Función que permite obtener todos los registros de entrada
 * que tengan un estado de salida falso para que no se muestren
 * en el sistema de registro los datos que tengan relacion
 */ export const getDataRegistros = async () => {
  const data = await fetch(`${URL}registros/registro_entrada?estado=false`);
  return await data.json();
};

/**
 * @description Función que permite obtener todos los los vehiculos
 * que no tengan un registro de entrada sin salida
 */ export const getDataVehiculosEntrada = async (setData) => {
  const response = await fetch(`${URL}vehiculos/vehiculos/filter?estado=True`);
  const res = await response.json();
  let data = await getDataRegistros();
  data = data.map((itemR) => itemR.vehiculo);
  data = res.filter((item) => {
    return !data.includes(item.placa);
  });
  data.reverse();
  setData(data);
};

/**
 * @description Función que permite obtener todas las areas de
 * estacionamiento que no tengan un registro de entrada sin salida
 */ export const getDataEstacionamiento = async (setData) => {
  const respose = await fetch(`${URL}estacionamiento/areas/`);
  const res = await respose.json();
  let data = await getDataRegistros();
  data = data.map((itemR) => itemR.estacionamiento);
  data = res.filter((item) => {
    return !data.includes(item.nombre);
  });
  data.reverse();
  setData(data);
};

/**
 * @description Función que permite obtener todos tipos de residencia
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataTipos = async (setData) => {
  const res = await fetch(`${URL}vehiculos/tipos/`);
  setData(await res.json());
};

/**
 * @description Función que permite obtener todos los registros de pagos activos en el sistema
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getPagos = async (setData) => {
  const response = await fetch(`${URL}registros/registro_entrada_activos`);
  setData((await response.json()).reverse());
};

/**
 * @description Función que permite obtener todos los roles del sistema
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getRole = async (setData) => {
  const response = await fetch(`${URL}users/roles/`);
  setData(await response.json());
};

export const Cobro_Mes = async (item, setData) => {
  const pagosData = await fetch(
    `${URL}registros/cobro_mes?placa=${item.registro_entrada.vehiculo}`
  );
  const pagos = await pagosData.json();
  const sumall = pagos
    .map((item) => item.importe_total)
    .reduce((prev, curr) => prev + curr, 0);
  setData(sumall);
};

