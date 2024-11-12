// src/pages/Inicio.jsx
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactForm from '../../components/ContactForm/ContactForm';
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
      <AboutUs />
      <ContactForm />
    </div>
  );
};

export default Inicio;