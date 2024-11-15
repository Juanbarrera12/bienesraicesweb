import React, { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';
import './styles.css';

const ImageCarousel = ({ 
  images, 
  onClose, 
  title, 
  price, 
  location, 
  description, 
  rooms, 
  bathrooms, 
  amenities, 
  services 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-overlay">
      <div className="carousel-content">
        <button className="carousel-close" onClick={onClose}><HiOutlineX /></button>
        <div className="carousel-images">
          <button className="carousel-prev" onClick={handlePrev}><HiOutlineChevronLeft /></button>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
          <button className="carousel-next" onClick={handleNext}><HiOutlineChevronRight /></button>
        </div>
        <div className="carousel-info">
          <h2>{title}</h2>
          <p><strong>Precio:</strong> {price}</p>
          <p><strong>Ubicación:</strong> {location}</p>
          <p><strong>Descripción:</strong> {description}</p>
          <p><strong>Habitaciones:</strong> {rooms}</p>
          <p><strong>Baños:</strong> {bathrooms}</p>
          <p><strong>Comodidades:</strong> {amenities.join(', ')}</p>
          <p><strong>Servicios:</strong> {services.join(', ')}</p>
          <a href="http://localhost:3000/contact" className="contact-button">Contactar</a>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;











