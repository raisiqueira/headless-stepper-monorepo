import { defineConfig } from 'tsup';
import path from 'path';

const p = path.join(__dirname);

export default defineConfig({
  name: 'headless-stepper',
  entry: {
    index: `${p}/src/index.ts`,
    components: `${p}/src/lib/components/index.ts`,
  },
  outDir: path.join(__dirname, 'dist'),
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['react', 'react-dom'],
  clean: true,
});
