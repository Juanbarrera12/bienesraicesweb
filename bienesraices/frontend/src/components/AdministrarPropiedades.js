import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdministrarPropiedades() {
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        obtenerPropiedades();
    }, []);

    const obtenerPropiedades = async () => {
        try {
            const respuesta = await axios.get('http://localhost:5000/api/propiedades');
            setPropiedades(respuesta.data);
        } catch (error) {
            console.error('Error obteniendo propiedades:', error);
        }
    };

    return (
        <div>
            <h1>Administración de Propiedades</h1>
            <ul>
                {propiedades.map((prop) => (
                    <li key={prop._id}>
                        {prop.titulo} - {prop.precio} USD
                        {/* Aquí puedes agregar botones de editar y eliminar */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdministrarPropiedades;
