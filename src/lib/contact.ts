// Parts stay split so the address is not a single string in the bundle.
const EMAIL_PARTS = ['baxin1919', 'gmail.com'] as const;

export const contactEmail = (): string => EMAIL_PARTS.join('@');

export const contactMailto = (subject?: string): string =>
  subject
    ? `mailto:${contactEmail()}?subject=${encodeURIComponent(subject)}`
    : `mailto:${contactEmail()}`;
