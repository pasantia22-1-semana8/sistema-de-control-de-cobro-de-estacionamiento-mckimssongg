// Metodos GET

import swal from "sweetalert";

export const mostrarAlerta = () => {
  swal({
    title: "¡Registro exitoso!",
    timer: 2000,
  });
};

export const getDataVehiculosActivos = async (setData) => {
  const response = await fetch(
    "http://localhost:8000/vehiculos/vehiculos/entrada"
  );
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
