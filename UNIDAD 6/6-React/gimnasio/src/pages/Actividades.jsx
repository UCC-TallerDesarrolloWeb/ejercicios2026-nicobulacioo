import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import { actividades } from '@/data/actividades';

export default function Actividades({ usuario }) {
  const [inscripciones, setInscripciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const inscribir = (actividad) => {
    setInscripciones((actuales) =>
      actuales.includes(actividad.id) ? actuales : [...actuales, actividad.id],
    );
    setMensaje(
      'Te inscribiste a ' + actividad.titulo + '. ' + actividad.horario + '.',
    );
  };

  return (
    <>
      <section className="introduccion">
        <h1>Actividades y horarios</h1>
        <p>Elegí una clase y encontrá un lugar en tu semana.</p>
        {!usuario && (
          <p>
            <Link to="/login">Iniciá sesión</Link> para inscribirte.
          </p>
        )}
      </section>
      <p role="status" className={mensaje ? 'confirmacion' : ''}>
        {mensaje}
      </p>
      <section className="grilla" aria-label="Inscripción a actividades">
        {actividades.map((actividad) => {
          const inscripto = inscripciones.includes(actividad.id);
          return (
            <Card
              key={actividad.id}
              titulo={actividad.titulo}
              subtitulo={actividad.subtitulo}
              imagen={actividad.imagen}
              alt={actividad.alt}
            >
              <p>{actividad.descripcion}</p>
              <p className="horario">{actividad.horario}</p>
              {usuario && (
                <button
                  type="button"
                  className="boton"
                  disabled={inscripto}
                  aria-label={
                    (inscripto ? 'Ya inscripto a ' : 'Inscribirme a ') +
                    actividad.titulo
                  }
                  onClick={() => inscribir(actividad)}
                >
                  {inscripto ? 'Ya inscripto' : 'Inscribirme'}
                </button>
              )}
            </Card>
          );
        })}
      </section>
    </>
  );
}
