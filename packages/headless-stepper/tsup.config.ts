import { defineConfig } from 'tsup';
import path from 'path';

const p = path.join(__dirname, 'src');

export default defineConfig({
  name: 'headless-stepper',
  entry: [`${p}/index.ts`],
  outDir: path.join(__dirname, 'dist'),
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['react', 'react-dom'],
  clean: true,
});
