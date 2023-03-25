import { defineConfig } from 'tsup';
import path from 'path';

const entry = path.join(__dirname, 'index.ts');

export default defineConfig({
  name: 'headless-stepper-components',
  entry: [entry],
  outDir: path.join(__dirname, 'dist'),
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['react'],
  clean: true,
  onSuccess: path.join(__dirname, 'scripts', 'post-build.sh'),
});
