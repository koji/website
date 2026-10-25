import type { CommandAction, CommandLog, YieldChunk } from 'hakoniwa-term';
import { personalProjects } from '../data/personalPrjData';
import { frontendTechStack, otherTechStack } from '../data/techStackData';
import { workProjects } from '../data/workPrjData';
import { TERMINAL_THEME_CHOICES, isTerminalThemeChoice } from './theme';
import type { TerminalThemeChoice } from './theme';

type WorkProject = (typeof workProjects)[number];
type PersonalProject = (typeof personalProjects)[number];

type TerminalContext = {
  navigate: (path: string) => void;
  setTheme: (theme: TerminalThemeChoice) => void;
};

type CommandHandler = (
  args: string[],
  ctx: TerminalContext
) => AsyncGenerator<YieldChunk, void, unknown>;

type CommandDefinition = {
  description: string;
  handler: CommandHandler;
};

const SECTIONS = {
  home: '/#home',
  about: '/#about',
  work: '/#work',
  personal: '/#personal',
  contact: '/#contact',
} as const;

type Section = keyof typeof SECTIONS;

const isSection = (value: string): value is Section =>
  Object.prototype.hasOwnProperty.call(SECTIONS, value);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const log = (type: CommandLog['type'], text: string): YieldChunk => ({
  type: 'log',
  log: { type, text },
});

const output = (text: string): YieldChunk => log('output', text);
const success = (text: string): YieldChunk => log('success', text);
const error = (text: string): YieldChunk => log('error', text);

const formatWorkProject = (project: WorkProject): string[] => [
  `${project.title} — ${project.company} (${project.period})`,
  project.description,
  `Technologies: ${project.technologies.join(', ')}`,
  ...project.highlights.map((highlight) => `• ${highlight}`),
  ...(project.link ? [`Link: ${project.link}`] : []),
];

const formatPersonalProject = (project: PersonalProject): string[] => [
  `${project.title} [${project.status}] (${project.category})`,
  project.description,
  `Technologies: ${project.technologies.join(', ')}`,
  ...(project.githubUrl ? [`GitHub: ${project.githubUrl}`] : []),
  ...(project.liveUrl ? [`Live: ${project.liveUrl}`] : []),
];

