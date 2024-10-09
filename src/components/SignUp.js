import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; // Archivo de estilos

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registeredUsers = [
    { name: 'admin', email: 'admin@example.com' },
    { name: 'user1', email: 'user1@example.com' },
  ];

  // Función para verificar si el usuario o el correo ya están registrados
  const validateUser = () => {
    const userExists = registeredUsers.some((user) => user.name === name);
    const emailExists = registeredUsers.some((user) => user.email === email);

    if (userExists) {
      setError('El nombre de usuario ya está registrado.');
      return false;
    }
    if (emailExists) {
      setError('El correo electrónico ya está registrado.');
      return false;
    }

    return true;
  };

  // Función para simular el envío de token al correo
  const sendToken = () => {
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // Token aleatorio de 6 dígitos
    console.log(`Token enviado al correo ${email}: ${token}`);
    localStorage.setItem('token', token); // Almacenamos el token localmente
    navigate(`/verify-token?email=${email}`);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validamos si el usuario y el correo ya están registrados
    if (validateUser()) {
      // Si las validaciones pasan, simulamos el envío de un token
      sendToken();
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(''); // Limpiar el error después de 3 segundos
      }, 3000); // 3000 milisegundos = 3 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta o el error cambia
    }
  }, [error]);

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Crear Cuenta</h2>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Usuario"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Correo"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="sign-up-btn">Registrar</button>
        </form>
        <p className="signin-link">
          ¿Ya tienes una cuenta? <span onClick={() => navigate('/')}>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  );
};


export default SignUp;
