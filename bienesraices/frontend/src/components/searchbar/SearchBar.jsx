import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('Venta');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [results, setResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties/search', {
        params: {
          operationType: selectedOption, // Agregar tipo de operación a los parámetros de búsqueda
          type: propertyType,
          location,
          minPrice,
          maxPrice,
        },
      });
      console.log("Resultados de la búsqueda:", response.data);
      setResults(response.data); // Guardar los resultados en el estado
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
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
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">Tipo de propiedad</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Terreno">Terreno</option>
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Ubicación</option>
          <option value="Ciudad 1">Ciudad 1</option>
          <option value="Ciudad 2">Ciudad 2</option>
        </select>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Mostrar resultados de la búsqueda */}
      <div className="search-results">
        {results.length > 0 ? (
          results.map((property) => (
            <div key={property.id} className="result-item">
              <h4>{property.title}</h4>
              <p>Tipo de Operación: {property.operationType}</p>
              <p>Tipo: {property.type}</p>
              <p>Ubicación: {property.location}</p>
              <p>Precio: {property.price}</p>
              <p>Descripción: {property.description}</p>
              {property.images && property.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${image.url}`}
                  alt={`Imagen ${index + 1}`}
                  style={{ width: '150px', borderRadius: '8px', marginRight: '10px' }}
                />
              ))}
            </div>
          ))
        ) : (
          <p>No se encontraron propiedades</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

