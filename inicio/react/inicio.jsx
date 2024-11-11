import React, { useState } from 'react';

const RealEstate = () => {
  const [filters, setFilters] = useState({
    operation: 'Alquiler',
    location: '',
    propertyType: '',
    priceRange: '',
    rooms: '',
    bathrooms: '',
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    // Lógica para buscar con los filtros aplicados
    console.log("Filtros de búsqueda:", filters);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <nav className="navbar-main">
          <div className="logo">REAL Estate</div>
          <ul className="nav-links">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Propiedades</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
          </ul>
          <button className="add-listing">Add Listing</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Encuentra la casa de tus sueños</h1>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat.</p>
        </div>
        <div className="search-bar">
          <div className="search-option">
            <button onClick={() => setFilters({ ...filters, operation: 'Alquiler' })}>Alquiler</button>
            <button onClick={() => setFilters({ ...filters, operation: 'Venta' })}>Venta</button>
          </div>
          <div className="search-fields">
            <select name="location" value={filters.location} onChange={handleFilterChange}>
              <option value="">Localidad</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Cordoba">Córdoba</option>
              <option value="Rosario">Rosario</option>
            </select>
            <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange}>
              <option value="">Tipo de Propiedad</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Terreno">Terreno</option>
            </select>
            <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
              <option value="">Rango de Precio</option>
              <option value="0-50000">0 - 50,000</option>
              <option value="50000-100000">50,000 - 100,000</option>
              <option value="100000-200000">100,000 - 200,000</option>
            </select>
            <select name="rooms" value={filters.rooms} onChange={handleFilterChange}>
              <option value="">Habitaciones</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
            <select name="bathrooms" value={filters.bathrooms} onChange={handleFilterChange}>
              <option value="">Baños</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      </section>

      {/* Properties by Area */}
      <section className="properties-area">
        <h2>Propiedades</h2>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat.</p>
        <div className="properties-grid">
          <div className="property-card">
            <div className="property-card-image" style={{ backgroundImage: "url('./images/1.jpg')" }}></div>
            <div className="property-card-content">
              <div className="property-card-title">Localidad</div>
              <div className="property-card-listings">25 listings</div>
            </div>
          </div>
          {/* Más tarjetas de propiedades pueden agregarse aquí */}
        </div>
      </section>
    </div>
  );
};

export default RealEstate;
