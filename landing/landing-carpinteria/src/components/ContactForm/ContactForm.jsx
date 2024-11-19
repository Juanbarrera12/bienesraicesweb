import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./styles.css";

const ContactForm = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div id="contact" className="contact-container" ref={ref}>
      <motion.h2
        className="contact-title"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Ponte en Contacto
      </motion.h2>
      <motion.p
        className="contact-description"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Nos encantaría saber de ti. Completa el formulario y cuéntanos cómo podemos ayudarte.
      </motion.p>
      <motion.form
        className="contact-form"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input type="text" id="name" name="name" placeholder="Escribe tu nombre completo" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" placeholder="Cuéntanos en qué podemos ayudarte" rows="5" required />
        </div>
        <motion.button
          className="submit-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
        >
          Enviar Mensaje
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactForm;




