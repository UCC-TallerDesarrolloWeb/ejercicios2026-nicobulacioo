// children permite variar el contenido sin duplicar la estructura de la tarjeta.
export default function Card({ titulo, subtitulo, imagen, alt, children }) {
  return (
    <article className="card">
      <img src={imagen} alt={alt} width="640" height="400" />
      <div className="card-contenido">
        <h2>{titulo}</h2>
        <p className="subtitulo">{subtitulo}</p>
        {children}
      </div>
    </article>
  );
}
