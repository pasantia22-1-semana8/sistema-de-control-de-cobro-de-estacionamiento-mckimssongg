import React from "react";
import "./css/Navbar.css";
import { RiLogoutBoxLine } from "react-icons/ri";

import { Link } from "react-router-dom";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    cName: "nav-text",
  },
  {
    title: "Registros de vehiculos",
    path: "/vehiculos",
    cName: "nav-text",
  },
  {
    title: "Registros de entradas",
    path: "/registros_entradas",
    cName: "nav-text",
  },
  {
    title: "Registros de pagos",
    path: "/pagos",
    cName: "nav-text",
  },
];

const OpAdmin = [
  {
    title: "Configuraciones",
    path: "/",
    cName: "nav-text",
  },
];

function Navbar() {
  const [sidebar, setSidebar] = React.useState(false);
  const role = () => {
    if (JSON.parse(localStorage.getItem("dataSesion"))) {
      if (JSON.parse(localStorage.getItem("dataSesion")).user.role === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // borrar la sesion
  const handleLogout = () => {
    localStorage.removeItem("dataSesion");
    window.location.reload();
  };

  const showSidebar = () => setSidebar(!sidebar);
  RiLogoutBoxLine;
  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <div onClick={showSidebar}>Menu</div>
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          <RiLogoutBoxLine />
          Logout
        </button>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              Menu
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          {role() && OpAdmin.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
