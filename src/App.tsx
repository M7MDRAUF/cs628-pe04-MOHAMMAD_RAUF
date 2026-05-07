/**
 * Cities Application — root component.
 *
 * Defines the route table:
 *   /            → redirects to /cities
 *   /cities      → CitiesList (Layout > CitiesList)
 *     /:cityId   → CityDetails (nested into CitiesList)
 *   /add         → AddCity
 *   *            → NotFound
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CitiesList from './components/CitiesList';
import CityDetails from './components/CityDetails';
import AddCity from './components/AddCity';
import NotFound from './components/NotFound';

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/cities" replace />} />
        <Route path="cities" element={<CitiesList />}>
          <Route path=":cityId" element={<CityDetails />} />
        </Route>
        <Route path="add" element={<AddCity />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
