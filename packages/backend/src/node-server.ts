import { serve } from '@hono/node-server';
import app from './index.js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load variables from .dev.vars
const envPath = path.resolve(process.cwd(), '.dev.vars');
dotenv.config({ path: envPath });

// Pass env variables from Node's process.env to Hono Context
app.use('*', async (c, next) => {
  (c as any).env = {
    ...process.env,
    DB: {
        // Mock D1 for Local Node Server
        prepare: () => ({ bind: () => ({ first: async () => ({}), all: async () => ({ results: [] }), run: async () => ({}) }) }),
        batch: async () => []
    }
  };
  await next();
});

const port = 8787;
console.log(`🚀 Unbox Backend (Node Mode) running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
