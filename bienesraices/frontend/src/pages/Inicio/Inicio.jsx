import React, { memo, useEffect, useRef } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import PurchaseProcess from '../../components/PurchaseProcess/PurchaseProcess';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/footer';
import './styles.css';

const Inicio = () => {
  const sectionRefs = useRef([]); // Referencia para las secciones
  const visibleSections = useRef(new Set()); // Rastrear secciones visibles

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (entry.isIntersecting) {
            visibleSections.current.add(sectionId);
            entry.target.classList.add('visible');
          } else {
            visibleSections.current.delete(sectionId);
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.3 } // Activa cuando el 30% de la sección es visible
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: 'hero',
      component: (
        <HeroSection
          title="Encuentra la casa de tus sueños"
          subtitle="Propiedades exclusivas a tu alcance"
        />
      ),
      ariaLabel: 'Hero Section - Casa de tus sueños',
    },
    {
      id: 'featured-properties',
      component: <FeaturedProperties />,
      ariaLabel: 'Propiedades destacadas',
    },
    {
      id: 'benefits',
      component: <BenefitsSection />,
      ariaLabel: 'Beneficios de elegirnos',
    },
    {
      id: 'purchase-process',
      component: <PurchaseProcess />,
      ariaLabel: 'Proceso de compra',
    },
  ];

  return (
    <div>
      <Navbar />
      {sections.map(({ id, component, ariaLabel }, index) => (
        <div
          key={id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="inicio-section"
          data-section-id={id}
          role="region"
          aria-label={ariaLabel}
        >
          {component}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default memo(Inicio);



