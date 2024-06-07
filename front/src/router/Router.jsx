import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../components/Auth';
import { Home }from '../components/Home'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
export const Router = () => {
  return (
    <Routes>
      <Route path='/*' element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      }/>

    <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>
      }/>

    <Route path='/register' element={
        <PublicRoute>
          <Register/>
        </PublicRoute>
      }/>
    </Routes>
  );
};
