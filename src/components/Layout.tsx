import { NavLink, Outlet } from 'react-router-dom';

/**
 * Top-level page chrome rendered by every route.
 *
 * Renders the dark application header with navigation links followed by an
 * `<Outlet />` so child routes can plug in their own content while keeping a
 * consistent layout — exactly as required by PE04 (the City Details screen
 * must replace a section *within* the Cities List page, not the whole page).
 */
export default function Layout(): React.JSX.Element {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-header__title">Cities Application</h1>
        <nav className="app-nav" aria-label="Primary">
          <NavLink to="/cities" className="app-nav__link" end={false}>
            Cities List
          </NavLink>
          <NavLink to="/add" className="app-nav__link">
            Add City
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <div className="app-card">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <small>PE04 &middot; React Router Cities &middot; CS628</small>
      </footer>
    </div>
  );
}
