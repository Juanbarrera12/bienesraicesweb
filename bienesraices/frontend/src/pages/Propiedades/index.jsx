import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import PropertyFilter from '../../components/PropertyFilter/PropertyFilter';
import Footer from '../../components/Footer/footer';
import './styles.css';

const Propiedades = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
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
      setFilteredProperties(response.data); // Mostrar todas las propiedades al inicio
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
      setError("Error al cargar propiedades. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = useCallback((property) => {
    setSelectedProperty(property); // Abrir el carrusel en modo pantalla completa
  }, []);

  const handleCloseCarousel = useCallback(() => {
    setSelectedProperty(null); // Cerrar el carrusel
  }, []);

  const filterProperties = useCallback((filters) => {
    const { location, type, maxPrice, rooms, bathrooms, amenities, services } = filters;

    const filtered = properties.filter((property) => {
      const matchesLocation = location
        ? property.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type ? property.type === type : true;
      const matchesPrice = maxPrice
        ? parseFloat(property.price.replace(/[^\d.-]/g, '')) <= parseFloat(maxPrice)
        : true;
      const matchesRooms = rooms ? property.rooms >= rooms : true;
      const matchesBathrooms = bathrooms ? property.bathrooms >= bathrooms : true;
      const matchesAmenities = amenities
        ? amenities.every((amenity) => property.amenities.includes(amenity))
        : true;
      const matchesServices = services
        ? services.every((service) => property.services.includes(service))
        : true;

      return (
        matchesLocation &&
        matchesType &&
        matchesPrice &&
        matchesRooms &&
        matchesBathrooms &&
        matchesAmenities &&
        matchesServices
      );
    });

    setFilteredProperties(filtered);
  }, [properties]);

  if (loading) {
    return <p className="loading-message" aria-live="polite">Cargando propiedades...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="propiedades-page">
      <Navbar />
      <main>
        <h1>Propiedades</h1>
        <PropertyFilter onFilter={filterProperties} />
        <section aria-labelledby="property-list-title" className="properties-section">
          <h2 id="property-list-title" className="visually-hidden">
            Lista de propiedades
          </h2>
          {filteredProperties.length === 0 ? (
            <div className="no-properties-message">
              <p aria-live="polite">No se encontraron propiedades que coincidan con los filtros.</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => handleCardClick(property)}
                />
              ))}
            </div>
          )}
        </section>
        {selectedProperty && (
          <ImageCarousel
            images={selectedProperty.imageUrls}
            onClose={handleCloseCarousel}
            isFullscreen={true}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Propiedades;


