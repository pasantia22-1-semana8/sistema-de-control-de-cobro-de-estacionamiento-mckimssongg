import React from 'react'
import { useNavigate } from 'react-router-dom'

import TablaVehiculos from '../components/home/tablaVehiculos'

function Home() {
    const [sesion, setSesion] = React.useState(false);
  
    const navigate = useNavigate()

    React.useEffect(() => {
      if (localStorage.getItem('dataSesion')) {
        setSesion(true);
      }
      else{
        setSesion(false);
        return navigate('/Login')
      }
    })
    return (
      <React.Fragment>
        <div>Home</div>
        <TablaVehiculos />
      </React.Fragment>
    )
}

export default Home