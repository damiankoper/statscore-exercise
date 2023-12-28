export class NameUtils {
  static getVsName(participant1: string, participant2: string): string {
    return `${participant1} vs ${participant2}`;
  }
  static getDashName(participant1: string, participant2: string): string {
    return `${participant1} - ${participant2}`;
  }
}
