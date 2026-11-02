import { NavLink } from 'react-router-dom';

export default function Header({ usuario, onLogout }) {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera-interior">
        <NavLink className="marca" to="/">
          Pulso Gym
        </NavLink>
        <nav aria-label="Principal">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/actividades">Actividades</NavLink>
        </nav>
        {usuario && (
          <div className="sesion">
            <span>Hola, {usuario}</span>
            <button
              type="button"
              className="boton secundario"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
