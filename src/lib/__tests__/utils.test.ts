import { describe, it, expect } from 'vitest';
import { cn, formatDate, truncate } from '../utils';

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

describe('utils > formatDate', () => {
    it('formats a valid date string correctly', () => {
        const dateStr = '2023-05-15T10:00:00Z';
        expect(formatDate(dateStr)).toBe('May 15, 2023');
    });

    it('formats a valid Date object correctly', () => {
        const date = new Date('2023-05-15T10:00:00Z');
        expect(formatDate(date)).toBe('May 15, 2023');
    });

    it('returns an empty string for an invalid date string', () => {
        expect(formatDate('invalid-date')).toBe('');
    });

    it('returns an empty string if no date is provided', () => {
        // @ts-expect-error testing invalid input
        expect(formatDate(null)).toBe('');
        // @ts-expect-error testing invalid input
        expect(formatDate(undefined)).toBe('');
    });
});

describe('utils > truncate', () => {
    it('truncates a string that exceeds the length and adds an ellipsis', () => {
        expect(truncate('Hello world, this is a test', 11)).toBe('Hello world...');
    });

    it('does not truncate a string that is shorter than the length', () => {
        expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('does not truncate a string that is exactly the length', () => {
        expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('returns an empty string if input is empty', () => {
        expect(truncate('', 5)).toBe('');
        // @ts-expect-error testing invalid input
        expect(truncate(null, 5)).toBe('');
    });
});
