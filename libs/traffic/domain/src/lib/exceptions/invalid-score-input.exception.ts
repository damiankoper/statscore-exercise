export class InvalidScoreInputException extends Error {
  constructor(public readonly input: unknown) {
    super(`Invalid score input: ${JSON.stringify(input)}`);
  }
}
