import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import { actividades } from '@/data/actividades';

export default function Home() {
  return (
    <>
      <section className="introduccion">
        <h1>Encontrá tu próxima actividad</h1>
        <p>
          Una clase para ganar fuerza, otra para soltar el día. Elegí cómo
          querés moverte.
        </p>
        <Link className="boton" to="/actividades">
          Ver actividades y horarios
        </Link>
      </section>
      <section className="grilla" aria-label="Actividades del gimnasio">
        {actividades.map((actividad) => (
          <Card
            key={actividad.id}
            titulo={actividad.titulo}
            subtitulo={actividad.subtitulo}
            imagen={actividad.imagen}
            alt={actividad.alt}
          >
            <p>{actividad.descripcion}</p>
          </Card>
        ))}
      </section>
    </>
  );
}
