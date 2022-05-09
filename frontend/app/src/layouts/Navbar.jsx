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
    title: "Vehiculos",
    path: "/vehiculos",
    cName: "nav-text",
  },
  {
    title: "Registros de Entradas",
    path: "/registros_entradas",
    cName: "nav-text",
  },
  {
    title: "Registros de Entradas Formulario",
    path: "/registros_entradas/form",
    cName: "nav-text",
  },
  {
    title: "Registros de Pagos",
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
  // JSON.parse(localStorage.getItem("dataSesion")).user.role === "admin";
  const [sidebar, setSidebar] = React.useState(false);
  const role = () => {
    if (JSON.parse(localStorage.getItem("dataSesion")).user.role === "admin") {
      return JSON.parse(localStorage.getItem("dataSesion")).user.role;
    } else {
      return "";
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
          {role == 'admin' && OpAdmin.map((item, index) => {
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
