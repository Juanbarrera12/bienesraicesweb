import React from 'react';
import './styless.css';
import SearchBar from '../searchbar/searchbar';

const HeroSection = ({ title, subtitle }) => (
  <div className="hero">
    <div className="hero-text">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    <SearchBar />
  </div>
);

export default HeroSection;

