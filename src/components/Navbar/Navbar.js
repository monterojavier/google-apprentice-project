import React from "react";
import Color from "color";

import "./Navbar.css";

function Navbar() {
  const color = Color("#F0F2A6");
  // const colorEnd = Color("#F0F2A6");

  return (
    <nav className="navbar">
      <h1
        style={{
          color: color.hex(),
          position: "static",
        }}
      >
        Shopping List
      </h1>
    </nav>
  );
}

export default Navbar;
