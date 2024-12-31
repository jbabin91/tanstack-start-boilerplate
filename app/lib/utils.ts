import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple TailwindCSS classes with `clsx` and `tailwind-merge`.
 *
 * @param inputs - The classes to merge.
 * @returns Merged classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
