/* @refresh reload */
import { render } from 'solid-js/web';

import { App } from './app.tsx';

import './index.css';

const root = document.getElementById('root');

if (root == null) throw new Error('Element with id `#root` is missing');

render(() => <App />, root);
