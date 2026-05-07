/**
 * Domain types for the Cities application.
 *
 * A {@link City} represents a single city record stored in the in-memory
 * {@link CitiesContext}. The `id` is generated when the city is added and is
 * used as the unique identifier for `useParams()` based routing.
 */
export interface City {
  /** Unique identifier (string form for use in URL parameters). */
  readonly id: string;
  /** Display name of the city. */
  readonly name: string;
  /** Country the city belongs to. */
  readonly country: string;
  /** Population count (non-negative integer). */
  readonly population: number;
  /** Optional free-form description / extra details. */
  readonly description?: string;
}

/** Shape of a brand-new city before an `id` has been assigned. */
export type NewCity = Omit<City, 'id'>;
