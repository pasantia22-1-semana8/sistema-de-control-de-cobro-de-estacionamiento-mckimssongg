const URL = "http://localhost:8000/";

import swal from "sweetalert";

export const mostrarAlerta = () => {
  swal({
    title: "¡Registro exitoso!",
    timer: 2000,
  });
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
 * @description Función que permite obtener todos tipos de residencia
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataTipos = async (setData) => {
  const res = await fetch(`${URL}vehiculos/tipos/`);
  setData(await res.json());
};

/**
 * @description Función que permite obtener todos los registros de entrada activos
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataRegistrosEntradas = async (setData) => {
  const response = await fetch(`${URL}registros/registro_is_activate`);
  setData((await response.json()).reverse());
};
