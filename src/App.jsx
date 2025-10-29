import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Proyectos from './pages/Proyectos';
import CV from './pages/CV';
import Contacto from './pages/Contacto';
import AdminCV from "./pages/AdminCV";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<AdminCV />} />
      </Routes>
    </Router>
  );
}

export default App;

