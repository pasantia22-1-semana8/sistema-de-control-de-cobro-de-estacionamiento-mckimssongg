import React from "react";
import swal from "sweetalert";
import {Link} from 'react-router-dom';

function Form() {
  const mostrarAlerta = () => {
    swal({
      title: "¡Registro exitoso!",
      timer: 2000,
    });
  };
  const [dataregistros, setDataregistros] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  const [form, setForm] = React.useState({
    registro_entrada: null,
  });
  const [error, setError] = React.useState({
    state: false,
    message: "",
  });

  setTimeout(() => {
    setError({
      state: false,
      message: "",
    });
  }, 3000);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getPagos = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/registros/registro_pago/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  };

  const getRegistros = async () => {
    await fetch(
      "http://127.0.0.1:8000/registros/registro_entrada?estado=true",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        let data = await getPagos();

        data = data.map((item) => item.registro_entrada.id);

        res = res.filter((item) => {
          return !data.includes(item.id);
        });

        setDataregistros(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/registros/registro_pago/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (typeof res.registro_entrada.id === "number") {
          mostrarAlerta();
          setOnChange(!onChange);
        }
        if (typeof res.registro_entrada[0] == "string") {
          setError({
            state: true,
            message: "El registro de entrada no existe",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  React.useEffect(() => {
    getRegistros();
  }, [onChange]);

  return (
    <div className="d-flex justify-content-center align-items-center  flex-column">
      {error.state && (
        <div className="alert alert-danger text-center" role="alert">
          {error.message}
        </div>
      )}
      <form onSubmit={onSubmit} className="w-50 d-flex align-items-center flex-column">
        <div className="form-group">
          <label className="m-2">Registro de entrada</label>
          <select
            name="registro_entrada"
            onChange={handleChange}
            className="p-2 w-50 m-2"
          >
            <option value="">Seleccione un registro</option>
            {dataregistros.map((item) => (
              <option key={item.id} value={item.id}>
                {item.vehiculo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="p-2 m-2 btn btn-primary w-100">
          Realizar cobro
        </button>
      </form>
      <Link to={"/pagos"} className="m-2">Volver a pagos</Link>
    </div>
  );
}

export default Form;
