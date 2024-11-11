// src/components/FeaturedProperties/FeaturedProperties.jsx
import React from 'react';
import './styles.css';
const FeaturedProperties = () => {
  return (
    <section className="properties-area">
      <h2>Propiedades Destacadas</h2>
      <p>Encuentra las mejores propiedades en las ubicaciones más exclusivas.</p>
      <div className="properties-grid">
        <div className="property-card">
          <div className="property-card-image" style={{ backgroundImage: "url('./images/1.jpg')" }}></div>
          <div className="property-card-content">
            <div className="property-card-title">Localidad</div>
            <div className="property-card-listings">25 listas</div>
          </div>
        </div>
        {/* Agrega más tarjetas de propiedades si es necesario */}
      </div>
    </section>
  );
};

export default FeaturedProperties;

