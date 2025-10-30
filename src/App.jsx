import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Proyectos from './pages/Proyectos';
import CV from './pages/CV';
import Contacto from './pages/Contacto';
import AdminCV from "./pages/AdminCV";
import Login from './pages/Login'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import Parallax3D from './components/Parallax3D'; 
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  return (
    <Router>
      <Parallax3D />
      <BackgroundEffects />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminCV />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

