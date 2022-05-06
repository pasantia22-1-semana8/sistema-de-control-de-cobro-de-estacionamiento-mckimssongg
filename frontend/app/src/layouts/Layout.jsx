import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
