import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AuthForm from './components/AuthForm'; 
import ProyectoForm from './components/ProyectoForm';
import ProyectoList from './components/ProyectoList';
import TareaList from './components/TareaList';
import './App.css';

const App = () => {
  return (
      <Router>
          <div className="container">
              <h1>Mi Aplicación</h1>
              <nav>
                  <ul>
                      <li>
                          <Link to="/login">
                              <button>Iniciar Sesión</button>
                          </Link>
                      </li>
                      <li>
                          <Link to="/register">
                              <button>Registrar</button>
                          </Link>
                      </li>
                      <li>
                          <Link to="/proyectos">
                              <button>Ver Proyectos</button>
                          </Link>
                      </li>
                      <li>
                          <Link to="/proyectos/nuevo">
                              <button>Crear Proyecto</button>
                          </Link>
                      </li>
                  </ul>
              </nav>

              <Routes>
                  {}
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<AuthForm />} />
                  <Route path="/proyectos" element={<ProyectoList />} />
                  <Route path="/proyectos/nuevo" element={<ProyectoForm />} />
                  <Route path="/proyectos/:id/tareas" element={<TareaList />} />
                  <Route path="/proyectos/:id/editar" element={<ProyectoForm />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;