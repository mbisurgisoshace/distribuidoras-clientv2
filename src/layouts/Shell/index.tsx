import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../../features/Home';
import Login from '../../features/Auth/Login';
import Clientes from '../../features/Clientes';

import { RequireAuth } from '../../features/Auth/ProtectedRoute';
import FormCliente from '../../features/Clientes/FormCliente';
import FormPedido from '../../features/Pedidos/FormPedido';

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
        <Route
          path="/clientes/:clienteId"
          element={
            <RequireAuth>
              <FormCliente />
            </RequireAuth>
          }
        />
        <Route
          path="/pedidos/:pedidoId"
          element={
            <RequireAuth>
              <FormPedido />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
