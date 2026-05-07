import { createContext, useContext } from 'react';
import type { City, NewCity } from './types';

/**
 * Public API exposed by the CitiesProvider.
 */
export interface CitiesContextValue {
  /** All cities currently known to the application. */
  readonly cities: ReadonlyArray<City>;
  /** Add a new city to the store; returns the generated id. */
  addCity: (city: NewCity) => string;
  /** Lookup helper used by the City Details screen. */
  getCityById: (id: string) => City | undefined;
}

export const CitiesContext = createContext<CitiesContextValue | null>(null);

/**
 * Hook that retrieves the cities context. Throws when used outside a provider.
 */
export function useCities(): CitiesContextValue {
  const ctx = useContext(CitiesContext);
  if (ctx === null) {
    throw new Error('useCities must be used inside a <CitiesProvider>.');
  }
  return ctx;
}
