import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Terminal } from 'hakoniwa-term';
import type { CommandAction } from 'hakoniwa-term';
import { describe, expect, it } from 'vitest';

describe('Terminal', () => {
  it('renders the output of a submitted command', async () => {
    const commands: Record<string, CommandAction> = {
      help: async function* () {
        yield {
          type: 'log',
          log: { type: 'output', text: 'help output' },
        };
      },
    };

    render(<Terminal commands={commands} showCloseButton={false} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });

    const form = input.closest('form');
    if (!form) {
      throw new Error('Terminal form not found');
    }
    fireEvent.submit(form);

    expect(await screen.findByText('help output')).toBeInTheDocument();
  });
});
