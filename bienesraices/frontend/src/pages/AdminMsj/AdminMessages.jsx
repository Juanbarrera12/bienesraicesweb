import React, { useState, useEffect } from 'react';
import  Alert, { AlertDescription } from '../../components/ui/Alert';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact');
      if (!response.ok) {
        throw new Error('Error al cargar los mensajes');
      }
      const data = await response.json();
      setMessages(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar el mensaje');
        }

        // Actualizar la lista de mensajes
        fetchMessages();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div className="p-4">Cargando mensajes...</div>;
  }

  if (error) {
    return (
      <Alert className="m-4 bg-red-100">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mensajes de Contacto</h2>
      
      <div className="grid gap-4">
        {messages.length === 0 ? (
          <p>No hay mensajes para mostrar.</p>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{message.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                Email: {message.email}
              </p>
              
              <p className="mb-2">{message.message}</p>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Calificación:</span>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < message.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;