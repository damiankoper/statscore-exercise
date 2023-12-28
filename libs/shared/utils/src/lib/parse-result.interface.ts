export type ParseResult<TOutput> =
  | { success: true; data: TOutput }
  | { success: false; errors: Error[] };
