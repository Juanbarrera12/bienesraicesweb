import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import './styles.css';

const propiedadesData = [
  {
    id: 1,
    title: 'Casa en Palermo',
    description: 'Casa espaciosa con 3 dormitorios y 2 baños.',
    images: ['/images/casa1-1.jpg', '/images/casa1-2.jpg', '/images/casa1-3.jpg'],
  },
  {
    id: 2,
    title: 'Departamento en Recoleta',
    description: 'Moderno departamento en una excelente ubicación.',
    images: ['/images/departamento1-1.jpg', '/images/departamento1-2.jpg'],
  },
  // Agregar más propiedades según sea necesario
];

const Propiedades = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseCarousel = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="propiedades-page">
      <h1>Propiedades</h1>
      <SearchBar />
      <div className="properties-grid">
        {propiedadesData.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => handleCardClick(property)}
          />
        ))}
      </div>
      {selectedProperty && (
        <ImageCarousel images={selectedProperty.images} onClose={handleCloseCarousel} />
      )}
    </div>
  );
};

export default Propiedades;
