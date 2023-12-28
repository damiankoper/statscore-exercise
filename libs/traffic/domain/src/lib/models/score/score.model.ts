export class Score {
  public constructor(public readonly p1: number, public readonly p2: number) {}

  public toString(): string {
    return `${this.p1}:${this.p2}`;
  }
}
