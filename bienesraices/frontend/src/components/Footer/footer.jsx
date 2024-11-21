import React from 'react';
import './styles.css'; // Asegúrate de personalizar este archivo para estilos adicionales
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección de mapa */}
        <div className="footer-map">
          <iframe
            title="Ubicación de la inmobiliaria"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3282.827292510893!2d-68.32242191055458!3d-34.633804489313974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDM4JzAxLjciUyA2OMKwMTknMDMuMiJX!5e0!3m2!1ses!2sar!4v1732145052384!5m2!1ses!2sar"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Sección de redes sociales */}
        <div className="footer-social">
          <h4>Síguenos en redes sociales</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
        
        {/* Sección de derechos reservados */}
        <div className="footer-rights">
          <p>&copy; {new Date().getFullYear()} Tu Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
