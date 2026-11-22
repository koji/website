import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from '../Contact';

const expected = ['baxin1919', 'gmail.com'].join('@');

describe('Contact', () => {
  it('does not show the email address before it is revealed', () => {
    const { container } = render(<Contact />);

    expect(screen.getByRole('button', { name: 'Show email address' })).toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
    expect(container.textContent).not.toContain(expected);
  });

  it('reveals the email address as a mailto link on click', () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: 'Show email address' }));

    const link = screen.getByRole('link', { name: expected });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `mailto:${expected}`);
  });

  it('renders the Send Email button', () => {
    render(<Contact />);

    expect(screen.getByRole('button', { name: /Send Email/ })).toBeInTheDocument();
  });
});
