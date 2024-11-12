import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import './styles.css';

const Propiedades = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties'); // Asegúrate de usar la URL correcta
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
      setError("Error al cargar propiedades. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseCarousel = () => {
    setSelectedProperty(null);
  };

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>{error}</p>;
  if (properties.length === 0) return <p>No hay propiedades disponibles.</p>;

  return (
    <div className="propiedades-page">
      <Navbar />
      <h1>Propiedades</h1>
      <SearchBar />
      <div className="properties-grid">
        {properties.map((property) => (
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

