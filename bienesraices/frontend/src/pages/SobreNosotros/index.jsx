// index.jsx
import React, { useEffect } from 'react'; // Asegúrate de importar useEffect aquí
import { FaHandshake, FaUsers, FaBullseye, FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa';
import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/Footer/footer';
import './styles.css';

const AboutUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); // Permite volver a animar si sales y vuelves a entrar
          }
        });
      },
      { threshold: 0.3 } // La animación se activa cuando el 30% de la sección es visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Navbar />

      {/* Redes Sociales */}
      <div className="social-media-container">
        <a href="#whatsapp" className="social-button">
          <FaWhatsapp />
        </a>
        <a href="#facebook" className="social-button">
          <FaFacebook />
        </a>
        <a href="#email" className="social-button">
          <FaEnvelope />
        </a>
      </div>

      {/* Sección Principal */}
      <div className="about-us-container">
        {/* Historia */}
        <div className="about-section history">
          <div className="about-content">
            <h2>Nuestra Historia</h2>
            <p>
              Desde nuestros inicios, hemos trabajado arduamente para convertirnos en un referente en el mercado inmobiliario, brindando confianza y resultados a nuestros clientes.
            </p>
          </div>
          <img src="/images/historia.avif" alt="Nuestra Historia" className="about-image" />
        </div>

        {/* Valores */}
        <div className="about-section values">
          <div className="about-content">
            <FaHandshake className="icon" />
            <h2>Valores Corporativos</h2>
            <p>
              Honestidad, transparencia y profesionalismo son los pilares que guían nuestras acciones y relaciones con cada cliente.
            </p>
          </div>
          <img src="/images/valores.avif" alt="Nuestra Historia" className="about-image" />
        </div>

        {/* Equipo */}
        <div className="about-section team">
          <div className="about-content">
            <FaUsers className="icon" />
            <h2>Nuestro Equipo</h2>
            <p>
              Un grupo de expertos apasionados y dedicados a ayudarte a encontrar la propiedad perfecta para tus necesidades.
            </p>
          </div>
          <img src="/images/equipo.avif" alt="Nuestro Equipo" className="about-image" />
        </div>

        {/* Misión */}
        <div className="about-section mission">
          <div className="about-content">
            <FaBullseye className="icon" />
            <h2>Nuestra Misión</h2>
            <p>
              Acompañarte en cada paso del proceso, ofreciendo un servicio de calidad para que alcances el éxito en tu transacción inmobiliaria.
            </p>
            <p>
              <strong>Todos buscan su lugar en el mundo, nuestra misión es ayudarte a encontrar el tuyo.</strong>
            </p>
          </div>
          <img src="/images/mision.avif" alt="Nuestra Historia" className="about-image" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;