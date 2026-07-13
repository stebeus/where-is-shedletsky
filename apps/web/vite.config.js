import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solid()],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
});
