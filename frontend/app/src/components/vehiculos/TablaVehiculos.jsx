import React from "react";
import Loader from "../Loader";
import Aviso from "../Aviso";
import { ContextGlobal } from "../../context/Context";

function TablaVehiculos({ data }) {
  const [loading, setLoading] = React.useState(true);

  const { cambiarEstado } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <Aviso mensaje="vehiculos" />;
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
              <th scope="col">placa</th>
              <th scope="col">tipo de vehiculo</th>
              <th scope="col">descripcion</th>
              <th scope="col">tipo de residencia</th>
              <th scope="col" className="text-center">
                acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.placa}</td>
                <td>{item.tipo_vehiculo}</td>
                <td>{item.descripcion}</td>
                <td>{item.tipo_residencia}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button className="btn  btn-info fs-6">Editar</button>
                    <button
                      className="btn btn-danger fs-6"
                      onClick={() => {
                        swal({
                          title: "Estas seguro?",
                          text: `Deseas eliminar el vehiculo ${item.placa}`,
                          buttons: true,
                        }).then(async (willDelete) => {
                          if (willDelete) {
                            await cambiarEstado(item);
                            swal("Eliminado!", "El vehiculo ha sido eliminado");
                          } else {
                            swal(
                              "Cancelado",
                              "El vehiculo no ha sido eliminado"
                            );
                          }
                        });
                      }}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TablaVehiculos;
