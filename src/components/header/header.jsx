import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header">
      {/* Logo and Title */}
      <div className="header-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <h3>Kethi Sahhaayaak</h3>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
        <div className={`line ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Navigation Links - Visible on desktop, hidden on mobile */}
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/addProduct")}>Add Product</li>
          <li onClick={() => navigate("/help")}>Help</li>
          <li onClick={() => navigate("/blog")}>Blog</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
