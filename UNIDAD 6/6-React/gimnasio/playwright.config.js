import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:5173', channel: 'chrome', headless: true },
  webServer: [
    {
      command:
        'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: false,
    },
    {
      command: 'node tests/servidor-estaticos.cjs',
      url: 'http://127.0.0.1:5174/UNIDAD%205/4-Bootstrap/index.html',
      reuseExistingServer: false,
    },
  ],
});
