export const AUTH_REGEX = {
  // * follows zod default regex.
  EMAIL:
    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
  USERNAME: /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  STUDENT_NAME: /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,9}$/,
  STUDENT_NUMBER: /^[0-9]{3}-[0-9]{4}$/,
} as const;
