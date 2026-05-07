/**
 * Integration tests for the Cities App routing & flows.
 *
 * Uses MemoryRouter so we can drive the URL programmatically without a
 * browser, and the real CitiesProvider so we exercise the actual context
 * (not a mocked one).
 */
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { CitiesProvider } from '../CitiesProvider';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </MemoryRouter>,
  );
}

describe('Cities App', () => {
  it('redirects "/" to /cities and lists seed cities', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: /cities list/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Seattle' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tokyo' })).toBeInTheDocument();
  });

  it('renders city details inside the cities list page (nested route)', async () => {
    const user = userEvent.setup();
    renderAt('/cities');
    await user.click(screen.getByRole('link', { name: 'Seattle' }));

    // The list heading is still on the page (nested layout requirement).
    expect(screen.getByRole('heading', { name: /cities list/i })).toBeInTheDocument();
    // Plus the details for the clicked city.
    expect(screen.getByRole('heading', { name: /seattle details/i })).toBeInTheDocument();
    expect(screen.getByText(/country:/i)).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('733,919')).toBeInTheDocument();
  });

  it('shows a friendly message for an unknown city id', () => {
    renderAt('/cities/does-not-exist');
    expect(screen.getByRole('heading', { name: /city not found/i })).toBeInTheDocument();
  });

  it('adds a city and redirects back to the list', async () => {
    const user = userEvent.setup();
    renderAt('/add');

    await user.type(screen.getByLabelText(/^name:/i), 'Vancouver');
    await user.type(screen.getByLabelText(/^country:/i), 'Canada');
    await user.type(screen.getByLabelText(/^population:/i), '662248');
    await user.click(screen.getByRole('button', { name: /add city/i }));

    // After redirect the cities list shows the new entry.
    expect(screen.getByRole('heading', { name: /cities list/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Vancouver' })).toBeInTheDocument();
  });

  it('rejects invalid population input', async () => {
    const user = userEvent.setup();
    renderAt('/add');

    await user.type(screen.getByLabelText(/^name:/i), 'X');
    await user.type(screen.getByLabelText(/^country:/i), 'Y');
    await user.type(screen.getByLabelText(/^population:/i), 'abc');
    await user.click(screen.getByRole('button', { name: /add city/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/population/i);
    // Still on /add (no redirect happened).
    expect(screen.getByRole('heading', { name: /add city/i })).toBeInTheDocument();
  });

  it('renders the 404 page for unknown routes', () => {
    renderAt('/totally/unknown/path');
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });
});
