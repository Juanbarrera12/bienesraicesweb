import React from 'react';
import './styles.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <h2 id="footer-title" className="visually-hidden">Información del pie de página</h2>
      <div className="footer-container">
        {/* Columna del mapa */}
        <div className="footer-column" aria-labelledby="footer-location-title">
          <h3 id="footer-location-title">Encuéntranos</h3>
          <iframe
            title="Ubicación de Tu Inmobiliaria en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3282.827292510893!2d-68.32242191055458!3d-34.633804489313974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDM4JzAxLjciUyA2OMKwMTknMDMuMiJX!5e0!3m2!1ses!2sar!4v1732145052384!5m2!1ses!2sar"
            width="100%"
            height="200"
            className="footer-map"
            loading="lazy"
          ></iframe>
        </div>

        {/* Columna de redes sociales */}
        <div className="footer-column" aria-labelledby="footer-social-title">
          <h3 id="footer-social-title">Síguenos en redes sociales</h3>
          <nav className="social-icons" aria-label="Enlaces a redes sociales">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook aria-hidden="true" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter aria-hidden="true" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Columna de contacto */}
        <div className="footer-column" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title">Contáctanos</h3>
          <address>
            <p>
              <FaPhoneAlt aria-hidden="true" /> <a href="tel:+54912345678">+54 9 1234 5678</a>
            </p>
            <p>
              <FaEnvelope aria-hidden="true" /> <a href="mailto:info@tuinmobiliaria.com">info@tuinmobiliaria.com</a>
            </p>
            <p>Av. Ejemplo 123, Mendoza, Argentina</p>
          </address>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="footer-rights">
        <p>&copy; {new Date().getFullYear()} Tu Inmobiliaria. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;


