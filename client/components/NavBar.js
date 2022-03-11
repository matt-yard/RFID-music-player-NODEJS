import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <strong>JUKE</strong>
      </Link>
    </nav>
  );
};

export default NavBar;
