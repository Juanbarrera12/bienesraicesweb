import React from 'react';
import { FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa';
import Navbar from "../../components/navbar/navbar"
import './styles.css';


const RealEstateSection = () => {
  return (
    <>
      <Navbar/>
      {/* Redes Sociales */}
      <div className="re-social-media">
        <a href="#whatsapp" className="re-social-button re-whatsapp">
          <FaWhatsapp className="re-icon" />
        </a>
        <a href="#facebook" className="re-social-button re-facebook">
          <FaFacebook className="re-icon" />
        </a>
        <a href="#email" className="re-social-button re-email">
          <FaEnvelope className="re-icon" />
        </a>
      </div>

      {/* Sección Principal */}
      <div className="re-section">
        {/* Logo */}



        {/* Imagen Principal */}
        <img src="prueba.jpg" alt="Office Interior" className="re-main-image" />

        {/* Contenido de Texto */}
        <div className="re-text-content">
          <h1>COMPANY Bienes Raíces</h1>
          <p>
            Está a tu disposición y ofrece sus servicios relacionados con el sector inmobiliario: transacciones de compra, venta y alquiler.
          </p>
          <h2>NUESTRA MISIÓN</h2>
          <p>
            Brindamos acompañamiento y asistencia de calidad al cliente para llevar a cabo una operación exitosa. Nos caracterizamos por nuestra
            responsabilidad, honestidad, transparencia, profesionalismo y calidad de atención.
          </p>
          <p>
            <strong>
              Todos buscan su lugar en el mundo, nuestra misión es ayudarte a encontrar el tuyo.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default RealEstateSection;
