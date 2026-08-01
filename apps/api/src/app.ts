import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { env } from './env.ts';
import { routes } from './routes/index.ts';

export const app = new Hono();

app.use(logger());

app.use(cors({ origin: env.CLIENT_URL }));

app.route('/api/v1', routes);
