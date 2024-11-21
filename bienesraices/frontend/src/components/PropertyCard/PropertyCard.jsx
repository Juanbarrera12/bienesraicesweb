import React, { useState } from 'react'; 
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importar el ícono de ubicación
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import './styles.css';

const DEFAULT_IMAGE = 'ruta_a_imagen_predeterminada'; // Imagen predeterminada

function PropertyCard({ property }) {
  const { 
    title, 
    price, 
    location, 
    description, 
    images = [], 
    rooms, 
    bathrooms, 
    amenities = [], 
    services = [] 
  } = property;

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  // Generar URLs de las imágenes
  const imageUrls = images.length > 0 
    ? images.map(image => `http://localhost:5000${image.url}`)
    : [DEFAULT_IMAGE];

  const openCarousel = (e) => {
    e.stopPropagation(); // Prevenir propagación del evento
    setIsCarouselOpen(true);
  };
  
  const closeCarousel = () => setIsCarouselOpen(false);

  return (
    <>
      <article className="property-card" aria-label={`Propiedad: ${title}`}>
        <div className="property-image-container">
          <img 
            src={imageUrls[0]}
            alt={`Imagen de la propiedad ${title}`}
            className="property-card-image"
            onClick={openCarousel}
            loading="lazy"
          />
        </div>

        <div className="property-card-content">
          <h3 className="property-card-title">{title}</h3>
          <p className="property-card-price"><strong>Precio:</strong> {price}</p>
          
          {/* Ubicación con ícono y color */}
          <p className="property-card-location">
            <FaMapMarkerAlt color="#007bff" aria-hidden="true" /> {/* Ícono de ubicación con color personalizado */}
            <span className="location-text">{location}</span>
          </p>

          <p className="property-card-description">{description}</p>
          <p className='property-card-description'>*Clic en la imagen para visualizar más información</p>
        </div>
      </article>

      {/* Carrusel de imágenes */}
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








