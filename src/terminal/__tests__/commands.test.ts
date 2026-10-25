import type { YieldChunk } from 'hakoniwa-term';
import { describe, expect, it, vi } from 'vitest';
import { createCommands } from '../commands';

const createContext = () => ({
  navigate: vi.fn(),
  setTheme: vi.fn(),
});

const setup = () => {
  const context = createContext();
  return { context, commands: createCommands(context) };
};

const drain = async (generator: AsyncGenerator<YieldChunk, void, unknown>): Promise<string> => {
  const text: string[] = [];
  for await (const chunk of generator) {
    if (chunk.type === 'log') {
      text.push(chunk.log.text);
    }
  }
  return text.join('\n');
};

const run = (commands: ReturnType<typeof createCommands>, input: string): Promise<string> => {
  const [name, ...args] = input.split(' ');
  return drain(commands[name]([name, ...args]));
};

describe('terminal commands', () => {
  it('lists commands from the registry', async () => {
    const { commands } = setup();

    const text = await run(commands, 'help');

    for (const name of [
      'help',
      'about',
      'work',
      'projects',
      'stack',
      'contact',
      'theme',
      'goto',
      'demo',
      'whoami',
      'sudo',
      'pwd',
      'ls',
      'clear',
    ]) {
      expect(text).toContain(name);
    }
  });

  it('lists every work project', async () => {
    const { commands } = setup();

    const text = await run(commands, 'work');

    expect(text).toContain('Unify Home - IoT hub system');
    expect(text).toContain('Opentrons Desktop App/Touchscreen App');
    expect(text).toContain('Opentrons AI prototype');
    expect(text).toContain('Internal tools');
    expect(text).toContain('New application');
  });

  it('shows a single work project with its highlights and link', async () => {
    const { commands } = setup();

    const first = await run(commands, 'work 1');
    const second = await run(commands, 'work 2');

    expect(first).toContain('Allowed users to control IoT devices from a 3D model viewer');
    expect(second).toContain('https://github.com/Opentrons/opentrons');
  });

  it('lists personal projects', async () => {
    const { commands } = setup();

    const text = await run(commands, 'projects');

    expect(text).toContain('mtindo');
    expect(text).toContain('nikobot');
  });

  it('prints both tech stacks', async () => {
    const { commands } = setup();

    const text = await run(commands, 'stack');

    expect(text).toContain('React');
    expect(text).toContain('Python');
  });

  it('prints contact links', async () => {
    const { commands } = setup();

    const text = await run(commands, 'contact');

    expect(text).toContain('baxin1919@gmail.com');
    expect(text).toContain('https://github.com/koji');
  });

  it('changes the theme', async () => {
    const { context, commands } = setup();

    const text = await run(commands, 'theme matrix');

    expect(context.setTheme).toHaveBeenCalledWith('matrix');
    expect(text).toContain('Theme changed to matrix.');
  });

  it('rejects an unknown theme', async () => {
    const { context, commands } = setup();

    const text = await run(commands, 'theme nope');

    expect(text).toContain('Unknown theme');
    expect(context.setTheme).not.toHaveBeenCalled();
  });

  it('routes Japanese aliases to their canonical commands', async () => {
    const { commands } = setup();

    const work = await run(commands, 'しごと');
    const projects = await run(commands, 'ぷろじぇくと');

    expect(work).toContain('Work experience');
    expect(projects).toContain('Personal projects');
  });

  it('navigates to a section', async () => {
    const { context, commands } = setup();

    const text = await run(commands, 'goto work');

    expect(text).toContain('Opening the work section');
    expect(context.navigate).toHaveBeenCalledWith('/#work');
  });
});
