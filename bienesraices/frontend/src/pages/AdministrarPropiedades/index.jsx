import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AdministrarPropiedades = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
  });
  const [image, setImage] = useState(null); // Estado para la imagen

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
    }
  };

  // Manejar el envío del formulario para agregar una nueva propiedad con imagen
  const handleAddProperty = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newProperty.title);
    formData.append('price', newProperty.price);
    formData.append('location', newProperty.location);
    formData.append('description', newProperty.description);
    if (image) formData.append('image', image); // Agrega la imagen al FormData

    try {
      await axios.post('http://localhost:5000/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProperties();
      setNewProperty({ title: '', price: '', location: '', description: '' });
      setImage(null); // Limpia el campo de imagen
    } catch (error) {
      console.error("Error al agregar propiedad:", error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error al eliminar propiedad:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      
      {/* Formulario para agregar una nueva propiedad */}
      <form onSubmit={handleAddProperty}>
        <input
          type="text"
          placeholder="Título"
          value={newProperty.title}
          onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Precio"
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Manejar la imagen seleccionada
          required
        />
        <button type="submit">Agregar Propiedad</button>
      </form>

      {/* Lista de propiedades */}
      <h3>Lista de Propiedades</h3>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <h4>{property.title}</h4>
            <p>Precio: {property.price}</p>
            <p>Ubicación: {property.location}</p>
            <p>Descripción: {property.description}</p>
            {property.imageUrl && (
              <img src={`http://localhost:5000${property.imageUrl}`} alt={property.title} style={{ width: '150px', borderRadius: '8px' }} />
            )}
            <button onClick={() => handleDeleteProperty(property.id)}>Eliminar</button> {/* Botón de eliminar */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarPropiedades;


