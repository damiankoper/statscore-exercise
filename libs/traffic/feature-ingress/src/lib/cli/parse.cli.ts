import { readFile } from 'fs/promises';
import { Command, CommandRunner, Option } from 'nest-commander';
import { IngressService } from '../services/ingress.service';

interface ParseCommandOptions {
  input: string;
}

@Command({ name: 'parse', options: { isDefault: true } })
export class ParseCommand extends CommandRunner {
  constructor(private readonly ingressService: IngressService) {
    super();
  }

  async run(
    passedParams: string[],
    options: ParseCommandOptions
  ): Promise<void> {
    try {
      const input = await readFile(options.input, 'utf-8');
      const parsedInput = JSON.parse(input) as object[];
      const summaries = this.ingressService.parseSafeMany(parsedInput);
      const summariesString = JSON.stringify(summaries, null, 2);
      console.log(summariesString);
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      console.error(e);
    }
  }

  @Option({
    flags: '-i, --input <json_file>',
    description: 'Path to JSON input file',
    required: true,
  })
  parseInput(val: string) {
    return val;
  }
}
