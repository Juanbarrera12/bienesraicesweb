// src/components/BenefitsSection/BenefitsSection.jsx
import React, { useEffect } from 'react';
import { FaBusinessTime, FaUserShield, FaHandsHelping } from 'react-icons/fa'; // Importar iconos
import './styles.css';

const BenefitsSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <h2 id="benefits-title">¿Por qué elegirnos?</h2>
      <div className="benefits-grid">
        <div className="benefit-card fade-in">
          <FaBusinessTime className="benefit-icon" />
          <h3>Experiencia</h3>
          <p>Años de experiencia en el mercado inmobiliario respaldan nuestro trabajo.</p>
        </div>
        <div className="benefit-card fade-in">
          <FaUserShield className="benefit-icon" />
          <h3>Transparencia</h3>
          <p>Ofrecemos procesos claros y seguros para nuestros clientes.</p>
        </div>
        <div className="benefit-card fade-in">
          <FaHandsHelping className="benefit-icon" />
          <h3>Atención Personalizada</h3>
          <p>Nos adaptamos a tus necesidades para ayudarte a encontrar tu propiedad ideal.</p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;


