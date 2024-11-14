import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio.jsx';
import Propiedades from './pages/Propiedades/index.jsx';
import Blog from './pages/Blog/index.jsx';
import SobreNosotros from './pages/SobreNosotros/index.jsx';
import AdministrarPropiedades from './pages/AdministrarPropiedades/index.jsx';
import ContactForm from './pages/contact/ContactForm.jsx';
import AdminMsj from './pages/AdminMsj/AdminMessages.jsx';

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/propiedades" element={<Propiedades />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/SobreNosotros" element={<SobreNosotros />} />
                <Route path="/admin/propiedades" element={<AdministrarPropiedades />} />
                <Route path="/contact" element={<ContactForm />} /> {/* Agregar la ruta para Contacto */}
                <Route path="/mensajes" element={<AdminMsj />} />
            </Routes>
        </Router>
    );
}

export default App;
