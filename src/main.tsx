/**
 * Application entry point.
 *
 * - Wraps the route tree in `<BrowserRouter>` so React Router can manage URLs.
 * - Wraps everything in `<CitiesProvider>` so any descendant can read/mutate
 *   the cities collection through the `useCities()` hook.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CitiesProvider } from './CitiesProvider';
import './styles.css';

const rootEl = document.getElementById('root');
if (rootEl === null) {
  throw new Error('Root element #root was not found in index.html');
}

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </BrowserRouter>
  </StrictMode>,
);
