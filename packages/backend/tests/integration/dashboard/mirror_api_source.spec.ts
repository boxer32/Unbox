import { describe, it, expect } from 'vitest';
import fs from 'fs/promises';
import path from 'path';

describe('Mirror dashboard data source guard (TC-UX-001)', () => {
  it('should use API queries and not local mockData in mirror route', async () => {
    const mirrorRoutePath = path.resolve(
      process.cwd(),
      '../dashboard/src/routes/mirror.tsx',
    );
    const source = await fs.readFile(mirrorRoutePath, 'utf-8');

    expect(source.includes('/api/decisions')).toBe(true);
    expect(source.includes('/api/stats')).toBe(true);
    expect(source.includes('mockData')).toBe(false);
  });
});
