// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import './styless.css';
import SearchBar from '../searchbar/search-bar'; // Importa el SearchBar

const HeroSection = ({ title, subtitle }) => (
  <div className="hero">
    <div className="hero::before"></div> {/* Overlay */}
    <div className="hero-text">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    <SearchBar /> {/* Agrega la barra de búsqueda */}
  </div>
);

export default HeroSection;
