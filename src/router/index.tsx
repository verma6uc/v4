import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { docsRoutes } from './docs.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  ...docsRoutes,
]);