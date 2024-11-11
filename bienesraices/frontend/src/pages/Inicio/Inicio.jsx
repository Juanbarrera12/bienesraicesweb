// src/pages/Inicio.jsx
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactForm from '../../components/ContactForm/ContactForm';

const Inicio = () => {
  return (
    <div>
      <HeroSection 
        title="Encuentra la casa de tus sueños" 
        subtitle="Propiedades exclusivas a tu alcance" 
        buttonText="Ver Propiedades" 
        buttonLink="/propiedades" 
      />
      <FeaturedProperties />
      <AboutUs 
        title="¿Quiénes Somos?"
        content="Somos una agencia de bienes raíces dedicada a ayudarte a encontrar el hogar ideal. Con años de experiencia en el mercado, te ofrecemos un servicio personalizado y profesional."
      />
      <ContactForm />
    </div>
  );
};

export default Inicio;
