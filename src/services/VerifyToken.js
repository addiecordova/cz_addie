import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/VerifyToken.css'; // Archivo de estilos
import { validateToken } from '../utils/validation';

const VerifyToken = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [timer, setTimer] = useState(120); // 120 seconds or 2 minutes
  const [tokenValid, setTokenValid] = useState(true); // Flag to track if token is still valid
  const [resendEnabled, setResendEnabled] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!tokenValid) {
      setError('El código ha expirado. Reenvíe un nuevo código.');
      return;
    }

    // Usar la función de validación importada para verificar el token
    if (!validateToken(token)) {
      setError('El código debe ser de 6 caracteres y solo contener letras y números.');
      return;
    }
    // Validar el token (puedes realizar una solicitud a tu backend aquí)
    if (token === '123456') { // Simulación de validación
      navigate('/dashboard'); // Redirigir a la pantalla principal si es válido
    } else {
      setError('El código es incorrecto. Inténtalo de nuevo.');
    }
  };

  const handleResendToken = () => {
    // Aquí deberías implementar la lógica para reenviar el token por correo
    console.log('Resend token...');
    setTimer(120); // Restablece el temporizador a 2 minutos
    setTokenValid(true); // Reactiva la validez del token
    setError(''); // Limpia los errores previos
    setResendEnabled(false); // Deshabilita la opción de reenviar hasta que el tiempo expire nuevamente
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTokenValid(false); // Token has expired after 2 minutes
      setResendEnabled(true); // Allow user to resend the token
    }
  }, [timer]);

  // Manejar la desaparición automática del mensaje de error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 5000); // El mensaje desaparece después de 5 segundos
      return () => clearTimeout(timeout); // Limpiar el timeout si el componente se desmonta
    }
  }, [error]);

  const handleTokenInputChange = (e) => {
    const value = e.target.value;

    // Solo permitir letras y números, y limitar la longitud a 6 caracteres
    if (validateToken(value) || value.length <= 6) {
      setToken(value);
    }
  };
  return (
    <div className="verify-token-container">
      <div className="verify-token-form">
        <h2>Verifica tu Cuenta</h2>
        <p>Ingresa el token que fue enviado a tu correo: <strong>{email}</strong></p>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}        
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Ingresa tu token"
            value={token}
            onChange={handleTokenInputChange}
            required
            disabled={!tokenValid} // Deshabilitar si el token ha expirado
            maxLength={6} // Limita la entrada a 6 caracteres
          />
          {tokenValid ? (
          <p>Tiempo restante: {`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}</p>
          ) : (
          <p>El tiempo ha expirado. <button onClick={handleResendToken} disabled={!resendEnabled} className="resend-btn">Reenviar Código</button></p>
          )}
          <button type="submit" className="verify-btn">Verificar</button>
          
        </form>
        <p className="resend-token">
          ¿No recibiste el token? <span onClick={handleResendToken}>Reenviar código</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyToken;
