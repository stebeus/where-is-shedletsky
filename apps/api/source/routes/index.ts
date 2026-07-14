import { Hono } from 'hono';

import { characters } from './characters/index.ts';

export const apiV1 = new Hono();

apiV1.route('/characters', characters);
