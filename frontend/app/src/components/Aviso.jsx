import React from 'react'

function Aviso({ mensaje }) {
  return (
    //   aun no tienes registros aviso
    <div className="alert alert-warning text-center" role="alert">
        <h4 className="alert-heading">Aviso</h4>
        <p >
            No tienes registros de {mensaje}
        </p>
        <hr />
        <p className="mb-0">
            Para agregar un {mensaje}, haz click en el boton de agregar
        </p>
    </div>
  )
}

export default Aviso