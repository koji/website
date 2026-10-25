import { TERMINAL_PRESETS } from 'hakoniwa-term';
import type { TerminalPreset, TerminalTheme } from 'hakoniwa-term';

export const NOTION_TERMINAL_THEME: TerminalTheme = {
  bg: '#191E2C',
  titleBg: '#0F1117',
  border: 'rgba(119, 102, 228, 0.35)',
  text: '#F7F6F3',
  prompt: '#A99CFF',
  error: '#FCA5A5',
  success: '#6EE7B7',
  progress: '#A99CFF',
};

export type TerminalThemeChoice = 'notion' | TerminalPreset;

const PRESET_CHOICES = Object.keys(TERMINAL_PRESETS) as TerminalPreset[];

export const TERMINAL_THEME_CHOICES: readonly TerminalThemeChoice[] = ['notion', ...PRESET_CHOICES];

export const isTerminalThemeChoice = (value: string): value is TerminalThemeChoice =>
  TERMINAL_THEME_CHOICES.includes(value as TerminalThemeChoice);
