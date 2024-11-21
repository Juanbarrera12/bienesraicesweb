import React, { useState, useEffect } from 'react';
import { FaBusinessTime, FaUserShield, FaHandsHelping } from 'react-icons/fa';
import './styles.css';

const BenefitsSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.benefit-card');
      const newVisibleCards = [];
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          newVisibleCards.push(index);
        }
      });
      setVisibleCards(newVisibleCards);
    };

    const debounceScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debounceScroll);
    handleScroll(); // Ejecuta al cargar la página.

    return () => window.removeEventListener('scroll', debounceScroll);
  }, []);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <h2 id="benefits-title">¿Por qué elegirnos?</h2>
      <div className="benefits-grid">
        {[
          {
            icon: <FaBusinessTime aria-hidden="true" />,
            title: 'Experiencia',
            description: 'Años de experiencia en el mercado inmobiliario respaldan nuestro trabajo.',
          },
          {
            icon: <FaUserShield aria-hidden="true" />,
            title: 'Transparencia',
            description: 'Ofrecemos procesos claros y seguros para nuestros clientes.',
          },
          {
            icon: <FaHandsHelping aria-hidden="true" />,
            title: 'Atención Personalizada',
            description: 'Nos adaptamos a tus necesidades para ayudarte a encontrar tu propiedad ideal.',
          },
        ].map((benefit, index) => (
          <div
            key={index}
            className={`benefit-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            role="region"
            aria-labelledby={`benefit-title-${index}`}
          >
            <div className="benefit-icon">{benefit.icon}</div>
            <h3 id={`benefit-title-${index}`}>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;



