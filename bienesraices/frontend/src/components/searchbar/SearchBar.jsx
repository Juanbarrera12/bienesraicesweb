import React, { useState } from 'react';
import './styles.css';

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('Venta');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log(`Buscando ${selectedOption} de ${propertyType} en ${location}`);
    // Lógica de búsqueda aquí...
  };

  return (
    <div className="search-bar">
      <div className="search-option">
        <button
          className={selectedOption === 'Venta' ? 'active' : ''}
          onClick={() => setSelectedOption('Venta')}
        >
          Venta
        </button>
        <button
          className={selectedOption === 'Alquiler' ? 'active' : ''}
          onClick={() => setSelectedOption('Alquiler')}
        >
          Alquiler
        </button>
      </div>

      <div className="search-fields">
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Tipo de propiedad</option>
          <option value="house">Casa</option>
          <option value="apartment">Apartamento</option>
          <option value="land">Terreno</option>
        </select>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Ubicación</option>
          <option value="city1">Ciudad 1</option>
          <option value="city2">Ciudad 2</option>
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchBar;
