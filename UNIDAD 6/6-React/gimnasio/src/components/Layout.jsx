import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ usuario, onLogout }) {
  return (
    <>
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Header usuario={usuario} onLogout={onLogout} />
      <main id="contenido" className="contenedor">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
