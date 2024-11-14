// src/components/navbar/navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="http://localhost:3000/" className="logo">
          RealState
        </Link>
        <span className="menu-toggle" onClick={toggleMenu}>☰</span>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={toggleMenu}>Inicio</Link>
          </li>
          <li>
            <Link to="/propiedades" onClick={toggleMenu}>Propiedades</Link>
          </li>
          <li>
            <Link to="/SobreNosotros" onClick={toggleMenu}>Nosotros</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
          </li>
        </ul>
        <button className="add-listing">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
