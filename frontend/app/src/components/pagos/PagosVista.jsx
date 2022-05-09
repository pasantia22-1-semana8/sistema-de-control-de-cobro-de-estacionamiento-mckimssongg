import React from "react";
import Loader from "../Loader";

function PagosVista({ data }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Vehiculo</th>
              <th>Fecha de pago</th>
              <th>Realizado por</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.registro_entrada.vehiculo}</td>
                <td>{item.fecha_pago}</td>
                <td>{item.registro_entrada.a_cargo_de}</td>
                <td>
                  {item.importe_total !== 0 && `Q${item.importe_total}`}
                  {item.importe_total == 0 && "Es oficial"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PagosVista;
