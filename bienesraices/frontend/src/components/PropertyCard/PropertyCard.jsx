import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import './styles.css';

function PropertyCard({ property, onClick }) {
  return (
    <div className="property-card" onClick={onClick}>
      <div 
        className="property-card-image" 
        style={{ backgroundImage: `url(${property.images[0]})` }}
      ></div>
      <div className="property-card-content">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-price"><strong>Precio:</strong> {property.price}</p>
        <p className="property-card-location">
          <FaMapMarkerAlt className="location-icon" /> {property.ubicacion}
        </p>
        <p className="property-card-description">{property.description}</p>
      </div>
    </div>
  );
}

export default PropertyCard;


