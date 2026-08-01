import preact from '@preact/preset-vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [preact()],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
	test: {
		browser: {
			enabled: true,
			headless: true,
			instances: [{ browser: 'chromium' }],
			provider: playwright(),
		},
	},
});
