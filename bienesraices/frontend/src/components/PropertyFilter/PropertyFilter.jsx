import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { FaTimes, FaFilter } from 'react-icons/fa';
import './styles.css';

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

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/properties/filter-options');
        setFilters(response.data);
      } catch (error) {
        console.error('Error al cargar opciones de filtro:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleSelectChange = useCallback((selectedOption, { name }) => {
    const value = Array.isArray(selectedOption)
      ? selectedOption.map((opt) => opt.value)
      : selectedOption
      ? selectedOption.value
      : '';

    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  }, [selectedFilters, onFilter]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const updatedFilters = { ...selectedFilters, [name]: value ? Number(value) : '' };
      setSelectedFilters(updatedFilters);
      onFilter(updatedFilters);
    },
    [selectedFilters, onFilter]
  );

  const clearAllFilters = useCallback(() => {
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
  }, [onFilter]);

  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const generateOptions = useCallback((options) =>
    options.map((option) => ({ value: option, label: option })), []);

  return (
    <div className="filter-container">
      {/* Botón para mostrar/ocultar filtros */}
      <button
        className="toggle-filter-btn"
        onClick={toggleFilterVisibility}
        aria-expanded={isFilterVisible}
        aria-controls="filter-options"
      >
        {isFilterVisible ? 'Ocultar filtros' : 'Mostrar filtros'} <FaFilter />
      </button>

      {/* Renderizar filtros solo si están visibles */}
      {isFilterVisible && (
        <div id="filter-options" className="property-filter filter-open">
          {isLoading ? (
            <p>Cargando opciones de filtro...</p>
          ) : (
            <>
              <label htmlFor="location-select">Ubicación</label>
              <Select
                id="location-select"
                name="location"
                options={generateOptions(filters.locations)}
                placeholder="Selecciona una ubicación"
                onChange={handleSelectChange}
                value={
                  selectedFilters.location
                    ? { value: selectedFilters.location, label: selectedFilters.location }
                    : null
                }
              />

              <label htmlFor="type-select">Tipo de Propiedad</label>
              <Select
                id="type-select"
                name="type"
                options={generateOptions(filters.types)}
                placeholder="Selecciona un tipo de propiedad"
                onChange={handleSelectChange}
                value={
                  selectedFilters.type
                    ? { value: selectedFilters.type, label: selectedFilters.type }
                    : null
                }
              />

              <label htmlFor="amenities-select">Comodidades</label>
              <Select
                id="amenities-select"
                name="amenities"
                options={generateOptions(filters.amenities)}
                isMulti
                placeholder="Selecciona amenities"
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, { name: 'amenities' })
                }
                value={selectedFilters.amenities.map((amenity) => ({
                  value: amenity,
                  label: amenity,
                }))}
              />

              <label htmlFor="rooms-input">Número de habitaciones</label>
              <input
                id="rooms-input"
                type="number"
                name="rooms"
                placeholder="Número de habitaciones"
                value={selectedFilters.rooms}
                onChange={handleInputChange}
                min="0"
              />

              <label htmlFor="bathrooms-input">Número de baños</label>
              <input
                id="bathrooms-input"
                type="number"
                name="bathrooms"
                placeholder="Número de baños"
                value={selectedFilters.bathrooms}
                onChange={handleInputChange}
                min="0"
              />

              <button onClick={clearAllFilters} className="clear-all-btn">
                Eliminar filtros <FaTimes />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PropertyFilter;




