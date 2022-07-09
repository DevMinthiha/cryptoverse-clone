import React from "react";
import { NavLink } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { BsCardImage, BsLightbulbFill } from "react-icons/bs";
import { SiExpertsexchange } from "react-icons/si";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed w-screen bottom-0 left-0 py-4">
      <ul className="nav-menu">
        <NavLink to="/" className="nav-menu-item">
          <ImHome />
          {/* <small>Home</small> */}
        </NavLink>
        <NavLink to="/currencies" className="nav-menu-item">
          <BsCardImage />
          {/* <small>Currencies</small> */}
        </NavLink>
        <NavLink to="/news" className="nav-menu-item">
          <BsLightbulbFill />
          {/* <small>News</small> */}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
