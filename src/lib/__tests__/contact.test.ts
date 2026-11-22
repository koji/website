import { describe, expect, it } from 'vitest';
import { contactEmail, contactMailto } from '../contact';

const expected = ['baxin1919', 'gmail.com'].join('@');

describe('contact', () => {
  it('assembles the email address from parts', () => {
    expect(contactEmail()).toBe(expected);
  });

  it('builds a mailto link', () => {
    expect(contactMailto()).toBe(`mailto:${expected}`);
  });

  it('builds a mailto link with an encoded subject', () => {
    expect(contactMailto('Hello Koji!')).toBe(`mailto:${expected}?subject=Hello%20Koji!`);
  });
});
