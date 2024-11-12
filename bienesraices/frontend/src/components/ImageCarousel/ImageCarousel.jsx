import React, { useState } from 'react';
import './styles.css';

const ImageCarousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Detecta el clic fuera del contenido del carrusel
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('carousel-overlay')) {
      onClose();
    }
  };

  return (
    <div className="carousel-overlay" onClick={handleOverlayClick}>
      <div className="carousel-content">
        <button className="carousel-close" onClick={onClose}>×</button>
        <button className="carousel-prev" onClick={handlePrev}>‹</button>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
        <button className="carousel-next" onClick={handleNext}>›</button>
      </div>
    </div>
  );
};

export default ImageCarousel;


