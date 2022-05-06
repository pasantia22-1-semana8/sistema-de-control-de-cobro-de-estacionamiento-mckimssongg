import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container p-5">{props.children}</div>
    </React.Fragment>
  );
}

export default Layout;
