// src/components/navbar/navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-main">
        <Link to="/" className="logo">
          RealState
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/propiedades">Propiedades</Link>
          </li>
          <li>
            <Link to="/SobreNosotros">Nosotros</Link>
          </li>
          <li>
            <Link to="/servicios">Servicios</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>
        </ul>

        <button className="add-listing">
          Agregar Propiedad
        </button>
      </div>
    </nav>
  );
};

export default Navbar;