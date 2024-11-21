// src/components/navbar/navbar.jsx
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar-main">
        <Link to="/" className="logo" aria-label="Inicio">
          RealEstate
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation-menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <ul
          id="navigation-menu"
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          role="menu"
        >
          <li role="menuitem">
            <Link to="/" onClick={toggleMenu}>Inicio</Link>
          </li>
          <li role="menuitem">
            <Link to="/propiedades" onClick={toggleMenu}>Propiedades</Link>
          </li>
          <li role="menuitem">
            <Link to="/SobreNosotros" onClick={toggleMenu}>Nosotros</Link>
          </li>
          <li role="menuitem">
            <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
          </li>
        </ul>
        <button className="add-listing" aria-label="Iniciar Sesión">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default memo(Navbar);
