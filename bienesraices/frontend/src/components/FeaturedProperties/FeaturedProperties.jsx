// src/components/FeaturedProperties/FeaturedProperties.jsx
import React, { memo } from 'react';
import './styles.css';

const FeaturedProperties = () => {
  const properties = [
    { title: 'Localidad 1', listings: '25 listas', image: '/images/1.jpg' },
    { title: 'Localidad 2', listings: '18 listas', image: '/images/2.jpg' },
  ];

  return (
    <section className="properties-area" aria-labelledby="featured-properties">
      <h2 id="featured-properties">Propiedades Destacadas</h2>
      <p>Encuentra las mejores propiedades en las ubicaciones más exclusivas.</p>
      <div className="properties-grid">
        {properties.map((property, index) => (
          <div className="property-card" key={index}>
            <div
              className="property-card-image"
              style={{ backgroundImage: `url(${property.image})` }}
              role="img"
              aria-label={`Imagen de ${property.title}`}
            ></div>
            <div className="property-card-content">
              <h3 className="property-card-title">{property.title}</h3>
              <p className="property-card-listings">{property.listings}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(FeaturedProperties);

