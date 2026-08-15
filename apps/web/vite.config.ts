import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [babel({ presets: [reactCompilerPreset()] }), react(), tailwindcss()],
	preview: {
		port: 8080,
	},
	server: {
		port: 4000,
	},
});
