import { test, expect } from '@playwright/test';
const sitio = 'http://127.0.0.1:5174/';
const bootstrap = sitio + 'UNIDAD%205/4-Bootstrap/';
test('Bootstrap: galería de una y tres columnas, imágenes completas', async ({
  page,
}) => {
  for (const width of [390, 900]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(bootstrap + 'ej_instagram.html');
    const images = page.locator('.galeria img');
    await expect(images).toHaveCount(9);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img) => img.naturalWidth))
        .toBeGreaterThan(0);
    }
    const rects = await images.evaluateAll((imgs) => {
      const primeras = imgs.slice(0, 3);
      return primeras.map((img) => ({
        x: img.getBoundingClientRect().x,
        y: img.getBoundingClientRect().y,
      }));
    });
    expect(rects[0].x === rects[1].x).toBe(width === 390);
    expect(rects[0].y === rects[1].y).toBe(width === 900);
  }
});
test('Bootstrap: vuelos valida origen y selecciona una opción de ida', async ({
  page,
}) => {
  await page.goto(bootstrap + 'ej_vuelos.html');
  await page.getByLabel('Solo ida').check();
  await page
    .getByLabel('Fecha de salida', { exact: true })
    .fill(String(new Date().getFullYear() + 1) + '-01-10');
  await expect(page.getByLabel('Fecha de regreso')).toBeDisabled();
  await page.getByLabel('Destino', { exact: true }).selectOption('Córdoba');
  await page.getByRole('button', { name: 'Buscar vuelos' }).click();
  await expect(page.getByRole('alert')).toContainText('diferente');
  await page.getByLabel('Destino', { exact: true }).selectOption('Mendoza');
  await page.getByRole('button', { name: 'Buscar vuelos' }).click();
  await page.getByRole('button', { name: 'Seleccionar opción 1' }).click();
  await expect(page.getByRole('status')).toContainText('opción 1');
});
test('el tutorial HTML enlaza a la práctica de accesibilidad de clase', async ({
  page,
}) => {
  await page.goto(bootstrap + 'ej_youtube.html');
  await expect(page.locator('.video-link').first()).toHaveAttribute(
    'href',
    'https://www.youtube.com/watch?v=ZdyJMznlgJ8',
  );
});

test('Bootstrap: filtros de videos y estados vacíos', async ({ page }) => {
  await page.goto(bootstrap + 'ej_youtube.html');
  await page.getByRole('button', { name: 'CSS', exact: true }).click();
  await expect(page.locator('[data-video]:visible')).toHaveCount(2);
  await page.getByRole('searchbox').fill('inexistente');
  await expect(page.getByRole('status')).toContainText('No hay videos');
});
test('Sass: interiores adapta la rejilla al ancho móvil', async ({
  page,
}, testInfo) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(sitio + 'UNIDAD%205/5-SASS/interiores/index.html');
    const figures = page.locator('.ambientes figure');
    const rects = await figures.evaluateAll((items) =>
      items.map((e) => ({
        x: e.getBoundingClientRect().x,
        y: e.getBoundingClientRect().y,
      })),
    );
    expect(rects[0].x === rects[1].x).toBe(width === 390);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath('interiores-' + width + '.png'),
      fullPage: true,
    });
  }
});
test('HTML/CSS: las columnas comparten fila y el formulario no desborda', async ({
  page,
}) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(sitio + 'UNIDAD%202/2-CSS/ej_columnas.html');
    const tops = await page
      .locator('.columnas-css2 > div')
      .evaluateAll((items) => items.map((e) => e.getBoundingClientRect().top));
    expect(tops[0]).toBe(tops[1]);
    for (const file of ['ej_formulario.html', 'ej_animales.html']) {
      await page.goto(sitio + 'UNIDAD%202/1-HTML/' + file);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});
test('Bootstrap: todas las páginas caben en móvil y escritorio', async ({
  page,
}, testInfo) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const file of [
      'index',
      'ej_instagram',
      'ej_vuelos',
      'ej_timeline',
      'ej_perfil',
      'ej_youtube',
    ]) {
      await page.goto(bootstrap + file + '.html');
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        file,
      ).toBe(true);
      await expect(page.locator('h1')).toHaveCount(1);
      if (width === 1280)
        await page.screenshot({
          path: testInfo.outputPath(file + '.png'),
          fullPage: true,
        });
    }
  }
});
