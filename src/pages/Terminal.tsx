import { Terminal } from 'hakoniwa-term';
import type { CommandLog } from 'hakoniwa-term';
import 'hakoniwa-term/dist/index.css';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCommands } from '@/terminal/commands';
import {
  NOTION_TERMINAL_THEME,
  TERMINAL_THEME_CHOICES,
  type TerminalThemeChoice,
} from '@/terminal/theme';
import './Terminal.css';

const INITIAL_HISTORY: CommandLog[] = [
  { type: 'success', text: 'hakoniwa-term v0.0.6' },
  { type: 'output', text: "Welcome to Koji's portfolio terminal." },
  { type: 'output', text: 'Type "help" to see available commands.' },
];

const TerminalPage = () => {
  const navigate = useNavigate();
  const [themeChoice, setThemeChoice] = useState<TerminalThemeChoice>('notion');
  const commands = useMemo(
    () => createCommands({ navigate, setTheme: setThemeChoice }),
    [navigate]
  );
  const isNotion = themeChoice === 'notion';

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#191E2C] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(119,102,228,0.35), transparent 60%), #191E2C',
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm text-white/60 transition-colors hover:text-white">
          ← Back to portfolio
        </Link>
        <a
          href="https://github.com/koji/hakoniwa-term"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/60 transition-colors hover:text-white"
        >
          hakoniwa-term ↗
        </a>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 sm:px-6 lg:px-8">
        <section
          aria-labelledby="terminal-title"
          aria-describedby="terminal-description"
          className="terminal-shell w-full max-w-4xl"
        >
          <div className="mb-8 text-center animate-fade-in">
            <h1
              id="terminal-title"
              className="mb-3 text-[40px] font-semibold tracking-[-1px] text-white"
            >
              Portfolio Terminal
            </h1>
            <p
              id="terminal-description"
              className="mx-auto max-w-2xl text-[15px] leading-[1.6] text-white/65"
            >
              A command-driven second interface to this portfolio. Click the terminal and type{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/90">help</code>, or try{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/90">theme matrix</code>.
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Terminal
              commands={commands}
              initialHistory={INITIAL_HISTORY}
              title="koji@portfolio:~"
              promptString="koji@portfolio:~$ "
              showCloseButton={false}
              commandNotFoundFormatter={(cmd) =>
                `Command not found: "${cmd}". Type "help" for a list.`
              }
              preset={isNotion ? 'emerald' : themeChoice}
              theme={isNotion ? NOTION_TERMINAL_THEME : undefined}
            />
          </div>

          <div
            role="group"
            aria-label="Terminal theme"
            className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {TERMINAL_THEME_CHOICES.map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={themeChoice === choice}
                onClick={() => setThemeChoice(choice)}
                className={`rounded-[6px] border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  themeChoice === choice
                    ? 'border-[#A99CFF]/60 bg-[#7766E4] text-white'
                    : 'border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TerminalPage;
