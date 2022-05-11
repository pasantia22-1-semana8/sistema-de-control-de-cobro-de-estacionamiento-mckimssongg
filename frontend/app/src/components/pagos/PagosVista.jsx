import React from "react";
import Loader from "../Loader";
import Aviso from "../Aviso";
import { ContextGlobal } from "../../context/Context";
import { Link } from "react-router-dom";

function PagosVista({ data }) {
  const [loading, setLoading] = React.useState(true);

  const { setOnPrint } = React.useContext(ContextGlobal);
  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <Aviso mensaje={"pago"} />;
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
              <th scope="col">Vehiculo</th>
              <th scope="col">Fecha de pago</th>
              <th scope="col">Total</th>
              <th scope="col" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.registro_entrada.vehiculo}</td>
                <td>{item.fecha_pago}</td>
                <td>
                  {item.importe_total !== 0 && `Q${item.importe_total}`}
                  {item.importe_total == 0 && "Es oficial"}
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Link to={`/pagos/${item.id}/`}>
                      <button
                        className="btn btn-info fs-6"
                        onClick={() => {
                          setOnPrint(item);
                        }}
                      >
                        Ir a imprimir
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger fs-6"
                      onClick={() => {
                        swal({
                          title: "Estas seguro?",
                          text: `Deseas eliminar el pago ${item.registro_entrada.vehiculo}`,
                          buttons: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            swal("Eliminado!", "El pago ha sido eliminado");
                          } else {
                            swal("Cancelado", "El pago no ha sido eliminado");
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

export default PagosVista;
