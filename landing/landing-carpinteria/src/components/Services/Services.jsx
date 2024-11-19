import React from "react";
import "./styles.css";
import { FaChair, FaCouch, FaTable } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div id="services" className="services-container" ref={ref}>
      <motion.h2
        className="services-title"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Nuestros Servicios
      </motion.h2>
      <motion.p
        className="services-description"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Ofrecemos una amplia variedad de servicios de carpintería, diseñados
        para satisfacer tus necesidades con creatividad y calidad artesanal.
      </motion.p>
      <div className="services-list">
        <motion.div
          className="service-card"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaChair className="service-icon" />
          <h3>Muebles a Medida</h3>
          <p>
            Diseñamos y fabricamos muebles personalizados que se adaptan
            perfectamente a tu estilo y espacio.
          </p>
        </motion.div>
        <motion.div
          className="service-card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FaCouch className="service-icon" />
          <h3>Restauración</h3>
          <p>
            Restauramos muebles antiguos para devolverles su esplendor y
            funcionalidad original.
          </p>
        </motion.div>
        <motion.div
          className="service-card"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <FaTable className="service-icon" />
          <h3>Diseño de Interiores</h3>
          <p>
            Creamos piezas únicas que embellecen y mejoran la funcionalidad de
            tus espacios interiores.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;


