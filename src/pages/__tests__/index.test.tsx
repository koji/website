import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Index } from '../index';

// Delay the work section well past the old implementation's retry budget
// (120 animation frames ≈ 2s in the test setup), so this suite fails if
// the scroll gives up before a late-mounting section appears.
vi.mock('@/components/WorkProjects', async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return vi.importActual('@/components/WorkProjects');
});

describe('Index hash scroll', () => {
  const scrolledIds: string[] = [];

  beforeEach(() => {
    scrolledIds.length = 0;
    Element.prototype.scrollIntoView = vi.fn(function (this: Element) {
      scrolledIds.push(this.id);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to a section that only mounts after lazy loading', { timeout: 10000 }, async () => {
    render(
      <MemoryRouter initialEntries={['/#work']}>
        <Index />
      </MemoryRouter>
    );

    // The work section is lazy-loaded, so it is absent when the effect
    // first runs. The scroll must happen once it mounts, however late.
    await waitFor(
      () => {
        expect(scrolledIds).toContain('work');
      },
      { timeout: 8000 }
    );
  });

  it('does not scroll for a hash with no matching section', { timeout: 10000 }, async () => {
    render(
      <MemoryRouter initialEntries={['/#no-such-section']}>
        <Index />
      </MemoryRouter>
    );

    // Wait until the lazy sections have mounted, then confirm no scroll.
    await waitFor(
      () => {
        expect(document.getElementById('work')).not.toBeNull();
      },
      { timeout: 8000 }
    );
    expect(scrolledIds).toEqual([]);
  });
});
