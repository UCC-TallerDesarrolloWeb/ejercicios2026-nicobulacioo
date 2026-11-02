import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      console.log('Login OK');
      setError('');
      onLogin(username);
      navigate('/actividades');
    } else {
      console.log('Login Incorrecto');
      setError(
        'Usuario o contraseña incorrectos. Revisá los datos e intentá nuevamente.',
      );
    }
  };

  return (
    <section className="login" aria-labelledby="titulo-login">
      <h1 id="titulo-login">Ingresá al gimnasio</h1>
      <p>Iniciá sesión para inscribirte a las actividades.</p>
      <p className="ayuda">
        Usuario de práctica: <strong>admin</strong> · Contraseña:{' '}
        <strong>admin</strong>
      </p>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <button type="submit" className="boton">
          Ingresar
        </button>
      </form>
    </section>
  );
}
