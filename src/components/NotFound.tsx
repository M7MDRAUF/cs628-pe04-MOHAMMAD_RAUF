import { Link } from 'react-router-dom';

/** 404 fallback for unknown routes — keeps the app fully navigable. */
export default function NotFound(): React.JSX.Element {
  return (
    <section className="not-found">
      <h2 className="page-title">Page not found</h2>
      <p>The page you requested does not exist.</p>
      <p>
        <Link to="/cities">Back to Cities List</Link>
      </p>
    </section>
  );
}
