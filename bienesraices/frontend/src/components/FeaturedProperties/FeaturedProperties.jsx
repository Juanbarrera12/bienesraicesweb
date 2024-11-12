// src/components/FeaturedProperties/FeaturedProperties.jsx
import React from 'react';
import './styles.css'; // Importa el archivo CSS

// Importa la imagen correctamente desde tu directorio de activos
import propertyImage from '../../images/1.jpg';
 // Cambia la ruta si es necesario

const FeaturedProperties = () => {
  // Datos de propiedades para renderizado dinámico
  const properties = [
    {
      title: 'Localidad 1',
      listings: '25 listas',
      image: propertyImage,
    },
    {
      title: 'Localidad 2',
      listings: '18 listas',
      image: propertyImage, // Cambia las imágenes si tienes más
    },
  ];

  return (
    <section className="properties-area">
      <h2>Propiedades Destacadas</h2>
      <p>Encuentra las mejores propiedades en las ubicaciones más exclusivas.</p>
      <div className="properties-grid">
        {properties.map((property, index) => (
          <div className="property-card" key={index}>
            <div
              className="property-card-image"
              style={{ backgroundImage: `url(${property.image})` }}
            ></div>
            <div className="property-card-content">
              <div className="property-card-title">{property.title}</div>
              <div className="property-card-listings">{property.listings}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
