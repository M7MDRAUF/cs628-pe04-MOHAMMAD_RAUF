import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { City, NewCity } from './types';
import { CitiesContext, type CitiesContextValue } from './useCities';
import { SEED_CITIES } from './seedCities';

/**
 * Provider component that owns the cities collection and exposes mutation
 * helpers via React context.
 */
export function CitiesProvider({ children }: { readonly children: ReactNode }): React.JSX.Element {
  const [cities, setCities] = useState<ReadonlyArray<City>>(SEED_CITIES);

  const addCity = useCallback((draft: NewCity): string => {
    // Use crypto.randomUUID when available for guaranteed-unique ids; fall
    // back to a timestamp-based id for very old runtimes (defensive).
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `c_${Date.now().toString(36)}`;

    const next: City = { id, ...draft };
    setCities((prev) => [...prev, next]);
    return id;
  }, []);

  const getCityById = useCallback(
    (id: string): City | undefined => cities.find((c) => c.id === id),
    [cities],
  );

  const value = useMemo<CitiesContextValue>(
    () => ({ cities, addCity, getCityById }),
    [cities, addCity, getCityById],
  );

  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}
