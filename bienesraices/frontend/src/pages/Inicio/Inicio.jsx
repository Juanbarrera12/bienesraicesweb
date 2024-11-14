// src/pages/Inicio.jsx
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import Navbar from '../../components/navbar/navbar';

const Inicio = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title="Encuentra la casa de tus sueños"
        subtitle="Propiedades exclusivas a tu alcance"
      />
      <FeaturedProperties />
    </div>
  );
};

export default Inicio;