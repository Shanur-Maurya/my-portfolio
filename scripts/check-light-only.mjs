// Fails the build if any dark-mode branching sneaks in, or the light-only meta is removed.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const bad = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(css|js|html)$/.test(f) && /prefers-color-scheme/.test(readFileSync(p, 'utf8'))) bad.push(p);
  }
};
walk('src');
if (!/content="only light"/.test(readFileSync('index.html', 'utf8'))) bad.push('index.html: color-scheme meta missing');
if (bad.length) { console.error('Light-only check failed:\n' + bad.join('\n')); process.exit(1); }
console.log('Light-only check passed');
