// src/components/PopularAreas/PopularAreas.jsx
import React from 'react';
import './styles.css';

const PopularAreas = () => (
  <section className="popular-areas" aria-labelledby="popular-areas-title">
    <h2 id="popular-areas-title">Áreas Populares</h2>
    <div className="areas-grid">
      <div className="area-card">
        <img src="/images/area1.jpg" alt="Área 1" loading="lazy" />
        <h3>Área 1</h3>
      </div>
      <div className="area-card">
        <img src="/images/area2.jpg" alt="Área 2" loading="lazy" />
        <h3>Área 2</h3>
      </div>
    </div>
  </section>
);

export default PopularAreas;
