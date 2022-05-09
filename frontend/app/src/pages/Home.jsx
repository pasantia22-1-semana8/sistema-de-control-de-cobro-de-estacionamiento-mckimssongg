import React from "react";
import { useNavigate } from "react-router-dom";
import TablaVehiculos from "../components/home/TablaVehiculos";
import Search from "../components/home/Search";
import { BsFillHouseFill } from "react-icons/bs";
import {ContextGlobal} from "../context/Context";

function Home() {
  const navigate = useNavigate();

  const {searchValue, setSearchValue, vehiculosSearch} = React.useContext(ContextGlobal);

  React.useEffect(() => {
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
