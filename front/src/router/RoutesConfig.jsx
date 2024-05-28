import { Register, Login } from '../components';
import { Get } from '../components/Get';

export const routes = [
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/get',
    element: <Get />,
  },
];
