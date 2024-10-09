import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css'; // Archivo de estilos

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const validUser = "testuser"; // Usuario válido para la simulación
    const validPassword = "password123"; // Contraseña válida para la simulación

    if (name === validUser && password === validPassword) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos.');
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
    <div className="signin-container">
      <div className="signin-form-container">
        <h2>Iniciar Sesión</h2>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <form onSubmit={handleSignIn}>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className="sign-in-btn">Iniciar Sesión</button>
        </form>
        <p className="signup-link">
          ¿No tienes una cuenta? <span onClick={() => navigate('/signup')}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
