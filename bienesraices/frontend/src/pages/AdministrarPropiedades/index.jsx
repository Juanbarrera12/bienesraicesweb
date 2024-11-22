import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
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
          setIsCheckingAuth(false); // Finaliza la verificación
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
        setIsCheckingAuth(false); // Finaliza la verificación en cualquier caso
      }
    };

    verifyAuthentication();
  }, []);

  // Cargar propiedades al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties();
    }
  }, [isAuthenticated]);

  // Mostrar un loader mientras se verifica la autenticación
  if (isCheckingAuth) {
    return <div>Cargando...</div>;
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Función para cargar propiedades
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

  // Función para agregar una nueva propiedad
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

  // Función para eliminar una propiedad
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

  // Función para editar una propiedad
  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setNewProperty(property);
  };

  // Función para guardar los cambios en una propiedad editada
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

        <Select
          options={[
            { value: 'Casa', label: 'Casa' },
            { value: 'Departamento', label: 'Departamento' },
          ]}
          className="basic-select"
          placeholder="Selecciona Tipo de Propiedad"
          onChange={(selectedOption) =>
            setNewProperty({
              ...newProperty,
              type: selectedOption ? selectedOption.value : '',
            })
          }
          value={
            newProperty.type
              ? { value: newProperty.type, label: newProperty.type }
              : null
          }
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

        <Select
          isMulti
          options={[
            { value: 'Piscina', label: 'Piscina' },
            { value: 'Gimnasio', label: 'Gimnasio' },
          ]}
          placeholder="Selecciona Comodidades"
          onChange={(selectedOptions) =>
            setNewProperty({
              ...newProperty,
              amenities: selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [],
            })
          }
          value={newProperty.amenities.map((amenity) => ({
            value: amenity,
            label: amenity,
          }))}
        />

        <Select
          isMulti
          options={[
            { value: 'Agua', label: 'Agua' },
            { value: 'Luz', label: 'Luz' },
          ]}
          placeholder="Selecciona Servicios"
          onChange={(selectedOptions) =>
            setNewProperty({
              ...newProperty,
              services: selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [],
            })
          }
          value={newProperty.services.map((service) => ({
            value: service,
            label: service,
          }))}
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
