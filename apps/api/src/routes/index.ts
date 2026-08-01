import { Hono } from 'hono';

import { characters } from './characters/index.ts';
import { users } from './users/index.ts';

export const routes = new Hono();

routes.route('/characters', characters);
routes.route('/users', users);
