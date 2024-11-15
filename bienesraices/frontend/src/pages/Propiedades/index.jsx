import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import PropertyFilter from '../../components/PropertyFilter/PropertyFilter'; // Importar el PropertyFilter
import './styles.css';

const Propiedades = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]); // Para almacenar las propiedades filtradas
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
      setFilteredProperties(response.data); // Por defecto, mostrar todas las propiedades
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
      setError("Error al cargar propiedades. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property); // Abrir el carrusel en modo pantalla completa
  };

  const handleCloseCarousel = () => {
    setSelectedProperty(null); // Cerrar el carrusel
  };

  // Llamada para obtener las propiedades filtradas
  const filterProperties = (filters) => {
    const { location, type, maxPrice, rooms, bathrooms, amenities, services } = filters;

    const filtered = properties.filter((property) => {
      const matchesLocation = location ? property.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesType = type ? property.type === type : true;
      const matchesPrice = maxPrice ? parseFloat(property.price.replace(/[^\d.-]/g, '')) <= parseFloat(maxPrice) : true;
      const matchesRooms = rooms ? property.rooms >= rooms : true;
      const matchesBathrooms = bathrooms ? property.bathrooms >= bathrooms : true;
      const matchesAmenities = amenities ? amenities.every(amenity => property.amenities.includes(amenity)) : true;
      const matchesServices = services ? services.every(service => property.services.includes(service)) : true;

      return matchesLocation && matchesType && matchesPrice && matchesRooms && matchesBathrooms && matchesAmenities && matchesServices;
    });

    setFilteredProperties(filtered);
  };

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="propiedades-page">
      <Navbar />
      <h1>Propiedades</h1>

      {/* Componente PropertyFilter */}
      <PropertyFilter onFilter={filterProperties} />

      {/* Mostrar el mensaje si no hay propiedades */}
      {filteredProperties.length === 0 && (
        <div className="no-properties-message">
          <p>No se encontraron propiedades que coincidan con los filtros.</p>
        </div>
      )}

      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => handleCardClick(property)}
          />
        ))}
      </div>

      {selectedProperty && (
        <ImageCarousel
          images={selectedProperty.imageUrls} // Aquí pasamos todas las imágenes de la propiedad
          onClose={handleCloseCarousel}
          isFullscreen={true} // Modo pantalla completa
        />
      )}
    </div>
  );
};

export default Propiedades;
