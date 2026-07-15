import { Hono } from 'hono';

import { characters } from './characters/index.ts';
import { users } from './users/index.ts';

export const apiV1 = new Hono();

apiV1.route('/characters', characters);
apiV1.route('/users', users);
