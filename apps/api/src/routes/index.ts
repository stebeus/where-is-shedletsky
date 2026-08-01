import { Hono } from 'hono';

import { characters } from './characters/index.ts';

export const routes = new Hono();

routes.route('/characters', characters);
