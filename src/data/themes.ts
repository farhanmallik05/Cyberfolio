export type ThemeId = 'cyber' | 'arctic' | 'inferno' | 'ghost' | 'bioluminescent' | 'void';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  accentColor: string;
  accentColor2: string;
  bgColor: string;
}

export const THEMES: Theme[] = [
  {
    id: 'cyber',
    name: 'CYBER',
    description: 'Default neural interface',
    accentColor: '#00F5FF',
    accentColor2: '#00D4FF',
    bgColor: '#070C1A',
  },
  {
    id: 'arctic',
    name: 'ARCTIC',
    description: 'Cold precision mode',
    accentColor: '#E0F7FF',
    accentColor2: '#7DD8F5',
    bgColor: '#040D1A',
  },
  {
    id: 'inferno',
    name: 'INFERNO',
    description: 'High energy override',
    accentColor: '#FF6B00',
    accentColor2: '#FF2200',
    bgColor: '#0F0500',
  },
  {
    id: 'ghost',
    name: 'GHOST',
    description: 'Stark signal mode',
    accentColor: '#FFFFFF',
    accentColor2: '#C0C0C0',
    bgColor: '#0A0A0A',
  },
  {
    id: 'bioluminescent',
    name: 'BIO',
    description: 'Deep ocean frequency',
    accentColor: '#00FFB3',
    accentColor2: '#00D4FF',
    bgColor: '#020F12',
  },
  {
    id: 'void',
    name: 'VOID',
    description: 'Signal suppression mode',
    accentColor: '#00F5FF',
    accentColor2: '#BF5FFF',
    bgColor: '#020204',
  },
];
