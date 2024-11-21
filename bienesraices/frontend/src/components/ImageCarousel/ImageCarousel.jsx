import React, { useState, useEffect, useCallback } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineX } from 'react-icons/hi';
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
  amenities = [], 
  services = [] 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    },
    [handleNext, handlePrev, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className="carousel-overlay" 
      aria-hidden="false" 
      role="dialog" 
      aria-labelledby="carousel-title" 
      aria-describedby="carousel-description"
    >
      <div className="carousel-content">
        <button className="carousel-close" onClick={onClose} aria-label="Cerrar carrusel">
          <HiOutlineX />
        </button>
        <div className="carousel-images">
          <button 
            className="carousel-prev" 
            onClick={handlePrev} 
            aria-label="Imagen anterior"
          >
            <HiOutlineChevronLeft />
          </button>
          <img
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1} de ${images.length}`}
            className="carousel-image"
            loading="lazy"
          />
          <button 
            className="carousel-next" 
            onClick={handleNext} 
            aria-label="Imagen siguiente"
          >
            <HiOutlineChevronRight />
          </button>
        </div>
        <div className="carousel-info">
          <h2 id="carousel-title">{title}</h2>
          <p><strong>Precio:</strong> {price}</p>
          <p><strong>Ubicación:</strong> {location}</p>
          <p id="carousel-description"><strong>Descripción:</strong> {description}</p>
          <p><strong>Habitaciones:</strong> {rooms}</p>
          <p><strong>Baños:</strong> {bathrooms}</p>
          {amenities.length > 0 && (
            <p><strong>Comodidades:</strong> {amenities.join(', ')}</p>
          )}
          {services.length > 0 && (
            <p><strong>Servicios:</strong> {services.join(', ')}</p>
          )}
          <a href="https://bienesraicesweb.onrender.com/contact" className="contact-button">
            Contactar
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;













