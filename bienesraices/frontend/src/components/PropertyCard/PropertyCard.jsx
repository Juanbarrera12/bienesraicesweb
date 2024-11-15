import React, { useState } from 'react'; 
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importar el ícono de ubicación
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import './styles.css';

function PropertyCard({ property }) {
  const { title, price, location, description, images, rooms, bathrooms, amenities, services } = property;
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const imageUrls = images && images.length > 0 
    ? images.map(image => `http://localhost:5000${image.url}`)
    : [];

  const openCarousel = (e) => {
    e.stopPropagation(); // Prevenir propagación del evento
    setIsCarouselOpen(true);
  };
  
  const closeCarousel = () => setIsCarouselOpen(false);

  return (
    <>
      <div className="property-card">
        <div className="property-image-container">
          <img 
            src={imageUrls[0] || 'ruta_a_imagen_predeterminada'}
            alt={title}
            className="property-card-image"
            onClick={openCarousel}
          />
        </div>

        <div className="property-card-content">
          <h3 className="property-card-title">{title}</h3>
          <p className="property-card-price"><strong>Precio:</strong> {price}</p>
          
          {/* Ubicación con ícono y color */}
          <p className="property-card-location">
            <FaMapMarkerAlt color="#007bff" /> {/* Ícono de ubicación con color personalizado */}
            <span className="location-text">{location}</span>
          </p>

          <p className="property-card-description">{description}</p>
          <p className='property-card-description'>*Clic en la imagen para visualizar información</p>
        </div>
      </div>

      {isCarouselOpen && (
        <div className="carousel-container">
          <ImageCarousel
            images={imageUrls}
            onClose={closeCarousel}
            title={title}
            price={price}
            location={location}
            description={description}
            rooms={rooms}
            bathrooms={bathrooms}
            amenities={amenities}
            services={services}
          />
        </div>
      )}
    </>
  );
}

export default PropertyCard;







