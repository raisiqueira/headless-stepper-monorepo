import { defineConfig } from 'tsup';
import path from 'path';

const p = path.join(__dirname, 'src');

export default defineConfig({
  entry: [`${p}/index.ts`],
  outDir: path.join(__dirname, 'dist'),
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  treeshake: true,
  clean: true,
});
