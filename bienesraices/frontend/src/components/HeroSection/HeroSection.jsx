import React, { memo } from 'react';
import './styles.css';

const HeroSection = ({ title, subtitle }) => {
  return (
    <header className="hero" aria-labelledby="hero-title" role="banner">
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-content">
        <h1 id="hero-title" lang="es">{title}</h1>
        <p className="hero-subtitle" lang="es">{subtitle}</p>
      </div>
    </header>
  );
};

export default memo(HeroSection);





