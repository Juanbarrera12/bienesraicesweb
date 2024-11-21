import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const AdministrarPropiedades = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    type: '',
    price: '',
    location: '',
    rooms: '',
    bathrooms: '',
    amenities: [],
    services: [],
    description: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [editingProperty, setEditingProperty] = useState(null);

  // Estados para autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyAuthentication = async () => {
      try {
        if (!token) {
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
          return;
        }

        const res = await axios.get('https://bienesraicesweb.onrender.com/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyAuthentication();
  }, []);

  // Cargar propiedades
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://bienesraicesweb.onrender.com/api/properties', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
      setError('Error al cargar propiedades. Inténtalo de nuevo.');
    }
  };

  if (isCheckingAuth) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProperty).forEach((key) => {
      if (key === 'amenities' || key === 'services') {
        formData.append(key, JSON.stringify(newProperty[key]));
      } else {
        formData.append(key, newProperty[key]);
      }
    });
    Array.from(images).forEach((image) => formData.append('images', image));

    try {
      await axios.post('https://bienesraicesweb.onrender.com/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchProperties();
      resetForm();
    } catch (error) {
      console.error('Error al agregar propiedad:', error);
      setError('Error al agregar propiedad. Inténtalo de nuevo.');
    }
  };

  const resetForm = () => {
    setNewProperty({
      title: '',
      type: '',
      price: '',
      location: '',
      rooms: '',
      bathrooms: '',
      amenities: [],
      services: [],
      description: '',
    });
    setImages([]);
    setEditingProperty(null);
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`https://bienesraicesweb.onrender.com/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchProperties();
    } catch (error) {
      console.error('Error al eliminar propiedad:', error);
      setError('Error al eliminar propiedad. Inténtalo de nuevo.');
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setNewProperty(property);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://bienesraicesweb.onrender.com/api/properties/${editingProperty.id}`,
        newProperty,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchProperties();
      resetForm();
    } catch (error) {
      console.error('Error al actualizar propiedad:', error);
      setError('Error al actualizar propiedad. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="admin-panel">
      
      <h2>Panel de Administración</h2>

      <form onSubmit={editingProperty ? handleSaveEdit : handleAddProperty}>
        <input
          type="text"
          placeholder="Título"
          value={newProperty.title}
          onChange={(e) =>
            setNewProperty({ ...newProperty, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Tipo"
          value={newProperty.type}
          onChange={(e) =>
            setNewProperty({ ...newProperty, type: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Precio"
          value={newProperty.price}
          onChange={(e) =>
            setNewProperty({ ...newProperty, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newProperty.location}
          onChange={(e) =>
            setNewProperty({ ...newProperty, location: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Habitaciones"
          value={newProperty.rooms}
          onChange={(e) =>
            setNewProperty({ ...newProperty, rooms: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Baños"
          value={newProperty.bathrooms}
          onChange={(e) =>
            setNewProperty({ ...newProperty, bathrooms: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Descripción"
          value={newProperty.description}
          onChange={(e) =>
            setNewProperty({ ...newProperty, description: e.target.value })
          }
          required
        ></textarea>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
        <button type="submit">
          {editingProperty ? 'Guardar Cambios' : 'Agregar Propiedad'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Lista de Propiedades</h3>
      <ul>
        {properties.length > 0 ? (
          properties.map((property) => (
            <li key={property.id} className="property-item">
              <h4>{property.title}</h4>
              <p>Tipo: {property.type}</p>
              <p>Precio: {property.price}</p>
              <p>Ubicación: {property.location}</p>
              <p>Habitaciones: {property.rooms}</p>
              <p>Baños: {property.bathrooms}</p>
              <p>Descripción: {property.description}</p>
              {property.amenities && (
                <p>Comodidades: {property.amenities.join(', ')}</p>
              )}
              {property.services && (
                <p>Servicios: {property.services.join(', ')}</p>
              )}

              <button onClick={() => handleEditProperty(property)}>Editar</button>
              <button onClick={() => handleDeleteProperty(property.id)}>
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No hay propiedades para mostrar.</p>
        )}
      </ul>
    </div>
  );
};

export default AdministrarPropiedades;






















