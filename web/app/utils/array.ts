export function splitInHalf<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
}

export function distributeIntoColumns<T>(items: T[], count: number): T[][] {
  const cols: T[][] = Array.from({ length: count }, () => [])
  items.forEach((item, i) => cols[i % count]!.push(item))
  return cols
}
