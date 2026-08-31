import fs from 'node:fs';
import path from 'node:path';

export function getScaffoldPath(sub: string = 'knowledge'): string {
  const possible = [
    path.resolve(process.cwd(), 'scaffold', sub),
    path.resolve(process.cwd(), '../../scaffold', sub),
    path.resolve(__dirname, '../../../scaffold', sub),
  ];
  for (const p of possible) {
    if (fs.existsSync(p)) return p;
  }
  return path.resolve(process.cwd(), 'scaffold', sub);
}
