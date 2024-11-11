// src/components/AboutUs/AboutUs.jsx
import React from 'react';
import './styles.css';
const AboutUs = ({ title, content }) => {
  return (
    <section className="about-us">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default AboutUs;

