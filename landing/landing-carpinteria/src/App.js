import React from "react";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutUs from "./components/AboutUs/AboutUs";
import Services from "./components/Services/Services";
import ContactForm from "./components/ContactForm/ContactForm";
import Footer from "./components/Footer/Footer";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";

const App = () => {
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <Navbar />
      <Element name="hero">
        <HeroSection />
      </Element>
      <Element name="about">
        <AboutUs />
      </Element>
      <Element name="services">
        <Services />
      </Element>
      <Element name="contact">
        <ContactForm />
      </Element>
      <Footer />
    </SimpleBar>
  );
};

export default App;


