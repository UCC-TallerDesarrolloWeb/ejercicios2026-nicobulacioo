/**
 * Funciones de ejemplo para practicar documentación con JSDoc.
 * @module ejemplo-doc
 */

/**
 * Calcula el área de un rectángulo con medidas no negativas.
 * @param {number} ancho - Ancho del rectángulo.
 * @param {number} alto - Alto del rectángulo.
 * @returns {number} Área en unidades cuadradas.
 * @throws {TypeError} Si las medidas no son números finitos.
 * @throws {RangeError} Si alguna medida es negativa.
 */
export const calcularArea = (ancho, alto) => {
  if (!Number.isFinite(ancho) || !Number.isFinite(alto)) {
    throw new TypeError('Las medidas deben ser números finitos.');
  }
  if (ancho < 0 || alto < 0) {
    throw new RangeError('Las medidas no pueden ser negativas.');
  }
  return ancho * alto;
};

/**
 * Crea los datos de un usuario de ejemplo.
 * @param {string} nombre - Nombre no vacío.
 * @param {number} [edad] - Edad entera no negativa.
 * @param {object} [opciones] - Opciones adicionales.
 * @param {boolean} [opciones.activo=false] - Estado del usuario.
 * @param {string} [opciones.rol='alumno'] - Rol del usuario.
 * @returns {{nombre: string, edad: number|null, activo: boolean, rol: string}} Usuario creado.
 * @throws {TypeError} Si el nombre está vacío.
 * @throws {RangeError} Si la edad no es válida.
 */
export const crearUsuario = (nombre, edad, opciones = {}) => {
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    throw new TypeError('El nombre es obligatorio.');
  }
  if (edad !== undefined && (!Number.isInteger(edad) || edad < 0)) {
    throw new RangeError('La edad debe ser un entero no negativo.');
  }
  return {
    nombre: nombre.trim(),
    edad: edad ?? null,
    activo: opciones.activo ?? false,
    rol: opciones.rol ?? 'alumno',
  };
};
