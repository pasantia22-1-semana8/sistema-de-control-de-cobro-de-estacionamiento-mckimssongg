import React from 'react'
import { useNavigate } from 'react-router-dom'
import Registros from '../components/registros/registrosvista'
import Search from '../components/home/search'
function Registros_Entradas() {
    const navigate = useNavigate()
    const [data, setData] = React.useState([]);
    const [searchValue , setSearchValue] = React.useState('');

    const registros_entradaSearch  = []

    if (searchValue !== '') {
        data.map((item) => {
            if (item.estacionamiento.toLowerCase().includes(searchValue.toLowerCase())) {
                registros_entradaSearch.push(item)
            }
        })
    }else{
        registros_entradaSearch.push(...data)
    }
    const getDataVehiculos = async () => {
      const data = await fetch(`http://127.0.0.1:8000/registros/registro_entrada?estado=`, {
        method: 'GET',
    })
      setData(await data.json())
    }
    
    React.useEffect(() => {
      getDataVehiculos()
      if (!localStorage.getItem('dataSesion')) {
        return navigate('/Login')
      }
    }, [])

  return (
    <div>Registros_Entradas
        <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
        <Registros data={registros_entradaSearch}/>
    </div>
  )
}

export default Registros_Entradas