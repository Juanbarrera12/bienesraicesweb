import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import "./styles.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      duration: 500,
      offset: -30, // Ajuste para el navbar
    });
    setMenuOpen(false); // Cierra el menú al hacer clic
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
    <div className="logo">Carpintería</div>
    <div className="navbar-buttons">
        <button onClick={() => scrollToSection("hero")}>Inicio</button>
        <button onClick={() => scrollToSection("about")}>Nosotros</button>
        <button onClick={() => scrollToSection("services")}>Servicios</button>
        <button onClick={() => scrollToSection("contact")}>Contacto</button>
    </div>
    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div />
        <div />
        <div />
    </div>
    <div className={`navbar-dropdown ${menuOpen ? "open" : ""}`}>
        <button onClick={() => scrollToSection("hero")}>Inicio</button>
        <button onClick={() => scrollToSection("about")}>Nosotros</button>
        <button onClick={() => scrollToSection("services")}>Servicios</button>
        <button onClick={() => scrollToSection("contact")}>Contacto</button>
    </div>
    </nav>
  );
};

export default Navbar;



