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

  return (
    <div className="carousel-overlay">
      <div className="carousel-content">
        <button className="carousel-close" onClick={onClose}>×</button>
        <button className="carousel-prev" onClick={handlePrev}>‹</button>
        <div className="carousel-image" style={{ backgroundImage: `url(${images[currentIndex]})` }}></div>
        <button className="carousel-next" onClick={handleNext}>›</button>
      </div>
    </div>
  );
};

export default ImageCarousel;
