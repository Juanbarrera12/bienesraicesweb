import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './styles.css';

function PropertyCard({ property, onClick }) {
  // Validación para asegurar que `property` y sus propiedades estén definidas
  if (!property) return null;
  
  const { title, price, location, description, imageUrl } = property;
  const fullImageUrl = `http://localhost:5000${imageUrl}`;


  // Log para verificar los datos de la propiedad en la consola
  console.log("Property data:", property);

  return (
    <div className="property-card" onClick={onClick}>
      {imageUrl ? (
        <div
          className="property-card-image"
          style={{ backgroundImage: `url(${fullImageUrl})` }}
        ></div>
      ) : (
        <div className="property-card-image-placeholder">
          {/* Placeholder si no hay `imageUrl` */}
          Imagen no disponible
        </div>
      )}
      <div className="property-card-content">
        <h3 className="property-card-title">{title}</h3>
        <p className="property-card-price"><strong>Precio:</strong> {price}</p>
        <p className="property-card-location">
          <FaMapMarkerAlt className="location-icon" /> {location}
        </p>
        <p className="property-card-description">{description}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
