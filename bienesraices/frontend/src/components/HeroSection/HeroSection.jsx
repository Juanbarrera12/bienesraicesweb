// src/components/HeroSection/HeroSection.jsx
import React, { memo } from 'react';
import './styles.css';

const HeroSection = ({ title, subtitle }) => {
  return (
    <section className="hero" aria-labelledby="hero-title" role="banner">
      <div className="hero-overlay">
        <div className="hero-text">
          <h1 id="hero-title">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);




