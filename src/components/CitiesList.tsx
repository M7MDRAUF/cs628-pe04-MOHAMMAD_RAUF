import { Link, Outlet } from 'react-router-dom';
import { useCities } from '../useCities';

/**
 * Cities List screen.
 *
 * Each entry is a `<Link>` whose `to` is the city's id; clicking it routes to
 * the nested `:cityId` child which renders {@link CityDetails} *inside* this
 * same page (via the `<Outlet />` below). When no child route is active the
 * page shows a friendly "select a city" hint.
 */
export default function CitiesList(): React.JSX.Element {
  const { cities } = useCities();

  return (
    <section aria-labelledby="cities-list-heading">
      <h2 id="cities-list-heading" className="page-title">
        Cities List
      </h2>

      {cities.length === 0 ? (
        <p className="empty-state">
          No cities yet. <Link to="/add">Add your first city</Link>.
        </p>
      ) : (
        <ul className="cities-list">
          {cities.map((city) => (
            <li key={city.id} className="cities-list__item">
              <Link to={city.id} className="cities-list__link">
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Nested route target — CityDetails renders here on /cities/:cityId */}
      <div className="city-details-slot">
        <Outlet />
      </div>
    </section>
  );
}
