// src/pages/Inicio.jsx
import React, { memo } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection';
import PurchaseProcess from '../../components/PurchaseProcess/PurchaseProcess';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/footer';

const Inicio = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title="Encuentra la casa de tus sueños"
        subtitle="Propiedades exclusivas a tu alcance"
      />
      <FeaturedProperties />
      <BenefitsSection />
      <PurchaseProcess />
      <Footer />
      
    </div>
  );
};

export default memo(Inicio);

