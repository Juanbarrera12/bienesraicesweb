// src/components/SearchBar/SearchBar.jsx
import React from 'react';
import './styles.css'; // Importa tus estilos específicos

const SearchBar = () => (
  <div className="search-bar">
    <div className="search-option">
      {/* Botón de opción de búsqueda, se puede cambiar según necesidad */}
      <button className="active">Venta</button>
      <button>Alquiler</button>
    </div>

    <div className="search-fields">
      {/* Select para opciones de búsqueda */}
      <select>
        <option value="">Tipo de propiedad</option>
        <option value="house">Casa</option>
        <option value="apartment">Apartamento</option>
        <option value="land">Terreno</option>
      </select>
      <select>
        <option value="">Ubicación</option>
        <option value="city1">Ciudad 1</option>
        <option value="city2">Ciudad 2</option>
      </select>
      {/* Botón de búsqueda */}
      <button>Buscar</button>
    </div>
  </div>
);

export default SearchBar;
