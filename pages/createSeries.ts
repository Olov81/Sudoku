


export function createSeries<T>(
  length: number,
  create: (index: number) => T
): T[] {
  return Array.from({ length }, (_, index) => create(index));
}