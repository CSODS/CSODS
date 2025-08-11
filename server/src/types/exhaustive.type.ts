//  type guarding for string literal union like ErrorName | AnotherErrorName
export type Exhaustive<T extends string> = { [K in T]: number };
