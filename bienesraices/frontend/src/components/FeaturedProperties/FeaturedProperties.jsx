// src/components/FeaturedProperties/FeaturedProperties.jsx
import React, { useState, useEffect, memo } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard'; // Importa el componente PropertyCard
import './styles.css';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties/featured');
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error('Error al cargar propiedades destacadas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al cargar propiedades destacadas:', error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <section className="properties-area" aria-labelledby="featured-properties">
      <h2 id="featured-properties">Propiedades Destacadas</h2>
      <p>Encuentra las mejores propiedades en las ubicaciones más exclusivas.</p>
      <div className="properties-grid">
        {properties.length === 0 ? (
          <p>No se encontraron propiedades destacadas.</p>
        ) : (
          properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))
        )}
      </div>
    </section>
  );
};

export default memo(FeaturedProperties);



