export type Index<
  SizeT extends number,
  Result extends number[] = []
> = Result['length'] extends SizeT
  ? Result[number]
  : Index<SizeT, [...Result, Result['length']]>;
