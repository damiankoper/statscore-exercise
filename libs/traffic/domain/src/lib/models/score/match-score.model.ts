import { Score } from './score.model';

export class MatchScore {
  public constructor(
    public readonly main: Score | null,
    public readonly periods: Score[] = []
  ) {}

  public toCommaString(): string {
    return [this.main, ...this.periods].filter(Boolean).join(',');
  }

  public toVerboseString(): string {
    const sets: string[] = [];
    this.periods.forEach((period, i) => {
      sets.push(`set${i + 1} ${period.toString()}`);
    });
    const setsString = sets.length ? ` (${sets.join(', ')})` : '';
    return `Main score: ${this.main?.toString() || '---'}${setsString}`;
  }
}
