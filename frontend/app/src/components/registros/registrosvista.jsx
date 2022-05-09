import React from "react";
import Loader from "../Loader";
import ChangeState from "./ChangeState";
import Aviso from "../Aviso";


function RegistrosVista({ data }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <Aviso mensaje={"entrada"}/>;
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
                <td>{item.fecha_salida}</td>
                <td>{item.estacionamiento}</td>
                <td>{item.vehiculo}</td>
                <td>{item.a_cargo_de}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RegistrosVista;
