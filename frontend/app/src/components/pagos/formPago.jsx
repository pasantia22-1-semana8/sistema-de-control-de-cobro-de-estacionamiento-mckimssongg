import React from "react";

function Form() {
  const [dataregistros, setDataregistros] = React.useState([]);
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
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        let data = await getPagos();
        data = data.map((item) => item.registro_entrada.id);
        res = res.filter((item) => {
          return data.includes(item.id) == false;
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
        if (res.state) {
          setError({
            state: true,
            message: res.message,
          });
        } else {
          setError({
            state: false,
            message: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getRegistros();
  }, []);

  return (
    <div>
      Realizar Cobro
      <form onSubmit={onSubmit}>
        <select name="registro_entrada" onChange={handleChange}>
            <option value="">Seleccione un registro</option>
            {dataregistros.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.vehiculo}
                </option>
            ))}
        </select>
        <input type="submit" value="Cobrar" />
      </form>
      {error.state ? <p>{error.message}</p> : null}
    </div>
  );
}

export default Form;
