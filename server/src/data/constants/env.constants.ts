function throwErr(msg: string): never {
  throw new Error(msg);
}

type NodeEnv = "testing" | "production";

function getNodeEnv(): NodeEnv {
  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV || (NODE_ENV !== "testing" && NODE_ENV !== "production"))
    throwErr("Node environment not configured");

  return NODE_ENV as NodeEnv;
}

export function getCorsWhitelist(): string[] {
  const NODE_ENV = getNodeEnv();

  const isTesting = NODE_ENV === "testing";
  const isProduction = NODE_ENV === "production";

  const rawList = isTesting
    ? process.env.CORS_WHITELIST_DEFAULT
    : process.env.CORS_WHITELIST;

  if (!rawList) throwErr("CORS whitelist is not configured for: " + NODE_ENV);

  const whiteList = rawList
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .concat();

  return whiteList;
}

type EnvVars = Record<string, string | undefined>;

function assertDefined(envVars: EnvVars, context: string) {
  Object.entries(envVars).forEach(([key, value]) => {
    if (value === undefined)
      throwErr(`${context} undefined in env for ${key}.`);
  });
}

export function getTursoEnv() {
  const tursoEnv = {
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  };

  assertDefined(tursoEnv, "Turso config");

  return tursoEnv;
}

export function getRedisEnv() {
  const redisEnv = {
    REDIS_DATABASE_URL: process.env.REDIS_DATABASE_URL,
    REDIS_DATABASE_ENDPOINT: process.env.REDIS_DATABASE_ENDPOINT,
    REDIS_AUTH_TOKEN: process.env.REDIS_AUTH_TOKEN,
  };

  assertDefined(redisEnv, "Redis config");

  return redisEnv;
}

export function getCachePaths() {
  const cachePaths = {
    PROJECT_CACHE_PATH: process.env.PROJECT_CACHE_PATH,
    DEFAULT_CACHE_PATH: process.env.DEFAULT_CACHE_PATH,
    TAGS_CACHE_PATH: process.env.TAGS_CACHE_PATH,
  };

  assertDefined(cachePaths, "Cache path");

  return cachePaths;
}

export function getTokenSecrets() {
  const tokenSecrets = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  };

  assertDefined(tokenSecrets, "Token secret");

  return tokenSecrets;
}
