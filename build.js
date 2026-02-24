const esbuild = require('esbuild');

const watch = process.argv[2] === '--watch';

const ctx = esbuild.buildSync({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: !watch,
  sourcemap: watch,
  target: 'es2020',
  logLevel: 'info',
});

if (watch) {
  esbuild.context({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    sourcemap: true,
    target: 'es2020',
    logLevel: 'info',
  }).then(ctx => ctx.watch());
}
