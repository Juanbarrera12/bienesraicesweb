import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio.jsx';
import Propiedades from './pages/Propiedades/index.jsx';
import Blog from './pages/Blog/index.jsx';
import SobreNosotros from './pages/SobreNosotros/index.jsx';
import AdministrarPropiedades from './pages/AdministrarPropiedades/index.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/propiedades" element={<Propiedades />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/admin/propiedades" element={<AdministrarPropiedades />} />
            </Routes>
        </Router>
    );
}

export default App;
