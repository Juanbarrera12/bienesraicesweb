// index.jsx
import React from 'react';
import { FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa';
import Navbar from "../../components/navbar/navbar";
import './styles.css';

const RealEstateSection = () => {
  return (
    <>
      <Navbar />
      
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
        
        {/* Imagen Principal */}
        <img src="prueba.jpg" alt="Office Interior" className="re-main-image" />

        {/* Contenido de Texto */}
        <div className="re-text-content">
          <h1>COMPANY Bienes Raíces</h1>
          <p>
            Está a tu disposición y ofrece sus servicios relacionados con el sector inmobiliario: transacciones de compra, venta y alquiler.
          </p>
          
          {/* Apartado de Historia */}
          <h2>Nuestra Historia</h2>
          <p>
            Desde nuestra fundación, COMPANY Bienes Raíces ha trabajado arduamente para establecerse como un referente en el mercado inmobiliario. Nuestro compromiso con la calidad y la satisfacción de nuestros clientes ha sido el motor de nuestro éxito a lo largo de los años.
          </p>

          {/* Apartado de Valores */}
          <h2>Valores Corporativos</h2>
          <p>
            Nos caracterizamos por nuestra responsabilidad, honestidad, transparencia, profesionalismo y calidad de atención. Estos valores nos guían en cada transacción y en cada relación con nuestros clientes.
          </p>

          {/* Apartado de Equipo */}
          <h2>Nuestro Equipo</h2>
          <p>
            Contamos con un equipo de profesionales altamente capacitados y apasionados, comprometidos en ayudarte a encontrar el lugar perfecto para ti. Creemos que el trabajo en equipo y la atención personalizada son claves para el éxito.
          </p>

          {/* Apartado de Testimonios */}
          <h2>Testimonios de Clientes</h2>
          <p>
            "Gracias a COMPANY Bienes Raíces, encontré el hogar de mis sueños. Su profesionalismo y dedicación hicieron que el proceso fuera fácil y seguro." - <em>Cliente Satisfecho</em>
          </p>

          {/* Misión */}
          <h2>NUESTRA MISIÓN</h2>
          <p>
            Brindamos acompañamiento y asistencia de calidad al cliente para llevar a cabo una operación exitosa. Nos caracterizamos por nuestra responsabilidad, honestidad, transparencia, profesionalismo y calidad de atención.
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
