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
  external: ['react', 'react-dom'],
  clean: true,
  tsconfig: path.join(__dirname, '../tsconfig.lib.json'),
  // onSuccess: path.join(__dirname, 'scripts', 'post-build.sh'),
});
