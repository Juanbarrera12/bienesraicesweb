import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import './styles.css';
import Footer from '../../components/Footer/footer';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1); // Empieza con un valor de rating válido
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Asegúrate de que rating esté entre 1 y 5 antes de enviar
    if (rating < 1 || rating > 5) {
      setError('La calificación debe ser entre 1 y 5.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, rating }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Mensaje enviado exitosamente');
        // Limpiar el formulario después de enviar
        setName('');
        setEmail('');
        setMessage('');
        setRating(1); // Restablecer el rating a un valor válido
        setHoverRating(0);
      } else {
        setError(data.errors ? data.errors.map(err => err.msg).join(', ') : 'Error al enviar el mensaje');
      }
    } catch (error) {
      setError('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
    setHoverRating(0);
  };

  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      <Navbar className="no-animation" />
      <section className="contact-form">
        <h2>Contáctanos</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
      <Footer />
    </>
  );
};

export default ContactForm;
