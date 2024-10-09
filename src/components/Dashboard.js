// Dashboard.js
import React, { useState } from 'react';
import '../styles/Dashboard.css'; // Archivo de estilos para el Dashboard
import { FaUser, FaUserCircle, FaSignOutAlt, FaBell,FaBars ,FaTimes} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado del menú lateral (abierto/cerrado)
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes añadir la lógica de cerrar sesión
    console.log('Logout');
    navigate('/'); // Redirigir a la pantalla de login
  };

	const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Cambiar el estado del menú lateral
  };
  return (
    <div className="dashboard-container">
      {/* Barra superior */}
      <div className="top-bar">
				<FaBars className="icon menu-toggle" onClick={toggleSidebar} title="Menú" />
        <FaBell className="icon" title="Notificaciones" />
        <FaSignOutAlt className="icon" onClick={handleLogout} title="Salir" />
      </div>

      {/* Menú lateral izquierdo */}
      <div className={`sidebar-left ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="close-sidebar" onClick={toggleSidebar}>
          <FaTimes className="icon" />
        </div>
        <div className="menu-item">
          <FaUser className="icon" />
          <span>Gestión Usuario</span>
        </div>
        <div className="menu-item">
          <FaUserCircle className="icon" />
          <span>Gestión Perfil</span>
        </div>
      </div>


      {/* Contenido principal */}
      <div className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Selecciona una opción del menú lateral para empezar.</p>
      </div>
    </div>
  );
};


export default Dashboard;
