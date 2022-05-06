import React from "react";

function ChangeState({ item }) {

  const [dataPut, setDataPut] = React.useState({
    estado_de_salida: true,
    estacionamiento: 0,
    vehiculo: 0,
    a_cargo_de: 0,
  });

  const RegistosForm = async () => {
    await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setDataPut({
            estado_de_salida: !res.estado_de_salida,
            estacionamiento: res.estacionamiento,
            vehiculo: res.vehiculo,
            a_cargo_de: res.a_cargo_de,
        });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    RegistosForm();
  }, []);

  const putRegistro = async () => {
    await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPut),
      }
    ).catch((err) => {
        console.log(err);
      });
      window.location.reload();
  };

  return (
    <button onClick={putRegistro} className="btn">
      {dataPut.estado_de_salida && <p style={{ color: "red" }}>Ocupado</p>}
      {!dataPut.estado_de_salida && <p style={{ color: "green" }}>Desocupado</p>}
    </button>
  );
}

export default ChangeState;
