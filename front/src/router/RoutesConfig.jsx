import { Login, Register } from '../components/Auth';
import {  Home } from '../components/Home';

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
    path: '/home',
    element: <Home />,
  },
];
