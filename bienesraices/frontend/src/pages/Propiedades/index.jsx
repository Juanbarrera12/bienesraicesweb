import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';  // Importa el Navbar
import SearchBar from '../../components/SearchBar/SearchBar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import './styles.css';

const propiedadesData = [
  {
    id: 1,
    title: 'Casa en Palermo',
    price: '$250,000',
    description: 'Casa espaciosa con 3 dormitorios y 2 baños.',
    images: ['/images/Casa1/1.jpg',
      '/images/Casa1/2.jpg',
      '/images/Casa1/3.jpg',
      '/images/Casa1/4.jpg',
      '/images/Casa1/5.jpg',
      '/images/Casa1/6.jpg', ],
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
      <Navbar />  {/* Asegúrate de que esta línea esté aquí */}
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
