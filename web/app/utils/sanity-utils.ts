export function stripStega<T extends string | null | undefined>(s: T): T {
  return (s?.replace(/\p{Cf}/gu, '') ?? s) as T
}
