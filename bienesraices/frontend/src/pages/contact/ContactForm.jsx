import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar'
import './styles.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // Estado para la calificación
  const [hoverRating, setHoverRating] = useState(0); // Estado para el hover de las estrellas

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado con una calificación de ${rating} estrellas`);
    setName('');
    setEmail('');
    setMessage('');
    setRating(0); // Reinicia la calificación después del envío
    setHoverRating(0); // Reinicia el hover después del envío
  };

  // Maneja la calificación por estrellas
  const handleRatingClick = (value) => {
    setRating(value);
    setHoverRating(0); // Reinicia el hover al hacer click
  };

  // Maneja el hover de las estrellas
  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  // Maneja el final del hover
  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
    <Navbar className="no-animation" />
    <section className="contact-form">
      
      <h2>Contáctanos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {/* Componente de calificación por estrellas con título */}
        <div className="star-rating-container">
          <p className="rating-title">Calificación</p>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < (hoverRating || rating) ? 'selected' : ''}`}
                onClick={() => handleRatingClick(index + 1)}
                onMouseEnter={() => handleStarHover(index + 1)}
                onMouseLeave={handleStarLeave}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
    </>
  );
};

export default ContactForm;
