// Metodos GET

const URL = "http://localhost:8000/";

import swal from "sweetalert";

export const mostrarAlerta = () => {
  swal({
    title: "¡Registro exitoso!",
    timer: 2000,
  });
};

/**
 * @param {function} setData - Funcion para setear los datos en el state
 */ export const getDataVehiculosActivos = async (setData) => {
  const response = await fetch(`${URL}vehiculos/vehiculos/entrada`);
  const data = await response.json();
  data.reverse();
  setData(data);
};

export const getDataVehiculos = async (setData) => {
  await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/filter?estado=True", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      data.reverse();
      setData(data);
    });
};

export const getDataTipos = async (setData) => {
  await fetch("http://127.0.0.1:8000/vehiculos/tipos/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
