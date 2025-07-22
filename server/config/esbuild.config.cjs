const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/models/index.ts', 'src/index.ts', 'scripts/cacheLoader.ts', 'scripts/seeder.ts'],
    bundle:true,
    platform: 'node',
    target: 'node18',
    outdir: 'dist',
    format: 'cjs',
    sourcemap: true,
    alias: {
        '@': './src',
        '@data': './src/data',
        '@middleware': './src/middleware',
        '@models': './src/models',
        '@redis': './src/redis',
        '@routes': './src/routes',
        '@services': './src/services',
        '@utils': './src/utils',
        '@viewmodels': './src/viewmodels'
    },
    external: ['better-sqlite3']
}).catch(() => process.exit(1));