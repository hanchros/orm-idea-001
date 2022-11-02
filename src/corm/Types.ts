export type ObjectFromUnion<T extends string> = { [K in T]: any }
