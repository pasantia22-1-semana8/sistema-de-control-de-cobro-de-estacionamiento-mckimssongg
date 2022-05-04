import React from 'react'
import { useNavigate } from 'react-router-dom'

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
      <div>Home</div>
    )
}

export default Home