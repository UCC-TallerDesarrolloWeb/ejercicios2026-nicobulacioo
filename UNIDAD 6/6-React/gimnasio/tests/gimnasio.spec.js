import { test, expect } from '@playwright/test';

test('login inválido no concede inscripción y admin/admin redirige', async ({
  page,
}) => {
  const mensajes = [];
  page.on('console', (message) => mensajes.push(message.text()));
  await page.goto('/actividades');
  await expect(page.getByRole('button', { name: /Inscribirme/ })).toHaveCount(
    0,
  );
  await page.getByRole('link', { name: 'Login', exact: true }).click();
  await page.getByLabel('Usuario', { exact: true }).fill('admin');
  await page.getByLabel('Contraseña', { exact: true }).fill('incorrecta');
  await page.getByRole('button', { name: 'Ingresar', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText(
    'Usuario o contraseña incorrectos',
  );
  await expect(page).toHaveURL(/login$/);
  await page.getByLabel('Contraseña', { exact: true }).fill('admin');
  await page.getByRole('button', { name: 'Ingresar', exact: true }).click();
  await expect(page).toHaveURL(/actividades$/);
  await expect(page.getByRole('button', { name: /Inscribirme/ })).toHaveCount(
    4,
  );
  await page
    .getByRole('button', { name: 'Inscribirme a Yoga', exact: true })
    .click();
  await expect(page.getByRole('status')).toContainText('Yoga');
  await expect(
    page.getByRole('button', { name: 'Ya inscripto a Yoga' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: /Inscribirme/ })).toHaveCount(
    0,
  );
  expect(mensajes).toContain('Login Incorrecto');
  expect(mensajes).toContain('Login OK');
});

test('home muestra cuatro imágenes y conserva layout al navegar', async ({
  page,
}) => {
  const errores = [];
  page.on('pageerror', (error) => errores.push(error.message));
  await page.goto('/');
  await expect(page.locator('.card img')).toHaveCount(4);
  for (const image of await page.locator('.card img').all()) {
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(image).toHaveAttribute('alt', /.+/);
  }
  await page.goto('/Home');
  await expect(
    page.getByRole('heading', { name: 'Encontrá tu próxima actividad' }),
  ).toBeVisible();
  await page.goto('/ruta-inexistente');
  await expect(
    page.getByRole('heading', { name: 'Página no encontrada' }),
  ).toBeVisible();
  await expect(page.locator('header')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);
  expect(errores).toEqual([]);
});

test('la vista móvil permite navegar sin desbordar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const ruta of ['/', '/login', '/actividades']) {
    await page.goto(ruta);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByRole('link', { name: 'Home', exact: true }),
    ).toBeVisible();
  }
});
