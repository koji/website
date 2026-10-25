import { TERMINAL_PRESETS } from 'hakoniwa-term';
import type { TerminalPreset } from 'hakoniwa-term';

export type TerminalThemeChoice = 'notion' | TerminalPreset;

const PRESET_CHOICES = Object.keys(TERMINAL_PRESETS) as TerminalPreset[];

export const TERMINAL_THEME_CHOICES: readonly TerminalThemeChoice[] = ['notion', ...PRESET_CHOICES];

export const isTerminalThemeChoice = (value: string): value is TerminalThemeChoice =>
  TERMINAL_THEME_CHOICES.includes(value as TerminalThemeChoice);
