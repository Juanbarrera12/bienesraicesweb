// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import './styless.css';
const HeroSection = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <a href={buttonLink} className="hero-button">{buttonText}</a>
      </div>
      <div className="search-bar">
        <div className="search-option">
          <button>Alquiler</button>
          <button>Venta</button>
        </div>
        <div className="search-fields">
          <select>
            <option>Localidad</option>
          </select>
          <select>
            <option>Tipo de Propiedad</option>
          </select>
          <select>
            <option>Rango de Precio</option>
          </select>
          <button>Buscar</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

