// src/components/PurchaseProcess/PurchaseProcess.jsx
import React, { useEffect } from 'react';
import { FaHandshake, FaSearch, FaShieldAlt } from 'react-icons/fa'; // Importar iconos
import './styles.css';

const PurchaseProcess = () => {
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
    <section className="purchase-process" aria-labelledby="purchase-process-title">
      <h2 id="purchase-process-title">Proceso de Compra Simplificado</h2>
      <div className="process-steps">
        <div className="step fade-in">
          <FaHandshake className="step-icon" />
          <h3>Paso 1: Consulta</h3>
          <p>Habla con uno de nuestros asesores para definir tus necesidades.</p>
        </div>
        <div className="step fade-in">
          <FaSearch className="step-icon" />
          <h3>Paso 2: Búsqueda</h3>
          <p>Encuentra la propiedad ideal con nuestra guía personalizada.</p>
        </div>
        <div className="step fade-in">
          <FaShieldAlt className="step-icon" />
          <h3>Paso 3: Transacción Segura</h3>
          <p>Finaliza la compra o alquiler con total transparencia y seguridad.</p>
        </div>
      </div>
    </section>
  );
};

export default PurchaseProcess;


