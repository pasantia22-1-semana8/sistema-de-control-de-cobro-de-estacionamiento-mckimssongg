import React from "react";
import Loader from "../Loader";
import  Aviso from "../Aviso";
import "../../css/bootstrap.min.css";

function TablaVehiculos({ data }) {
  const [loading, setLoading] = React.useState(true);

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
              <th scope="col">estado</th>
              <th scope="col">tipo de residencia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.placa}</td>
                <td>{item.tipo_vehiculo}</td>
                <td>{item.descripcion}</td>
                <td>
                  {item.estado && <p style={{ color: "green" }}>activo</p>}
                  {!item.estado && <p style={{ color: "red" }}>X</p>}
                </td>
                <td>{item.tipo_residencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TablaVehiculos;
