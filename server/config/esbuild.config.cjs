const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: [
      "src/models/index.ts",
      "src/index.ts",
      "scripts/cache-loader.ts",
      "scripts/seeder.ts",
    ],
    bundle: true,
    platform: "node",
    target: "node18",
    outdir: "dist",
    format: "cjs",
    sourcemap: true,
    alias: {
      "@": "./src",
      "@controllers": "./src/controllers",
      "@data": "./src/data",
      "@feature-auth": "./src/features/auth",
      "@feature-projects": "./src/features/projects",
      "@middleware": "./src/middleware",
      "@models": "./src/models",
      "@redis": "./src/redis",
      "@routers": "./src/routers",
      "@services": "./src/services",
      "@utils": "./src/utils",
      "@viewmodels": "./src/viewmodels",
    },
    external: ["better-sqlite3"],
  })
  .catch(() => process.exit(1));
