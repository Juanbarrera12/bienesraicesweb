import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import "./styles.css" // Asegúrate de tener la importación del ícono

function PropertyFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    amenities: [],
    locations: [],
    types: [],
    services: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    type: '',
    amenities: [],
    services: [],
    rooms: '',
    bathrooms: '',
  });

  useEffect(() => {
    // Obtener las opciones de filtro desde el backend
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties/filter-options');
        setFilters(response.data);
      } catch (error) {
        console.error("Error al cargar opciones de filtro:", error);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleSelectChange = (selectedOption, { name }) => {
    let value;
    if (Array.isArray(selectedOption)) {
      value = selectedOption.map(opt => opt.value);
    } else {
      value = selectedOption ? selectedOption.value : '';
    }

    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters, [name]: value ? Number(value) : '' };
    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      location: '',
      type: '',
      amenities: [],
      services: [],
      rooms: '',
      bathrooms: '',
    };
    setSelectedFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="property-filter">
      <Select
        name="location"
        options={(filters.locations || []).map(location => ({ value: location, label: location }))}
        placeholder="Selecciona una ubicación"
        onChange={handleSelectChange}
        value={selectedFilters.location ? { value: selectedFilters.location, label: selectedFilters.location } : null}
      />

      <Select
        name="type"
        options={(filters.types || []).map(type => ({ value: type, label: type }))}
        placeholder="Selecciona un tipo de propiedad"
        onChange={handleSelectChange}
        value={selectedFilters.type ? { value: selectedFilters.type, label: selectedFilters.type } : null}
      />

      <Select
        name="amenities"
        options={(filters.amenities || []).map(amenity => ({ value: amenity, label: amenity }))}
        isMulti
        placeholder="Selecciona amenities"
        onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'amenities' })}
        value={selectedFilters.amenities.map(amenity => ({ value: amenity, label: amenity }))}
      />


      <input
        type="number"
        name="rooms"
        placeholder="Número de habitaciones"
        value={selectedFilters.rooms}
        onChange={handleInputChange}
        min="0"
      />

      <input
        type="number"
        name="bathrooms"
        placeholder="Número de baños"
        value={selectedFilters.bathrooms}
        onChange={handleInputChange}
        min="0"
      />

      {/* Botón único para eliminar todos los filtros */}
      <button onClick={clearAllFilters} className="clear-all-btn">
        Eliminar filtros <FaTimes />
      </button>
    </div>
  );
}

export default PropertyFilter;
