// PropertyFilter.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function PropertyFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    amenities: [],
    locations: [],
    types: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    type: '',
    amenities: [],
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

  // Manejador de cambios en los filtros
  const handleChange = (selectedOption, { name }) => {
    setSelectedFilters(prev => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  // Enviar los filtros seleccionados al componente padre (Propiedades)
  const handleApplyFilters = () => {
    onFilter(selectedFilters);
  };

  return (
    <div className="property-filter">
      <Select
        name="location"
        options={filters.locations.map(location => ({ value: location, label: location }))}
        placeholder="Selecciona una ubicación"
        onChange={handleChange}
      />
      <Select
        name="type"
        options={filters.types.map(type => ({ value: type, label: type }))}
        placeholder="Selecciona un tipo de propiedad"
        onChange={handleChange}
      />
      <Select
        name="amenities"
        options={filters.amenities.map(amenity => ({ value: amenity, label: amenity }))}
        isMulti
        placeholder="Selecciona amenities"
        onChange={handleChange}
      />
      <button onClick={handleApplyFilters}>Filtrar</button>
    </div>
  );
}

export default PropertyFilter;



