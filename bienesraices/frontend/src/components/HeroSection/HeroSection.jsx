// src/components/HeroSection/HeroSection.jsx
import React, { memo } from 'react';
import './styles.css';

const HeroSection = ({ title, subtitle }) => (
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-overlay">
      <div className="hero-text">
        <h1 id="hero-title">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Ubicación" aria-label="Buscar ubicación" />
      <select aria-label="Tipo de Propiedad">
        <option value="">Tipo de Propiedad</option>
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="terreno">Terreno</option>
      </select>
      <input type="number" placeholder="Precio Máximo" aria-label="Precio Máximo" />
      <button className="search-button">Buscar</button>
    </div>
  </section>
);

export default memo(HeroSection);




