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
];
