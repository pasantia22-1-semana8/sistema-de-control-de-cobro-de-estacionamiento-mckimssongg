import React from "react";
import "./css/Navbar.css";

import { Link } from "react-router-dom";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    cName: "nav-text",
  },
  {
    title: "Vehiculos",
    path: "/reports",
    cName: "nav-text",
  },
  {
    title: "Registros de Entradas",
    path: "/products",
    cName: "nav-text",
  },
  {
    title: "Registros de Pagos",
    path: "/pagos",
    cName: "nav-text",
  },
];

function Navbar() {
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <div onClick={showSidebar}>Menu</div>
        </Link>
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
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
