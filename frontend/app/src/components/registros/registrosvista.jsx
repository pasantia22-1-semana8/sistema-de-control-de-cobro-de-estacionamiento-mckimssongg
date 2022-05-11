import React from "react";
import Loader from "../Loader";
import ChangeState from "./ChangeState";
import { Aviso } from "../Aviso";
import { ContextGlobal } from "../../context/Context";

function RegistrosVista({ data }) {
  const [loading, setLoading] = React.useState(true);
  const { onChange, setOnChange } = React.useContext(ContextGlobal);

  const RegistosForm = async (item) => {
    const dataReg = await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`,
      {
        method: "GET",
      }
    );
    const data = await dataReg.json();
    return data;
  };

  const putRegistro = async (item) => {
    const dataRegistro = await RegistosForm(item);
    dataRegistro["is_active"] = !dataRegistro["is_active"];
    console.log(dataRegistro);
    await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${dataRegistro.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistro),
      }
    ).catch((err) => {
      console.log(err);
    });
    setOnChange(!onChange);
  };

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <Aviso mensaje={"entrada"} />;
  }
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">estado de salida</th>
              <th scope="col">fecha de entrada</th>
              <th scope="col">fecha de salida</th>
              <th scope="col">estacionamiento</th>
              <th scope="col">placas del heviculo</th>
              <th scope="col">registrado por</th>
              <th scope="col" className="text-center">
                acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  <ChangeState item={item} />
                </td>
                <td>{item.fecha_entrada}</td>
                <td>
                  {item.fecha_salida !== item.fecha_entrada &&
                    item.fecha_salida}
                  {item.fecha_salida == item.fecha_entrada && "sin salida"}
                </td>
                <td>{item.estacionamiento}</td>
                <td>{item.vehiculo}</td>
                <td>{item.a_cargo_de}</td>
                <td>
                  <button
                    className="btn btn-danger fs-6 m-2"
                    onClick={() => {
                      swal({
                        title: "Estas seguro?",
                        text: `Deseas eliminar el registro ${item.vehiculo}`,
                        buttons: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          putRegistro(item);
                          swal("Eliminado!", "El registro ha sido eliminado");
                        } else {
                          swal("Cancelado", "El registro no ha sido eliminado");
                        }
                      });
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RegistrosVista;
