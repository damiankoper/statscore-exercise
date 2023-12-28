export class InvalidEventInputException extends Error {
  constructor(public readonly input: unknown) {
    super(`Invalid event input: ${JSON.stringify(input)}`);
  }
}
