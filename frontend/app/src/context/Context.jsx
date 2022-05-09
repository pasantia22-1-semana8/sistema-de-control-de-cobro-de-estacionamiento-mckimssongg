import React from "react";

const ContextGlobal = React.createContext();

function ContextGlobalProvider(props) {
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const vehiculosSearch = [];

  if (searchValue !== "") {
    data.map((item) => {
      if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
        vehiculosSearch.push(item);
      }
    });
  } else {
    vehiculosSearch.push(...data);
  }
  const getDataVehiculos = async () => {
      await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.reverse();
        setData(data);
      });
  };

    React.useEffect(() => {
        getDataVehiculos();
    }, []);
    
  return (
    <ContextGlobal.Provider value={{
        searchValue,
        setSearchValue,
        vehiculosSearch,
    }}>{props.children}</ContextGlobal.Provider>
  );
}

export { ContextGlobal, ContextGlobalProvider };