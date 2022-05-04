import React from 'react'
import Loader from '../Loader'


function TablaVehiculos() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const getDataVehiculos = async () => {
        const data = await fetch('http://127.0.0.1:8000/vehiculos/vehiculos/')
        setData(await data.json())
    }
    
    React.useEffect(() => {
        setTimeout(() => {
            if(getDataVehiculos()){
                setLoading(false)
            }
        }, 1000)
    }, [])

    if (loading) {
        return <Loader />
    }else{+
        console.log(data)
        return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.placa}</p>
                </div>
            ))}
        </div>
        )
    }
}

export default TablaVehiculos