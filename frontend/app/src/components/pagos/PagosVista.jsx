import React from "react";
import Loader from "../Loader";
import { Aviso } from "../Aviso";
import { ContextGlobal } from "../../context/Context";
import { Link } from "react-router-dom";
import { Modal } from "../../modal/index";
import { Cobro_Mes } from "../../services/Api";

import Fac_Mes from "./Fac_Mes";
import ReactToPrint from "react-to-print";

function PagosVista({ dataPagos }) {
  const [loading, setLoading] = React.useState(true);

  const componetRef = React.useRef();

  const { setOnPrint, onChange, setOnChange, data, openModal, setOpenModal } =
    React.useContext(ContextGlobal);

  const yanose = (algo) => {
    const algooo = data.map((item) => {
      if (item.tipo_residencia === "Residente") {
        return item.placa;
      }
    });
    return algooo.includes(algo);
  };

  const [total, setTotal] = React.useState(0);

  const put_is_activate = async (item) => {
    await fetch(`http://127.0.0.1:8000/registros/registro_pago/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_active: !item.is_active,
        registro_entrada: item.registro_entrada.id,
      }),
    }).catch((err) => {
      console.log(err);
    });
    setOnChange(!onChange);
  };

  React.useEffect(() => {
    if (dataPagos.length > 0) {
      setLoading(false);
    }
  });

  if (dataPagos.length === 0) {
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
              <th scope="col">Tipo de residencia</th>
              <th scope="col" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {dataPagos.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.registro_entrada.vehiculo}</td>
                <td>{item.fecha_pago}</td>
                <td>Q{item.importe_total}</td>
                <td>{item.registro_entrada.tipo_residencia}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    {/* <Link to={`/pagos/${item.id}/`}>
                      <button
                        className="btn btn-info fs-6 m-1"
                        onClick={() => {
                          setOnPrint(item);
                        }}
                      >
                        Ir a imprimir
                      </button>
                    </Link> */}
                    <button
                      className="btn btn-danger fs-6 m-1"
                      onClick={() => {
                        swal({
                          title: "Estas seguro?",
                          text: `Deseas eliminar el pago ${item.registro_entrada.vehiculo}`,
                          buttons: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            put_is_activate(item);
                            swal("Eliminado!", "El pago ha sido eliminado");
                          } else {
                            swal("Cancelado", "El pago no ha sido eliminado");
                          }
                        });
                      }}
                    >
                      Borrar
                    </button>
                    {yanose(item.registro_entrada.vehiculo) && (
                      <button
                        className="btn btn-success fs-6 m-1"
                        onClick={async () => {
                          setOpenModal((prevState) => !prevState);
                          await Cobro_Mes(item, setTotal);
                        }}
                      >
                        Inicio mes
                      </button>
                    )}
                    {!!openModal && (
                      <Modal>
                        <div className="container d-flex flex-column">
                          <ReactToPrint
                            trigger={() => (
                              <button className="btn btn-info m-4">
                                Imprimir ahora
                              </button>
                            )}
                            content={() => componetRef.current}
                          />
                          <Fac_Mes
                            ref={componetRef}
                            placa={item.registro_entrada.vehiculo}
                            cobroTotal={total}
                          />
                          <button
                            className="btn btn-danger fs-6 m-4"
                            onClick={() => {
                              setOpenModal(false);
                            }}
                          >
                            Regresar
                          </button>
                        </div>
                      </Modal>
                    )}
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
