// Repite la práctica de Git en una carpeta temporal, sin tocar este repositorio.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');

const carpeta = fs.mkdtempSync(path.join(os.tmpdir(), 'ucc-practica-git-'));
const git = (...args) => execFileSync('git', args, {
  cwd: carpeta, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}).trim();
const escribir = (texto) => fs.writeFileSync(path.join(carpeta, 'practica.txt'), texto);
git('init', '-b', 'main');
git('config', 'user.name', 'Practica de Git');
git('config', 'user.email', 'practica@example.test');
escribir('Versión inicial\n');
git('add', 'practica.txt');
git('commit', '-m', 'chore: iniciar repositorio de practica');
const inicial = git('rev-parse', 'HEAD');

escribir('Cambio para practicar staging\n');
git('add', 'practica.txt');
assert.match(git('diff', '--cached', '--name-only'), /practica.txt/);
git('reset', 'HEAD', '--', 'practica.txt');
assert.equal(git('diff', '--cached', '--name-only'), '');
git('stash', 'push', '-m', 'Guardar cambios de practica');
assert.equal(git('status', '--porcelain'), '');
git('stash', 'apply');
assert.match(fs.readFileSync(path.join(carpeta, 'practica.txt'), 'utf8'), /Cambio/);
git('add', 'practica.txt');
git('commit', '-m', 'feat: guardar cambio recuperado');
git('checkout', inicial);
assert.match(fs.readFileSync(path.join(carpeta, 'practica.txt'), 'utf8'), /Versión inicial/);
git('checkout', 'main');
git('reset', '--soft', 'HEAD~1');
assert.match(git('diff', '--cached', '--name-only'), /practica.txt/);
git('commit', '-m', 'feat: recuperar commit de practica');
git('commit', '--amend', '-m', 'feat: aclarar mensaje del ejercicio');
assert.equal(git('log', '-1', '--format=%s'), 'feat: aclarar mensaje del ejercicio');
git('switch', '-c', 'develop');
fs.writeFileSync(path.join(carpeta, 'rama.txt'), 'Práctica de ramas\n');
git('add', 'rama.txt');
git('commit', '-m', 'feat: practicar rama develop');
git('switch', 'main');
git('merge', '--no-ff', 'develop', '-m', 'chore: integrar rama de practica');
git('branch', '-d', 'develop');
assert.equal(git('status', '--porcelain'), '');
console.log('OK: add, reset de staging, stash/apply, checkout, reset --soft, amend, ramas y merge.');
console.log('Repositorio temporal conservado en: ' + carpeta);
console.log(git('log', '--oneline', '-4'));

