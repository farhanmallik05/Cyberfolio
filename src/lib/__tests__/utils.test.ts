import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('utils > cn', () => {
    it('merges tailwind classes correctly', () => {
        expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('handles conditional classes', () => {
        const isTrue = false;
        expect(cn('bg-red-500', isTrue && 'text-white', 'p-4')).toBe('bg-red-500 p-4');
    });

    it('resolves tailwind conflicts', () => {
        expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    });
});
