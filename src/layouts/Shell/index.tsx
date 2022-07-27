import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../../features/Home';
import Login from '../../features/Auth/Login';
import Clientes from '../../features/Clientes';

import { RequireAuth } from '../../features/Auth/ProtectedRoute';

export default function Shell() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/clientes"
          element={
            <RequireAuth>
              <Clientes />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}