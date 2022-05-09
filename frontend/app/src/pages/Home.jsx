import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

function Home() {
  const navigate = useNavigate();

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
    </React.Fragment>
  );
}
export default Home;
