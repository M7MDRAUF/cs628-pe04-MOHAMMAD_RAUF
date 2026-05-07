import type { City } from './types';

/**
 * Seed cities so the UI is never empty on first load. In a real-world app
 * these would come from an API.
 */
export const SEED_CITIES: ReadonlyArray<City> = [
  {
    id: '1',
    name: 'Seattle',
    country: 'USA',
    population: 733_919,
    description: 'Home of the Space Needle and Pike Place Market.',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    population: 13_960_000,
    description: 'The capital of Japan and the most populous metropolitan area in the world.',
  },
  {
    id: '3',
    name: 'Cairo',
    country: 'Egypt',
    population: 9_540_000,
    description: 'The capital of Egypt, on the banks of the Nile.',
  },
];
