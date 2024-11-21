// src/pages/Inicio.jsx
import React, { memo, useEffect } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import PurchaseProcess from '../../components/PurchaseProcess/PurchaseProcess';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/footer';
import './styles.css';

const Inicio = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.inicio-section');
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
      { threshold: 0.3 } // La animación se activa cuando el 30% de la sección es visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="inicio-section">
        <HeroSection
          title="Encuentra la casa de tus sueños"
          subtitle="Propiedades exclusivas a tu alcance"
        />
      </div>
      <div className="inicio-section">
        <FeaturedProperties />
      </div>
      <div className="inicio-section">
        <BenefitsSection />
      </div>
      <div className="inicio-section">
        <PurchaseProcess />
      </div>
      <Footer />
    </div>
  );
};

export default memo(Inicio);


