import { Link } from 'react-router-dom';
export default function NoEncontrada() {
  return (
    <section className="introduccion">
      <h1>Página no encontrada</h1>
      <p>Podés volver al inicio para consultar las actividades.</p>
      <Link className="boton" to="/">
        Volver a Home
      </Link>
    </section>
  );
}
