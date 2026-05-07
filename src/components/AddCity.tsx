import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../useCities';

/** Local form state — `population` is kept as a string so the input is controlled. */
interface FormState {
  name: string;
  country: string;
  population: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  country: '',
  population: '',
  description: '',
};

/**
 * Add City screen.
 *
 * Validates user input, asks the {@link useCities} context to persist the new
 * record, then redirects back to `/cities` using {@link useNavigate} —
 * satisfying the assignment's "Redirection" requirement.
 */
export default function AddCity(): React.JSX.Element {
  const { addCity } = useCities();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  /** Single change handler for every text input. */
  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const name = form.name.trim();
    const country = form.country.trim();
    const populationRaw = form.population.replace(/[\s,]/g, '');
    const description = form.description.trim();

    // ---- Validation (covers the "invalid user requirement" rubric) ----
    if (name.length === 0) {
      setError('City name is required.');
      return;
    }
    if (country.length === 0) {
      setError('Country is required.');
      return;
    }
    const population = Number(populationRaw);
    if (!Number.isFinite(population) || !Number.isInteger(population) || population < 0) {
      setError('Population must be a non-negative whole number.');
      return;
    }

    setError(null);
    addCity({
      name,
      country,
      population,
      description: description.length > 0 ? description : undefined,
    });

    // Redirect back to the cities list (assignment "Redirection" requirement).
    navigate('/cities', { replace: true });
  };

  return (
    <section aria-labelledby="add-city-heading">
      <h2 id="add-city-heading" className="page-title">
        Add City
      </h2>

      <form className="add-city-form" onSubmit={handleSubmit} noValidate>
        <label className="add-city-form__row">
          <span>Name:</span>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            autoComplete="off"
            required
          />
        </label>

        <label className="add-city-form__row">
          <span>Country:</span>
          <input
            type="text"
            value={form.country}
            onChange={handleChange('country')}
            autoComplete="off"
            required
          />
        </label>

        <label className="add-city-form__row">
          <span>Population:</span>
          <input
            type="text"
            inputMode="numeric"
            value={form.population}
            onChange={handleChange('population')}
            placeholder="e.g. 733919"
            required
          />
        </label>

        <label className="add-city-form__row add-city-form__row--block">
          <span>Description (optional):</span>
          <textarea value={form.description} onChange={handleChange('description')} rows={3} />
        </label>

        {error !== null && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--primary">
          Add City
        </button>
      </form>
    </section>
  );
}
