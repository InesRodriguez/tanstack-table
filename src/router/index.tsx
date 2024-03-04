import App from '../App';

import { Navigate, createBrowserRouter } from 'react-router-dom';
import Users from '../pages/users/index';

export const router = createBrowserRouter([
  {
    path: '/users',
    element: <App />,
    children: [
        { path: 'list', element: <Users />,  },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="users/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);
