// src/components/Footer.jsx
import React from 'react';
import './styles.css'; // Archivo CSS para estilos del footer (opcional)

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Tu Sitio Web. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
