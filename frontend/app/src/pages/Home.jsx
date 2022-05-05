import React from 'react'
import { useNavigate } from 'react-router-dom'

import TablaVehiculos from '../components/home/tablaVehiculos'
import  Search  from '../components/home/Search';


function Home() {
    const navigate = useNavigate()

    const [data, setData] = React.useState([]);
    const [searchValue , setSearchValue] = React.useState('');

    const vehiculosSearch  = []

    if (searchValue !== '') {
        data.map((item) => {
            if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
                vehiculosSearch.push(item)
            }
        })
    }else{
        vehiculosSearch.push(...data)
    }

    const getDataVehiculos = async () => {
      const data = await fetch('http://127.0.0.1:8000/vehiculos/vehiculos/', {
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
      <React.Fragment>
        <div>Home</div>
        <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
        <TablaVehiculos data={vehiculosSearch}/>
      </React.Fragment>
    )
}

export default Home