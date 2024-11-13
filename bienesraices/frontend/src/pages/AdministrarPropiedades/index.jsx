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
  const [images, setImages] = useState([]); // Estado para múltiples imágenes

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

  // Manejar el envío del formulario para agregar una nueva propiedad con múltiples imágenes
  const handleAddProperty = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newProperty.title);
    formData.append('price', newProperty.price);
    formData.append('location', newProperty.location);
    formData.append('description', newProperty.description);

    // Agregar cada imagen al FormData
    Array.from(images).forEach((image) => {
      formData.append('images', image); // Agrega cada imagen seleccionada
    });

    try {
      await axios.post('http://localhost:5000/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProperties();
      setNewProperty({ title: '', price: '', location: '', description: '' });
      setImages([]); // Limpia el campo de imágenes
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
        ></textarea>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)} // Manejar múltiples imágenes seleccionadas
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
            
            {/* Mostrar múltiples imágenes */}
            {property.images && property.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image.url}`}
                alt={`Imagen ${index + 1}`}
                style={{ width: '150px', borderRadius: '8px', marginRight: '10px' }}
              />
            ))}

            <button onClick={() => handleDeleteProperty(property.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarPropiedades;




