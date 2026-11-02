const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../../..');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};
http
  .createServer((request, response) => {
    try {
      const file = path.resolve(
        root,
        '.' +
          decodeURIComponent(new URL(request.url, 'http://localhost').pathname),
      );
      if (!file.startsWith(root + path.sep)) {
        response.writeHead(403);
        response.end();
        return;
      }
      response.setHeader(
        'Content-Type',
        mime[path.extname(file)] || 'application/octet-stream',
      );
      response.end(fs.readFileSync(file));
    } catch {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(5174, '127.0.0.1', () =>
    console.log('Prácticas estáticas en http://127.0.0.1:5174'),
  );
