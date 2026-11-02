import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularArea, crearUsuario } from './ejemplo-doc.js';

test('calcula áreas y rechaza medidas no válidas', () => {
  assert.equal(calcularArea(4, 3), 12);
  assert.equal(calcularArea(0, 3), 0);
  assert.throws(() => calcularArea(-2, 3), RangeError);
  assert.throws(() => calcularArea('4', 3), TypeError);
});
test('crea un usuario con opciones y edad opcional', () => {
  assert.deepEqual(
    crearUsuario(' Nico ', undefined, { activo: true, rol: 'alumno' }),
    { nombre: 'Nico', edad: null, activo: true, rol: 'alumno' },
  );
  assert.throws(() => crearUsuario('   '), TypeError);
  assert.throws(() => crearUsuario('Nico', -1), RangeError);
});
