import React from "react";
import "./styles.css";
import { FaTree, FaHandsHelping, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div id="about" className="about-container" ref={ref}>
      <motion.h2
        className="about-title"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Sobre Nosotros
      </motion.h2>
      <motion.p
        className="about-description"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        En Carpintería Artesanal nos dedicamos a crear muebles y estructuras
        únicas con materiales de la más alta calidad. Con más de 20 años de
        experiencia, nuestro compromiso es transformar tus ideas en piezas
        exclusivas que destacan por su diseño y durabilidad.
      </motion.p>
      <div className="about-values">
        <motion.div
          className="value-card"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaTree className="value-icon" />
          <h3>Materiales Sostenibles</h3>
          <p>
            Utilizamos madera de origen sostenible para garantizar un impacto
            positivo en el medio ambiente.
          </p>
        </motion.div>
        <motion.div
          className="value-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FaHandsHelping className="value-icon" />
          <h3>Atención Personalizada</h3>
          <p>
            Escuchamos tus ideas y trabajamos contigo para crear exactamente lo
            que necesitas.
          </p>
        </motion.div>
        <motion.div
          className="value-card"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <FaTools className="value-icon" />
          <h3>Artesanía de Calidad</h3>
          <p>
            Cada pieza está diseñada y construida con precisión y detalle para
            garantizar excelencia.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

