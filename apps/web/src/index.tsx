import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app.tsx';
import { ErrorBoundary } from './components/errors/index.ts';

import './index.css';

const root = document.getElementById('root');

if (root == null) throw new Error('Element with id `#root` is missing');

createRoot(root).render(
	<StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</StrictMode>,
);