const COMMANDS = {
  help: {
    description: 'List available commands.',
    handler: async function* () {
      yield success('Available commands');
      for (const name of Object.keys(COMMANDS)) {
        yield output(`  ${name.padEnd(10)} ${COMMANDS[name as keyof typeof COMMANDS].description}`);
      }
      yield output(`  ${'clear'.padEnd(10)} Clear the terminal history. (built-in)`);
      yield output('');
      yield output('Aliases: しごと → work, ぷろじぇくと → projects, おしえて → help');
    },
  },
  about: {
    description: 'Print a short bio.',
    handler: async function* () {
      yield success('About Koji');
      yield output(
        'Koji is a developer, creator, and lifelong learner who builds meaningful digital experiences.'
      );
      yield output(
        'He works at Opentrons on desktop and touchscreen applications, and contributes to open source.'
      );
    },
  },
  work: {
    description: 'List work projects, or show one with "work <id>".',
    handler: async function* (args) {
      const id = args[1];
      if (id) {
        const project = workProjects.find((item) => String(item.id) === id);
        if (!project) {
          yield error(`Project not found: ${id}. Run "work" to list projects.`);
          return;
        }
        for (const line of formatWorkProject(project)) {
          yield output(line);
        }
        return;
      }

      yield success('Work experience');
      for (const project of workProjects) {
        yield output(`${project.id}. ${project.title} — ${project.company} (${project.period})`);
      }
      yield output('Run "work <id>" for details.');
    },
  },
  projects: {
    description: 'List personal projects, or show one with "projects <id>".',
    handler: async function* (args) {
      const id = args[1];
      if (id) {
        const project = personalProjects.find((item) => item.id === id);
        if (!project) {
          yield error(`Project not found: ${id}. Run "projects" to list projects.`);
          return;
        }
        for (const line of formatPersonalProject(project)) {
          yield output(line);
        }
        return;
      }

      yield success('Personal projects');
      for (const project of personalProjects) {
        yield output(`${project.id}. ${project.title} [${project.status}]`);
      }
      yield output('Run "projects <id>" for details.');
    },
  },
  stack: {
    description: 'Print the frontend and other tech stacks.',
    handler: async function* () {
      yield success('Frontend');
      yield output(frontendTechStack.join(', '));
      yield success('Other');
      yield output(otherTechStack.join(', '));
    },
  },
  contact: {
    description: 'Print contact links.',
    handler: async function* () {
      yield success('Contact');
      yield output('Email: baxin1919@gmail.com');
      yield output('GitHub: https://github.com/koji');
      yield output('Hugging Face: https://huggingface.co/baxin');
      yield output('Blog: https://baxin.pages.dev/');
    },
  },
  theme: {
    description: `Change the terminal theme: ${TERMINAL_THEME_CHOICES.join(', ')}.`,
    handler: async function* (args, ctx) {
      const choice = args[1]?.toLowerCase();
      if (!choice) {
        yield error(`Usage: theme <${TERMINAL_THEME_CHOICES.join('|')}>`);
        return;
      }
      if (!isTerminalThemeChoice(choice)) {
        yield error(`Unknown theme: "${choice}". Available: ${TERMINAL_THEME_CHOICES.join(', ')}.`);
        return;
      }
      ctx.setTheme(choice);
      yield success(`Theme changed to ${choice}.`);
    },
  },
  goto: {
    description: 'Open a portfolio section: home, about, work, personal, contact.',
    handler: async function* (args, ctx) {
      const section = args[1]?.toLowerCase();
      if (!section || !isSection(section)) {
        yield error(`Usage: goto <${Object.keys(SECTIONS).join('|')}>`);
        return;
      }
      yield success(`Opening the ${section} section...`);
      await delay(120);
      ctx.navigate(SECTIONS[section]);
    },
  },
  demo: {
    description: 'Stream a short demo of logs and progress.',
    handler: async function* () {
      yield output('Starting hakoniwa-term demo...');
      await delay(120);
      yield { type: 'progress', percent: 25, text: 'Mounting terminal' };
      await delay(120);
      yield output('Loading the command registry...');
      await delay(120);
      yield { type: 'progress', percent: 60, text: 'Running an async generator' };
      await delay(120);
      yield output('Streaming logs from the command...');
      await delay(120);
      yield { type: 'progress', percent: 100, text: 'Finishing up' };
      await delay(120);
      yield success('Demo complete. Type "help" to keep exploring.');
    },
  },
  whoami: {
    description: 'Print the current user.',
    handler: async function* () {
      yield output('koji');
    },
  },
  sudo: {
    description: 'Try to become root.',
    handler: async function* () {
      yield error('Nice try. koji is already the only user in this box garden.');
    },
  },
  pwd: {
    description: 'Print the current directory.',
    handler: async function* () {
      yield output('/home/koji/portfolio');
    },
  },
  ls: {
    description: 'List the portfolio sections.',
    handler: async function* () {
      yield output(Object.keys(SECTIONS).join('  '));
    },
  },
} satisfies Record<string, CommandDefinition>;

const ALIASES = {
  しごと: 'work',
  ぷろじぇくと: 'projects',
  おしえて: 'help',
} as const satisfies Record<string, keyof typeof COMMANDS>;

export const createCommands = (ctx: TerminalContext): Record<string, CommandAction> => {
  const commands: Record<string, CommandAction> = Object.create(null);

  for (const name of Object.keys(COMMANDS)) {
    const definition = COMMANDS[name as keyof typeof COMMANDS];
    commands[name] = (args) => definition.handler(args, ctx);
  }

  for (const [alias, target] of Object.entries(ALIASES)) {
    commands[alias] = commands[target];
  }

  return commands;
};
