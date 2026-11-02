import spinning from '@/assets/home/spinning.svg';
import musculacion from '@/assets/home/musculacion.svg';

// public se referencia desde la raíz; assets se importa para que Vite lo procese.
export const actividades = [
  {
    id: 'yoga',
    titulo: 'Yoga',
    subtitulo: 'Movilidad y equilibrio',
    descripcion:
      'Respiración, estiramientos y posturas para moverte con más calma.',
    horario: 'Lunes y miércoles · 18:00',
    imagen: '/home/yoga.svg',
    alt: 'Persona sentada sobre una colchoneta practicando yoga',
  },
  {
    id: 'spinning',
    titulo: 'Spinning',
    subtitulo: 'Energía en movimiento',
    descripcion:
      'Una clase de bicicleta con cambios de ritmo, guiada por un instructor.',
    horario: 'Martes y jueves · 19:00',
    imagen: spinning,
    alt: 'Bicicleta fija para la actividad de spinning',
  },
  {
    id: 'funcional',
    titulo: 'Funcional',
    subtitulo: 'Fuerza para todos los días',
    descripcion:
      'Circuitos que combinan coordinación, resistencia y movimientos de todo el cuerpo.',
    horario: 'Lunes, miércoles y viernes · 17:00',
    imagen: '/home/funcional.svg',
    alt: 'Elementos de entrenamiento funcional sobre una colchoneta',
  },
  {
    id: 'musculacion',
    titulo: 'Musculación',
    subtitulo: 'Entrená a tu ritmo',
    descripcion:
      'Ejercicios de fuerza adaptados a tu nivel y acompañados por el equipo.',
    horario: 'Lunes a viernes · 08:00 a 21:00',
    imagen: musculacion,
    alt: 'Mancuerna y banco para ejercicios de musculación',
  },
];
