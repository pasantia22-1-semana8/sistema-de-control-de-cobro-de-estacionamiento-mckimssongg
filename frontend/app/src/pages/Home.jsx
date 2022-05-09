import React from "react";
import { useNavigate } from "react-router-dom";

import TablaVehiculos from "../components/home/TablaVehiculos";
import Search from "../components/home/Search";

import { BsFillHouseFill } from "react-icons/bs";

function Home() {
  const navigate = useNavigate();

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
    const data = await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
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
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <h2 className="m-2">
          <BsFillHouseFill />
        </h2>
        <h1 className="m-2">Home</h1>
      </div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <TablaVehiculos data={vehiculosSearch} />
    </React.Fragment>
  );
}

export default Home;
