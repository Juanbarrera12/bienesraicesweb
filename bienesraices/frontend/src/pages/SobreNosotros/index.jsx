import React, { useEffect, useRef } from 'react';
import { FaHandshake, FaUsers, FaBullseye, FaWhatsapp, FaFacebook, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/footer';
import './styles.css';

const sectionsData = [
  {
    id: 'history',
    icon: <FaHandshake />,
    title: 'Nuestra Historia',
    description:
      'Desde nuestros inicios, hemos trabajado arduamente para convertirnos en un referente en el mercado inmobiliario, brindando confianza y resultados a nuestros clientes.',
    imageSrc: '/images/historia.avif',
    imageAlt: 'Historia de la empresa',
  },
  {
    id: 'values',
    icon: <FaHandshake />,
    title: 'Valores Corporativos',
    description:
      'Honestidad, transparencia y profesionalismo son los pilares que guían nuestras acciones y relaciones con cada cliente.',
    imageSrc: '/images/valores.jpg',
    imageAlt: 'Valores corporativos',
  },
  {
    id: 'team',
    icon: <FaUsers />,
    title: 'Nuestro Equipo',
    description:
      'Un grupo de expertos apasionados y dedicados a ayudarte a encontrar la propiedad perfecta para tus necesidades.',
    imageSrc: '/images/equipo.jpg',
    imageAlt: 'Equipo de trabajo',
  },
  {
    id: 'mission',
    icon: <FaBullseye />,
    title: 'Nuestra Misión',
    description:
      'Acompañarte en cada paso del proceso, ofreciendo un servicio de calidad para que alcances el éxito en tu transacción inmobiliaria.',
    additionalDescription:
      'Todos buscan su lugar en el mundo, nuestra misión es ayudarte a encontrar el tuyo.',
    imageSrc: '/images/mision.jpg',
    imageAlt: 'Misión de la empresa',
  },
];

const AboutUs = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      {/* Redes Sociales */}
      <div className="social-media-container">
        <a href="#whatsapp" className="social-button" aria-label="Contacto por WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="#facebook" className="social-button" aria-label="Página de Facebook">
          <FaFacebook />
        </a>
        <a href="#email" className="social-button" aria-label="Enviar correo electrónico">
          <FaEnvelope />
        </a>
      </div>

      {/* Secciones Dinámicas */}
      <div className="about-us-container">
        {sectionsData.map((section, index) => (
          <article
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`about-section ${section.id}`}
            role="region"
            aria-labelledby={`${section.id}-title`}
          >
            <div className="about-content">
              <div className="icon">{section.icon}</div>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              <p>{section.description}</p>
              {section.additionalDescription && <p><strong>{section.additionalDescription}</strong></p>}
            </div>
            <img
              src={section.imageSrc}
              alt={section.imageAlt}
              className="about-image"
              loading="lazy"
            />
          </article>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;





