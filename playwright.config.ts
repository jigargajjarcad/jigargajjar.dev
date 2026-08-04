import { defineConfig, devices } from '@playwright/test';

/** ARCHITECTURE.md §10 — reference device profile is a mid-tier phone. */
export default defineConfig({
  testDir: './tests/quality',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  projects: [{ name: 'mobile', use: { ...devices['Pixel 5'] } }],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
