import React, { useState, useEffect, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Si hay token, está autenticado
  }, []);

  // Alternar menú
  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState);
  }, []);

  // Manejar logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token"); // Elimina el token de autenticación
    setIsAuthenticated(false); // Actualiza el estado
    navigate("/"); // Redirige al inicio
  }, [navigate]);

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
          className={`nav-links ${menuOpen ? "active" : ""}`}
          role="menu"
        >
          <li role="menuitem">
            <Link to="/" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li role="menuitem">
            <Link to="/propiedades" onClick={toggleMenu}>
              Propiedades
            </Link>
          </li>
          <li role="menuitem">
            <Link to="/SobreNosotros" onClick={toggleMenu}>
              Nosotros
            </Link>
          </li>
          <li role="menuitem">
            <Link to="/contact" onClick={toggleMenu}>
              Contacto
            </Link>
          </li>
          {/* Mostrar solo si está autenticado */}
          {isAuthenticated && (
            <>
              <li role="menuitem">
                <Link
                  to="/admin/propiedades"
                  onClick={toggleMenu}
                  className="admin-panel-link"
                >
                  Panel de Administración
                </Link>
              </li>
              <li role="menuitem">
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  aria-label="Cerrar sesión"
                  aria-live="polite"
                >
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {/* Mostrar solo si no está autenticado */}
          {!isAuthenticated && (
            <li role="menuitem">
              <Link to="/Login" onClick={toggleMenu} className="add-listing">
                Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default memo(Navbar);


